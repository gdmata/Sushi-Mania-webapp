<script setup>
import { ref } from 'vue'
const src = ref('https://i.ibb.co/pvhpLkMk/logo.png')
const menu = ref('/menu')
const address = ref('/endereco')
const contact = ref('/contato')
const name = ref(['Sushi', 'Mania'])
const subTitle = ref('Culinária Oriental')
//
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
//
</script>
<template>
  <header>
    <nav class="navbar">
      <div class="logo">
        <span><img class="logo-img" :src /> </span>

        <button class="hamburger" @click="toggleMenu">
          <span>{{ isMenuOpen ? 'X' : '☰' }}</span>
        </button>
      </div>
      <ul class="nav-links" :class="{ open: isMenuOpen }">
        <li><router-link :to="{ name: 'Home' }"> Início </router-link></li>
        <li><router-link :to="menu">Cardápio</router-link></li>
        <li><router-link :to="{ name: 'AuthenticationView' }">Entrar/Cadastrar</router-link></li>
      </ul>
    </nav>
  </header>
</template>
<style scoped>
.logo-img {
  width: 90px;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8b0000;
  padding: 1rem 2rem;
  color: white;
}

.logo {
  font-family: 'Rubik Dirt';
  display: flex;
  flex-direction: column;
  font-weight: bold;
  line-height: 1.1;
  color: #cccccc;
}
.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-links a {
  color: white;
  text-decoration: solid;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.hamburger {
  display: none;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .navbar {
    flex-wrap: wrap;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  .nav-links {
    display: none;
  }

  .nav-links.open {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
  }
}
</style>
