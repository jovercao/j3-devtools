import file from './resource/file'
// import ExplorerBox from './toolbox/ExplorerBox.vue'
import commands from './commands'

function go(ide, options) {
  // 注册资源
  ide.resource('file', file)
  // ide.Vue.component('explorer-box', ExplorerBox)
  // 将ide的api注入到组件中
  // ide.mixin.joinTo('ide', ExplorerBox)
  // 将资源管理器注册到IDE中
  // ide.toolbox('explorer-box', {
  //   title: '资源管理器',
  //   dock: 'sidebar', // 注册到侧边栏位置
  //   icon: 'view-modules',
  //   component: 'explorer-box'
  // })

  // 注册命令
  ide.commands(commands)
}

const def = {
  go,
  defaultConfig: {
    'default-sidbar': 'explorer-box'
  }
}

export default def
export { go }
