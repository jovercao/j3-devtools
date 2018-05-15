import focus from './focus'

export default {
  install(Vue) {
    Vue.directive(focus.name, focus)
  }
}
