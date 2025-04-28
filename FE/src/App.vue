<template>
  <div class="container">
    <h1 class="title">🦖 Dajnozóór Enciklopédia 🌋</h1>
    <form @submit.prevent="addDinosaur" class="dino-form">
      <input v-model="newDinosaur" placeholder="🦕 Wpič tutaj meno dinozaura" required class="dino-input" />
      <button type="submit" class="dino-button">🔥 Pridhát Dajnosóóra! 🔥</button>
    </form>
    <ul class="dino-list">
      <li v-for="dino in dinosaurs" :key="dino.id" class="dino-item">
        🦴 {{ dino.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newDinosaur: '',
      dinosaurs: []
    };
  },
  methods: {
    async fetchDinosaurs() {
      const res = await axios.get('http://localhost:3000/dinosaurs');
      this.dinosaurs = res.data;
    },
    async addDinosaur() {
      if (!this.newDinosaur.trim()) return;
      await axios.post('http://localhost:3000/dinosaurs', { name: this.newDinosaur });
      this.newDinosaur = '';
      await this.fetchDinosaurs();
    }
  },
  mounted() {
    this.fetchDinosaurs();
  }
};
</script>

<style>
body {
  background: url('https://as2.ftcdn.net/v2/jpg/01/83/14/47/1000_F_183144766_dbGaN37u6a4VCliXQ6wcarerpYmuLAto.jpg') no-repeat center center fixed;
  background-size: cover;
  font-family: 'Comic Sans MS', serif;
  color: #fff;
  text-align: center;
}

.container {
  max-width: 600px;
  margin: 50px auto;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 30px red;
}

.title {
  font-size: 3rem;
  text-shadow: 5px 5px yellow, -5px -5px red;
  animation: shake 0.5s infinite alternate;
}

@keyframes shake {
  0% { transform: rotate(-2deg); }
  100% { transform: rotate(2deg); }
}

.dino-form {
  margin-bottom: 20px;
}

.dino-input {
  width: 80%;
  padding: 10px;
  font-size: 1.2rem;
  border: 3px solid lime;
  border-radius: 5px;
  box-shadow: inset 0 0 10px yellow;
  background: black;
  color: lime;
}

.dino-button {
  padding: 10px 20px;
  font-size: 1.5rem;
  background: linear-gradient(45deg, red, orange, yellow);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 0, 0, 0.8);
  animation: crazy-shake 0.6s infinite;
}

/* CRAZY SHAKE ANIMATION 🔥 */
@keyframes crazy-shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.dino-button:hover {
  animation: crazy-shake 0.05s infinite;
  transform: scale(1.1);
}
.dino-list {
  list-style: none;
  padding: 0;
}

.dino-item {
  font-size: 1.5rem;
  background: linear-gradient(45deg, green, blue);
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px;
  box-shadow: 0 0 10px cyan;
  transition: transform 0.3s;
}

.dino-item:hover {
  transform: scale(1.2);
}
</style>

