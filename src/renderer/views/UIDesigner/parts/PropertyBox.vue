<template>
  <div class="property-grid">
    <div class="grid-row" v-for="(item, key, index) in curCmp.props" :key="index">
      <div class="grid-property-name">{{key}}</div>
      <div class="grid-property-value">
        <mu-text-field class="text-field" v-if="item.type === String" :value="props[key]" :hintText="key" @change="changeProp({ prop: key, value: arguments[1] })"/>
        <el-input-number class="text-field" v-if="item.type === Number" :value="props[key]" :hintText="key" @input="changeProp({ prop: key, value: arguments[0] })"/>
        <mu-date-picker v-if="item.type === Date" container="inline" :value="props[key]" :hintText="key" @change="changeProp({ prop: key, value: arguments[1] })"/>
        <mu-switch v-if="item.type === Boolean" :value="props[key]" @change="changeProp({ prop: key, value: arguments[1] })" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import modules from '../../../store/store-modules'

export default {
  computed: {
    ...mapState(modules.UiDesigner, {
      component: state => state.selectedComponent,
      props: state => state.selectedItem ? state.selectedItem.props : {},
      selectedItem: state => state.selectedItem
    }),
    ...mapGetters(modules.UiDesigner, [ 'curCmp' ])
  },
  methods: {
    displayValue(value) {
      if (typeof value === 'string' && value.length >= 10) {
        return value.substr(0, 8) + '..'
      }
      return value
    },
    handlerCellClick(rowIndex, columnName, td) {
      let attr = this.propsDefine[td.name]
      this.showEditor(attr, td)
    },
    showEditor(attr, td) {
      if (attr.type === String) {
        console.log('fdsfds')
      }
    },
    ...mapActions(modules.UiDesigner, ['changeProp'])
  }
}
</script>

<style lang="less" scoped>
@import url('~muse-ui/src/styles/colors.less');

.default-value {
  color: @grey200;
}

.grid-row {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  .grid-property-value {
    flex-grow: 1;
    overflow: hidden;
    vertical-align: middle;
    overflow: hidden;
  }
  .grid-property-name {
    overflow: hidden;
    display:inline-block;
    flex-basis: 150px;
    vertical-align: middle;
  }

  .text-field {
    width: 100%;
  }
}
.property-header {
  text-align: center;
  vertical-align: middle;
  font-size: 1.3em;
  padding: 5px;
}
.property-grid {
  padding: 25px;
}

.mu-table {
  background-color: black !important;
}

.container {
  height: 100%;
  width: 100%;
}
</style>
