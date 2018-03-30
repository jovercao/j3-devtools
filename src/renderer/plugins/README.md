# 插件定义说明

## 声明文件

与`npm`的`package.json`相兼容，主要增加了插件相关信息，以数据扩展插件为例，具体如下：

```js
{
  "j3DevtoolsPlugin": {
    // 插件名称，必须在环境下唯一
    name: "binding-editor",
    // 初始化入口启动程序，将按照依赖顺序执行。
    // 主要用于放置程序，如：vue组件注册，服务注册等
    // 此处定义的将在程序启动时被加载
    main: 'plugin.js',
    // 依赖项
    dependents: {
      'sql': '1.0.0'
    }
  }
}
```

## 初始化入口程序

以数据库管理扩展插件为例，具体如下：

```js
// plugin.js

export default {
  initialize(ide) {
    // 注册Vue组件视图
    ide.registerViews(...)
    // 注册编辑器
    ide.registerEditors(...)
    // 注册侧边栏
    ide.registerSidebar(...)
    // 注册资源服务
    ide.registerResource(...)
  }
}

```