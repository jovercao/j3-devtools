import IconButton from './IconButton.vue'
import ExpandTransition from './ExpandTransition.vue'

export default {
  install(Vue) {
    Vue.component('ide-icon-button', IconButton)
    Vue.component('expand-transition', ExpandTransition)
  }
}
