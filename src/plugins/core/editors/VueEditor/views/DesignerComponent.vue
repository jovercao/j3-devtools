<script>

import { mapGetters } from 'vuex'

export default {
  props: {
    value: Object,
    selected: Object,
    heightlight: Object
    // overitem: Object
  },
  computed: {
    ...mapGetters('vue-editor', [ 'components' ])
  },
  render (h) {
    const create = (h, value, slot = 'default') => {
      const childs = []
      for (const name in value.slots) {
        const items = value.slots[name]
        if (!items) continue
        for (const item of items) {
          childs.push(create(h, item, name))
        }

        // items.forEach((item) => {
        //   if (item.type === 'MuTextField') {
        //     console.log(name, item)
        //   }
        //   childs.push(create(h, item, name))
        // })
      }
      const vm = this
      const tag = this.components[value.type].tag
      const item = h(tag, {
        slot,
        class: {
          'designer-component': true,
          'designer-component-selected': value === this.selected,
          'designer-component-heightlight': value === this.heightlight
          // 'designer-component-dragover': value === this.overitem
        },
        props: value.props,
        directives: [
          { name: 'designer-mode' }
        ],
        on: {
          '$designer-contextmenu' (event) {
            vm.$emit('contextmenu', value, event)
          },
          '$designer-select' (event) {
            vm.$emit('select', value, event)
          },
          '$designer-mouseover' (event) {
            vm.$emit('mouseover', value, event)
          },
          '$designer-mouseleave' (event) {
            vm.$emit('mouseleave', value, event)
          },
          '$designer-dragstart' (data) {
            vm.$emit('dragstart', value, event)
          },
          '$designer-dragover' (event) {
            // vm.$emit('mouseover', value, event)
            vm.$emit('dragover', value, event)
          },
          '$designer-drop' (event) {
            vm.$emit('drop', value, event)
          },
          '$designer-dragleave' (evnet) {
            // vm.$emit('mouseleave', value, event)
            vm.$emit('dragleave', value, evnet)
          },
          '$designer-dragend' (evnet) {
            // vm.$emit('mouseleave', value, event)
            vm.$emit('dragend', value, evnet)
          }
        }
      }, childs)
      return item
    }

    return create(h, this.value)
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
  background: rgba(235, 216, 250, 0.45);
  border: rgb(218, 192, 248) 1px solid;
}

.designer-component-heightlight {
  background: rgba(242, 231, 255, 0.5);
}

// .designer-component-dragover {
//   border: blueviolet 5px solid;
// }
</style>
