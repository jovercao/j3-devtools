import openDialogVue from './OpenDialog.vue'
import Vue from 'vue'

const OpenDialog = Vue.extend(openDialogVue)

export default {
  async show(openType = 'file', resourceType = 'type') {
    return new Promise((resolve) => {
      const instance = new OpenDialog({
        el: document.createElement('div')
      })
      instance.callback = function({ ok, data }) {
        resolve({ ok, data })
        instance.$destroy()
        instance.$el.remove()
      }

      document.body.appendChild(instance.$el)
    })
  }
}
