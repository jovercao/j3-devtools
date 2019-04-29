import StyleBox from './StyleBox.vue'
import Vue from 'vue'

// 注册组件
Vue.component(StyleBox.name, StyleBox)

export default {
  name: StyleBox.name,
  component: StyleBox.name,
  title: '样式设置',
  dock: 'sidebar', // 注册到侧边栏位置
  icon: 'style',
  // 工具栏按钮，只允许添加按钮
  tools: [
    // {
    //   icon: 'el-icon-plus',
    //   title: '无',
    //   // handler() {}
    //   command: 'ide.open-floder' // command 与 handler 二选一, 将优先执行command
    // }
  ],
  // 右键弹出菜单
  propMenus: [
    {
      icon: 'el-icon-open',
      title: '打开',
      command: 'resource.open-item'
    }
  ]
}
