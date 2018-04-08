import axios from 'axios'
import helper from './helper'
// 为了能自动初始化组件props属性定义，必须先加载组件。
import service from './service'
import directives from './directives'
import filters from './filters'

export default {
  go(ide, options) {

    // 获取其他组件定义内容
    const uiDesigners = ide.service('UiDesigner')

    // 执行其组件功能，本例为注册组件
    uiDesigners.component(/* id, component */)

    // 注册内容类型
    ide.contentType({
      'vue': {
        title: 'Vue文件'
      }
    })

    // 注册资源管理器
    ide.resource(/* protocol, mgr */)

    // 注册内容类型
    ide.contentType(/* {
      // 名称
      name: '',
      // 显示标题
      title: ''
      // 描述
      description: ''
    } */)

    // 注册store
    ide.store(/* name, model */)

    // 注册编辑器
    ide.editor(/* {
      title: '显示标题',
      description: '描述内容',
      // 编辑器名称，必须唯一
      name: 'j3-view-editor',
      // 兼容的内容类型
      contentTypes: [
        'vue',
        'j3view',
        'css',
        'html'
      ],
      // 所调用的Vue组件
      component: ...,
      position: ''
    } */)

    // 注册工具栏
    ide.toolbox(/*
    {
      // 工具栏名称必须唯一
      name: 'component-library',
      // 位置 [ 'sidebar', 'tabs','footer' ]
      positoion: 'sidebar',
      component: ...
    }
    */)

    // 注册服务
    ide.service(/* id, svc */)

    ide.Vue.use(helper)
    ide.Vue.use(filters)
    ide.Vue.use(directives)
    ide.Vue.use(service)

    // 加载css文件
    ide.css(/* path */)
  }
}
