import Vue from 'vue'
import VueRouter from 'vue-router'
import Connection from '../views/Connection'
import Feed from '../views/Feed'
import Register from '../views/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'fil_actualite',
    component: Feed
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: Connection
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router
