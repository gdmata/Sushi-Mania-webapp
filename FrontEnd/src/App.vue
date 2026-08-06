<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Home from './Views/Home.vue'
import Footer from './components/Footer.vue'
import AuthView from './Views/AuthView.vue'
import MenuView from './Views/MenuView.vue'
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <Header />
    <RouterView />

    <Footer />
  </div>
</template>

<style scoped></style>
