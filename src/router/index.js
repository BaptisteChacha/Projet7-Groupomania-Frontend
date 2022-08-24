import { createRouter, createWebHashHistory } from 'vue-router'
import Connection from '../views/Connection'
import Feed from '../views/Feed'
import Register from '../views/Register'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'fil_actualite',
    component: Feed,
    beforeEnter: (to, from, next) => {
      if (store.state.token == undefined) {
        console.log('bonjour')
        next(
          '/connexion'
        )
      } else {
        next();
      }
    },
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

const router = createRouter({
  history: createWebHashHistory(),

  routes
})

export default router
