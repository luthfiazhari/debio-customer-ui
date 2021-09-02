import Vue from 'vue'
import VueRouter from 'vue-router'
import indexRoutes from './routes'

Vue.use(VueRouter)

const routes = [
  ...indexRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router

