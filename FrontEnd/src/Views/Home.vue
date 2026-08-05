<script setup>
import { ref } from 'vue'
import AuthView from '@/Views/AuthView.vue'
import Menu from '../components/menu'
const menu = ref('/menu')
const { bebidas, complementos, combos, unidades, yakisoba } = Menu
let destaques = [combos[1], combos[9], yakisoba[3]]
</script>
<template>
  <section class="hero">
    <div class="hero-content">
      <span class="badge"> FRESCURA E TRADIÇÃO </span>
      <h1>Experiência Única em <span class="highlight">Culinária Japonesa</span></h1>
      <p>
        Delicie-se com pratos autênticos, preparados com ingredientes frescos e selecionados. Do
        tradicional ao contemporâneo, cada sabor conta uma história.
      </p>
      <div class="hero-buttons">
        <router-link :to="menu" class="btn btn-primary"> Ver Cardápio </router-link>

        <button class="btn btn-secondary">Fazer Pedido</button>
      </div>
    </div>
  </section>
  <section class="featured-section">
    <h2>Destaques do <span class="accent"> Cardápio </span></h2>

    <div class="grid-container">
      <div v-for="item in destaques" :key="item.id" class="item">
        <div class="card-body">
          <h3>{{ item.product }}</h3>
          <p>{{ item.description }}</p>
          <div class="card-footer">
            <span class="price">R${{ item.price.toFixed(2) }}</span>
            <button class="order-btn">Pedir!</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.hero {
  background:
    linear-gradient(rgba(0, 0, 0, 0.75), rgba(26, 26, 26, 0.95)),
    url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200') center/cover
      no-repeat;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1.5rem;
  color: #ffffff;
}
.hero-content {
  max-width: 800px;
}
.badge {
  background-color: #8b0000;
  color: #ffffff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}
.btn {
  display: inline-block;
  box-sizing: border-box;
  border: none;
  outline: none;
  padding: 0.8rem 1.8rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}
.btn-primary {
  background-color: #8b0000;
  color: #ffffff;
}
.btn-secondary {
  background-color: #ff4d4d;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(255, 77, 77, 0.2);
}

.featured-section {
  padding: 4rem 2rem;
  background-color: #141414;
  color: #ffffff;
  text-align: center;
}
.featured-section h2 {
  font-size: 2rem;
  margin-bottom: 2.5rem;
}
.accent {
  color: #ff4d4d;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;

  max-width: 1100px;
  margin: 0 auto;
}
.item {
  background-color: #1e1e1e;
  border: 1px solid #2e2e2e;
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
  padding: 1.5rem;
  border-top: 3px solid #8b0000;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
}
.item:hover {
  transform: translateY(-5px);
  border-color: #ff4d4d;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}
.price {
  color: #ff4d4d;
  font-weight: bold;
  font-size: 1.2rem;
}
.order-btn {
  background-color: #8b0000;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}
.order-btn:hover {
  background-color: #ff4d4d;
}

@media (max-width: 768px) {
  .hero-buttons {
    text-align: center;

    flex-direction: column;
  }
  .hero h1 {
    font-size: 1.4rem;
  }
  .btn {
    display: block;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
