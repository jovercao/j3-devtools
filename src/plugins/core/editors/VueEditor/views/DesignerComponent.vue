<script>

import { mapGetters } from 'vuex'
import { namespace } from '../../../store/vue-editor'

export default {
  props: {
    // 预览模式
    preview: {
      type: Boolean,
      default: false
    },
    viewData: Object,
    activeItem: Object,
    selecteds: Array,
    heightlightItme: Object,
    outlineItem: Object
    // overitem: Object
  },
  computed: {
    ...mapGetters(namespace, [ 'components' ])
  },
  render (h) {
    const create = (h, viewData, slot = 'default') => {
      const childs = []
      for (const name in viewData.slots) {
        const items = viewData.slots[name]
        if (!items) continue
        for (const item of items) {
          childs.push(create(h, item, name))
        }
      }

      const vm = this
      const comp = this.components[viewData.type]
      const tag = comp.tag
      const hasValueProp = !!comp.props.value
      // 动态on绑定
      const eventHandlers = {}
      // 如果有
      if (hasValueProp) {
        // // 将值变更
        // dynamicOn.change = (value, oldValue) => {
        //   console.log(value)
        //   this.$emit('change', viewData, value, oldValue)
        // }

        eventHandlers.input = function (value) {
          vm.$emit('valuechange', viewData, value)
        }
      }
      if (!this.preview) {
        Object.assign(eventHandlers, {
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
          '$designer-mouseenter' (event) {
            vm.$emit('mouseenter', viewData, event)
          },
          '$designer-mouseout' (event) {
            vm.$emit('mouseout', viewData, event)
          },
          '$designer-dragstart' (data) {
            vm.$emit('dragstart', viewData, event)
          },
          '$designer-drop' (event) {
            vm.$emit('drop', viewData, event)
          },
          '$designer-dragenter' (evnet) {
            // vm.$emit('mouseleave', viewData, event)
            vm.$emit('dragenter', viewData, evnet)
          },
          '$designer-dragover' (event) {
            // vm.$emit('mouseover', viewData, event)
            vm.$emit('dragover', viewData, event)
          },
          '$designer-dragleave' (evnet) {
            // vm.$emit('mouseleave', viewData, event)
            vm.$emit('dragleave', viewData, evnet)
          },
          '$designer-dragend' (evnet) {
            // vm.$emit('mouseleave', viewData, event)
            vm.$emit('dragend', viewData, evnet)
          }
        })
      }

      const item = h(tag, {
        slot,
        class: {
          'designer-component': true,
          'selected': this.selecteds.includes(viewData),
          'actived': viewData === this.activeItem,
          'heightlight': viewData === this.heightlightItme,
          'outlineItem': viewData === this.outlineItem,
          'editable': !this.preview
          // 'designer-component-dragover': viewData === this.overitem
        },
        props: viewData.props,
        directives: [
          { name: 'designer-mode', value: !this.preview }
        ],
        on: eventHandlers
      }, childs)
      return item
    }

    return create(h, this.viewData)
  }
}
</script>

<style lang="less">
.designer-component {
  cursor: default;
  .editable {
    outline: silver 1px dotted;
    // transition: background-color .2s;
  }
  * {
    cursor: default;
  }

  &.selected {
    background: rgba(235, 216, 250, 0.35);
    &.actived {
      background: rgba(235, 216, 250, 0.55);
    }
  }

  &.heightlight {
    background: rgba(235, 216, 250, 0.45)
  }

  &.outline {
    outline: solid #555 solid;
  }
}

// .designer-component-dragover {
//   border: blueviolet 5px solid;
// }
</style>
