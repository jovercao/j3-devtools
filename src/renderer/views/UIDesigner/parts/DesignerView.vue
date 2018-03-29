<template>
  <DesignerComponent v-if="viewData" :viewData="viewData" :selected="selectedItem
  " :heightlight="hlItem" @select="handlerSelect" @mouseleave="handlerMouseleave" @mouseover="handlerMouseenter"/>
</template>

<script>
import DesignerComponent from './DesignerComponent'
import { mapState, mapMutations } from 'vuex'
import modules from '../../../store/store-modules'
// import './DesignerBox.less'
// import Vue from 'vue'

export default {
  components: {
    DesignerComponent
  },
  // render(create) {
  //   // const tpl = this.buildTemplate(this.viewData)
  //   // console.log(tpl)
  //   // return create(tpl)
  //   // const child = this.createItem(this.viewData)

  //   const child = this.createItem(create, this.viewData)
  //   return create('div', {
  //     class: [ 'designer-box' ]
  //   }, [ child ])

  //   // return create(this.buildComponent())
  // },
  computed: {
    ...mapState(modules.UiDesigner, [ 'viewData', 'selectedItem', 'hlItem' ])
  },
  methods: {
    ...mapMutations(modules.UiDesigner, [ 'changeHlItem', 'selectItem' ]),
    handlerMouseenter(item) {
      this.changeHlItem(item)
    },
    handlerMouseleave(item) {
      this.changeHlItem(null)
    },
    handlerSelect(item) {
      this.selectItem(item)
    }
    /** ***********方法一通过create动态创建************ **/
    // createItem(create, viewData, slot = 'default') {
    //   const tag = this.catalogs[viewData.type].tag
    //   const childs = []
    //   for (const name in viewData.slots) {
    //     for (const item of viewData.slots[name]) {
    //       childs.push(this.createItem(create, item, name))
    //     }
    //   }
    //   const data = Object.assign({
    //     slot,
    //     class: [ 'designer-component', { 'designer-component-hover': this.hlItem === viewData, 'designer-component-selected': this.selectedItem === viewData } ],
    //     props: viewData.props
    //   })

    //   console.log(data)
    //   return create(tag, data, childs)
    // },
    // /** ********************方法2，通过生成模板创建*********************** **/
    // buildComponent() {
    //   const template = this.buildTemplate(this.viewData)
    //   console.log(template)
    //   return Vue.extend({
    //     template,
    //     props: {
    //       viewData: Object
    //     }
    //   })
    // },
    // buildTemplate(viewData) {
    //   return `<div class="designer-box">${this.buildItem(this.viewData)}</div>`
    // },
    // buildItem(viewData, slotName = 'default') {
    //   const tag = this.catalogs[viewData.type].tag
    //   const slots = this.buildSlots(viewData.slots)
    //   const props = this.buildProps(viewData.props)
    //   return `<${tag} class="designer-box-item" slot="${slotName}" ${props}>${slots}</${tag}>`
    // },
    // buildProps(props) {
    //   let res = ''
    //   for (const key in props) {
    //     res += ` :${key} = "${this.buildValue(props[key])}"`
    //   }
    //   return res
    // },
    // buildValue(value) {
    //   if (typeof value === 'string') {
    //     return '\'' + value.replace(/'/g, '\\\'') + '\''
    //   }
    //   // 将双引号替换为单引号
    //   return JSON.stringify(value).replace(/(([^\\])("))/g, '$2\'')
    // },
    // buildSlots(slots) {
    //   let res = ''
    //   for (const name in slots) {
    //     for (const item of slots[name]) {
    //       res += this.buildItem(item, name)
    //     }
    //   }
    //   return res
    // }
  }
}
</script>

<style lang="less">
.designer-box {
  height: 100%;
  width: 100%;
}

.designer-component-selected {
  background: #ddd;
}

.designer-component-hover {
  .designer-component-selected;
}
</style>
