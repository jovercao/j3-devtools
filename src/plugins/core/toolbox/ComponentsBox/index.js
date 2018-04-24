import ComponentBox from './ComponentsBox.vue'
import Vue from 'vue'

// 注册组件
Vue.component(ComponentBox.name, ComponentBox)

export default {
  name: ComponentBox.name,
  title: '组件库',
  dock: 'sidebar', // 注册到侧边栏位置
  icon: 'el-icon-menu',
  component: 'component-box',
  // 工具栏按钮，只允许添加按钮
  tools: [
    {
      icon: 'el-icon-plus',
      title: '打开',
      // handler() {}
      command: 'ide.open-floder' // command 与 handler 二选一, 将优先执行command
    }
  ],
  // 右键弹出菜单
  propMenus: [
    {
      icon: 'el-icon-open',
      title: '打开',
      command: 'resource.open-item'
    },
    {
      icon: 'el-icon-change',
      title: '重命名',
      command: 'resource.rename-item'
    },
    {
      icon: 'el-icon-clear',
      title: '删除',
      command: 'resource.remove-item'
    }
  ]
}
