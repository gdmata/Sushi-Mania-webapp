<template>
  <div class="menu-page">
    <h2>Nosso <span class="highlight"> Cardápio</span></h2>

    <div v-if="isLoading" class="loading">Carregando cardápio...</div>
    <div v-else class="categories-list">
      <section v-for="(categoryObj, index) in menuCategories" :key="index" class="category-section">
        <pre>{{ categoryObj }}</pre>
      </section>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const menuCategories = ref([])
const isLoading = ref(true)

const getMenu = async () => {
  try {
    const response = await axios.get('http://localhost:3000/menu', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    menuCategories.value = response.data.items || []
  } catch (e) {
    console.log(e, 'error')
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  getMenu()
})
</script>
