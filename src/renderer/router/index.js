import IDE from '../views/IDE'
import VueRouter from 'vue-router'
import Vue from 'vue'
import service from '../service'

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

service('router', router)

export default router
