import IDE from '../views/IDE'
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

export default new VueRouter({
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
