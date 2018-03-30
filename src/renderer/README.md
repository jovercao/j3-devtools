
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [Renderer目录结构说明](#renderer目录结构说明)
	* [components - 组件](#components-组件)
	* [directives - 指令](#directives-指令)
	* [plugins 插件封装](#plugins-插件封装)
	* [helper - 助手](#helper-助手)
	* [router - 路由](#router-路由)
	* [service - 服务](#service-服务)
		* [resource - 资源管理器](#resource-资源管理器)
		* [catalogs - 组件相关声明资源](#catalogs-组件相关声明资源)
			* [binding - 绑定](#binding-绑定)
			* [actions - 操作](#actions-操作)
	* [views - 功能视图](#views-功能视图)
	* [utils 工具类](#utils-工具类)
	* [store - vuex](#store-vuex)
	* [helper - Vue助手工具](#helper-vue助手工具)
	* [assets - 静态资源](#assets-静态资源)

<!-- /code_chunk_output -->

# Renderer目录结构说明

## components - 组件

自定义可重用组件，不包含UI设计器组件声明

## directives - 指令

用于存放VUE指令扩展

## plugins 插件封装

用于存放IDE插件。

## helper - 助手

为Vue实例添加一些常用函数，如：字符串格式化，将挂载在 Vue.rpototype.$helper 下

## router - 路由

VUE路由

## service - 服务

service 文件夹用于存放所有无状态服务，将被挂载在 `Vue.rpototype.$service`下
，主要内容包括:

- 远程API
- 静态数据
- 资源管理
- ...

### resource - 资源管理器

资源管理器的相关程序文件


### catalogs - 组件相关声明资源

用于声明自定义组件，以便于UI设计器识别的资源包

#### binding - 绑定

用于存放绑定相关程序声明

#### actions - 操作

## views - 功能视图

存放VUE 功能视图模块的Vue文件

## utils 工具类

用于存放JS及语言相关工具，主要为 `lodash` 程序及一些自定义扩展

## store - vuex

Vuex Store

## helper - Vue助手工具

用于存放界面相关操作，被挂载到Vue.propotype.$hepler

用于存放操作相关程序声明

## assets - 静态资源

用于存放静态资源，如：图片，视频等
