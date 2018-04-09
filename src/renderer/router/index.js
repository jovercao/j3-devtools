import IDE from '../views/IDE'

export default {
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
}
