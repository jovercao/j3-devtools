import resource from './resource'
import vueEditor from './vue-editor'

export default (ctx) => {
  return {
    resource: resource(ctx),
    'vue-editor': vueEditor(ctx)
  }
}
