<script>

import { mapGetters } from 'vuex'
import modules from '../../../store/store-modules'

export default {
  props: {
    viewData: Object,
    selected: Object,
    heightlight: Object
    // overitem: Object
  },
  computed: {
    ...mapGetters(modules.UiDesigner, [ 'components' ])
  },
  render (h) {
    return this.create(h, this.viewData)
  },
  methods: {
    // 逻辑转移到了 DesignerView
    // ...mapMutations(modules.UiDesigner, [ 'addChildItem' ]),
    // handlerDropComponent(viewData, dropedViewData) {
    //   if (dropedViewData && dropedViewData.type === 'component') {
    //     this.addChildItem({ viewData, item: dropedViewData.component, slot: 'default' })
    //   }
    // },
    create (h, viewData, slot = 'default') {
      const childs = []
      for (const name in viewData.slots) {
        const items = viewData.slots[name]
        if (!items) continue
        for (const item of items) {
          childs.push(this.create(h, item, name))
        }

        // items.forEach((item) => {
        //   if (item.type === 'MuTextField') {
        //     console.log(name, item)
        //   }
        //   childs.push(this.create(h, item, name))
        // })
      }
      const vm = this
      const tag = this.components[viewData.type].tag
      const item = h(tag, {
        slot,
        class: {
          'designer-component': true,
          'designer-component-selected': viewData === this.selected,
          'designer-component-heightlight': viewData === this.heightlight
          // 'designer-component-dragover': viewData === this.overitem
        },
        props: viewData.props,
        directives: [
          { name: 'designer-mode' }
          // 为避免事件名称冲突已转去designer-mode
          // { name: 'dropable', arg: 'data', value: (dropedViewData) => this.handlerDropComponent(viewData, dropedViewData) }
        ],
        on: {
          '$designer-contextmenu' (event) {
            vm.$emit('contextmenu', viewData, event)
          },
          '$designer-select' (event) {
            vm.$emit('select', viewData, event)
          },
          '$designer-mouseover' (event) {
            vm.$emit('mouseover', viewData, event)
          },
          '$designer-mouseleave' (event) {
            vm.$emit('mouseleave', viewData, event)
          },
          '$designer-dragstart' (data) {
            vm.$emit('dragstart', viewData, event)
          },
          '$designer-dragover' (event) {
            // vm.$emit('mouseover', viewData, event)
            vm.$emit('dragover', viewData, event)
          },
          '$designer-drop' (event) {
            vm.$emit('drop', viewData, event)
          },
          '$designer-dragleave' (evnet) {
            // vm.$emit('mouseleave', viewData, event)
            vm.$emit('dragleave', viewData, evnet)
          },
          '$designer-dragend' (evnet) {
            // vm.$emit('mouseleave', viewData, event)
            vm.$emit('dragend', viewData, evnet)
          }
        }
      }, childs)
      return item
    }
  }
}
</script>

<style lang="less">
.designer-component {
  cursor: default;
  input {
    cursor: default;
  }
}

.designer-component-selected {
  background: rgb(211, 211, 211);
  border: rgb(158, 158, 158) 1px solid;
}

.designer-component-heightlight {
  background: rgb(229, 229, 230);
}

// .designer-component-dragover {
//   border: blueviolet 5px solid;
// }
</style>
