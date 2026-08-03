<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Home from './components/Home.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <Header />
    <RouterView />
    <Home />
    <Footer />
  </div>
</template>

<style scoped></style>
