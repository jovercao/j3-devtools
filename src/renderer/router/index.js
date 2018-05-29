import IDE from '../views/IDE'
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: IDE
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
