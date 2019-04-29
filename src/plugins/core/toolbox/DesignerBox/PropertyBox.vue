<template>
  <property-grid tabindex="0" class="property-box"
    @propchange="changeProp"
    @pubpropchange="changeSelectedsProp"
    :props="props"
    :pubProps="pubProps"
    :propsData="propsData"
    :showFooter="true">
  </property-grid>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { namespace } from '../../store/vue-editor'
import _ from 'lodash'

export default {
  computed: {
    ...mapGetters(namespace, ['components']),
    ...mapState(namespace, {
      propsData: state => (state.activeItem ? state.activeItem.props : {}),
      props(state) {
        return state.activeItem ? this.components[state.activeItem.type].props : {}
      },
      activeItem: state => state.activeItem,
      pubProps(state) {
        if (state.selecteds.length <= 1) return null
        const props = {}
        const comp = (index) => this.components[state.selecteds[index].type]
        const prop = (index, key) => comp(index).props[key]
        const value = (index, key) => state.selecteds[index].props[key]
        // 查找属性交集
        for (const name in comp(0).props) {
          const one = prop(0, name)
          let isPublic = true
          let isSameValue = true
          for (let i = 1; i < state.selecteds.length; i++) {
            const other = prop(i, name)
            // 判断是否相同属性，通过标题、描述、类型以及选择列表来进行判断
            if (
              !other ||
              !_.eq(one.title, other.title) ||
              !_.eq(one.description, other.description) ||
              !_.isEqual(one.type, other.type) ||
              !_.isEqual(one.selections, other.selections)
            ) {
              isPublic = false
              break
            }

            isSameValue &= _.isEqual(value(0, name), value(i, name))
          }
          if (isPublic) {
            props[name] = {
              title: one.title,
              type: one.type, // 复制，以免出错
              selections: _.clone(one.selections)
            }
            if (isSameValue) {
              props[name].value = value(0, name)
            }
          }
        }
        return props
      }
    })
  },
  methods: {
    ...mapActions(namespace, [ 'changeProp', 'changeSelectedsProp' ])
  }
}
</script>

<style lang="less" scoped>
.property-box {
  height: 100%;
  &:focus {
    outline: none;
    // background: #f8f8f8;
  }
}
</style>
