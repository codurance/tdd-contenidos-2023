import { createRouter, createWebHistory } from 'vue-router'
import PasswordValidatorView from '../views/PasswordValidatorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PasswordValidatorView
    },
  ]
})

export default router
