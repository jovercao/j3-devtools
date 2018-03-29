<script>
import { components } from '../../../catalogs'
import { mapMutations } from 'vuex'
import modules from '../../../store/store-modules'

export default {
  props: {
    viewData: Object,
    selected: Object,
    heightlight: Object
  },
  render (h) {
    return this.create(h, this.viewData)
  },
  methods: {
    ...mapMutations(modules.UiDesigner, [ 'addChildItem' ]),
    handlerDropComponent(viewData, dropedViewData) {
      console.log(dropedViewData)
      this.addChildItem({ viewData, dropedViewData, slot: 'default' })
    },
    create (h, viewData, slot = 'default') {
      const childs = []
      for (const name in viewData.slots) {
        const items = viewData.slots[name]
        for (const item of items) {
          childs.push(this.create(h, item, name))
        }
      }
      const vm = this
      const tag = components[viewData.type].tag
      return h(tag, {
        slot,
        class: {
          'designer-component': true,
          'designer-component-selected': viewData === this.selected,
          'designer-component-heightlight': viewData === this.heightlight
        },
        props: viewData.props,
        directives: [
          { name: 'designer-mode' },
          { name: 'dropable', arg: 'data', value: (dropedViewData) => this.handlerDropComponent(viewData, dropedViewData) }
        ],
        on: {
          '$designer-select' () {
            console.log('click evnet emmit.')
            vm.$emit('select', viewData)
          },
          '$designer-mouseover' () {
            vm.$emit('mouseover', viewData)
          },
          '$designer-mouseleave' () {
            vm.$emit('mouseleave', viewData)
          }
        }
      }, childs)
    }
  }
}
</script>

<style lang="less">
.designer-component {

}

.designer-component-selected {
  .designer-component-heightlight;
  border: #bbb 1px solid;
}

.designer-component-heightlight {
  background: #eee
}
</style>
