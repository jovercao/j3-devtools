import resource from './resource'
import vueEditor from './vue-editor'

export default function(ctx) {
  const { store } = ctx
  store('resource', resource(ctx))
  store('vue-editor', vueEditor(ctx))
}
