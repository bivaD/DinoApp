const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Allow CORS from all origins
app.use(cors());

// PostgreSQL pool setup
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Function to test database connection with retry logic
const testDbConnection = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await pool.query('SELECT 1');
            console.log('✅ Database connection successful!');
            await initDb(); // Ensure the table exists after connection
            return;
        } catch (error) {
            console.error(`❌ Database connection failed (attempt ${i + 1} of ${retries}):`, error);
            await new Promise(res => setTimeout(res, delay)); // Wait before retrying
        }
    }
    console.error('🚨 All retries failed. Exiting...');
    process.exit(1);
};

const initDb = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS dinosaurs (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );
        `);
        console.log('✅ Table "dinosaurs" is ready!');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        process.exit(1); // Exit if table creation fails
    }
};

// Check database connection at startup
testDbConnection();

app.use(cors());
app.use(express.json());

// Get all dinosaurs
app.get('/dinosaurs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM dinosaurs ORDER BY id DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('❌ Error fetching dinosaurs:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});


// Add a new dinosaur
app.post('/dinosaurs', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Name is required' });

        await pool.query('INSERT INTO dinosaurs (name) VALUES ($1)', [name]);
        console.log(`✅ Added dinosaur: ${name}`);

        res.status(201).json({ message: 'Dinosaur added' });
    } catch (error) {
        console.error('❌ Error inserting dinosaur:', error);
        res.status(500).json({ error: 'Database insert failed' });
    }
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));