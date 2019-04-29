import resource from './resource'
import vueEditor from './vue-editor'
import namespaces from './namespaces'

export default (ctx) => {
  return {
    [namespaces.resource]: resource(ctx),
    [namespaces.vueEditor]: vueEditor(ctx)
  }
}
