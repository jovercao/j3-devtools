<script>

import { mapGetters } from 'vuex'

export default {
  props: {
    viewData: Object,
    activeItem: Object,
    selecteds: Array,
    heightlight: Object
    // overitem: Object
  },
  computed: {
    ...mapGetters('vue-editor', [ 'components' ])
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
      const dynamicOn = {}
      // 如果有
      if (hasValueProp) {
        // // 将值变更
        // dynamicOn.change = (value, oldValue) => {
        //   console.log(value)
        //   this.$emit('change', viewData, value, oldValue)
        // }

        dynamicOn.input = function (value) {
          vm.$emit('valuechange', viewData, value)
        }
      }
      const item = h(tag, {
        slot,
        class: {
          'designer-component': true,
          'selected': this.selecteds.includes(viewData),
          'actived': viewData === this.activeItem,
          'heightlight': viewData === this.heightlight
          // 'designer-component-dragover': viewData === this.overitem
        },
        props: viewData.props,
        directives: [
          { name: 'designer-mode' }
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
          },
          ...dynamicOn
          // input (value) {
          //   console.log(value)
          //   this.$emit('input', viewData, value)
          // }
        }
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
  outline: silver 1px dotted;
  // transition: background-color .2s;

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
}

// .designer-component-dragover {
//   border: blueviolet 5px solid;
// }
</style>
