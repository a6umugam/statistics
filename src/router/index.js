import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/LoginView.vue'
import Dash from '@/views/DashView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dash',
    name: 'Dashboard',
    component: Dash
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router