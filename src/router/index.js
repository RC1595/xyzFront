import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Rental from '../views/Rental.vue'
import CCForm from '../views/CCForm.vue'
import CCUser from '../views/CCUser.vue'
import CCProd from '../views/CCProd'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/rental',
    name: 'Rental',
    component: Rental
  },
  {
    path: '/ccform',
    name: 'CCForm',
    component: CCForm
  },
  {
    path: '/ccuser',
    name: 'CCUser',
    component: CCUser
  },
  {
    path: '/ccprod',
    name: 'CCProd',
    components: CCProd
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
