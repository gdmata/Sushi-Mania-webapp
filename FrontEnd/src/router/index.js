import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/Views/AuthView.vue'
import Home from '@/Views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'AuthenticationView',
    component: AuthView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
