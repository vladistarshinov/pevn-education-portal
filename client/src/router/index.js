import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "Auth" */ '../views/Auth.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
