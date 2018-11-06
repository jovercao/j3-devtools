import openDialogVue from './OpenDialog.vue'
import Vue from 'vue'

const OpenDialog = Vue.extend(openDialogVue)

export default {
  async show(openType = 'file', resourceType = 'type') {
    return new Promise((resolve) => {
      const instance = new OpenDialog({})
      const callback = (paths) => {
        resolve(paths)
        instance.$destroy()
        instance.$el.remove()
      }
      instance.$on('down', callback)
      instance.$on('close', callback)
      const el = document.createElement('div')
      document.body.appendChild(el)
      instance.$mount(el)
    })
  }
}
