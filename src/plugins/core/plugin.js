import file from './resource/file'
import ExplorerBox from './toolbox/ExplorerBox.vue'

function go(ide, options) {
  // 注册服务
  ide.resource('file', file)
  ide.Vue.component('explorer-box', ExplorerBox)
  // 将ide的api注入到组件中
  ide.mixin.joinTo('ide', ExplorerBox)
  // 将资源管理器注册到IDE中
  ide.toolbox('explorer-box', {
    title: '资源管理器',
    dock: 'sidebar', // 注册到侧边栏位置
    icon: 'view_modules',
    component: 'explorer-box'
  })
}

const def = {
  go,
  defaultConfig: {
    'default-sidbar': 'explorer-box'
  }
}

export default def
export { go }
