import designerMode from './designer-mode'
import draggable from './draggable'
import dropable from './dropable'

export default {
  install (Vue) {
    Vue.directive(designerMode.name, designerMode)
    Vue.directive(draggable.name, draggable)
    Vue.directive(dropable.name, dropable)
  }
}
