<template>
  <div class="property-grid">
    <div class="grid-row" v-for="(item, key, index) of attributes" :key="index">
      <div class="grid-property-name">{{key}}</div>
      <div class="grid-property-value">
        <mu-text-field class="text-field" v-if="item.type === String" :hintText="key" v-model="props[key]"/>
        <mu-date-picker v-if="item.type === Date" container="inline"  :hintText="key" v-model="props[key]"/>
        <mu-switch v-if="item.type === Boolean" v-model="props[key]" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ui-designer', {
      component: state =>
        state.selectedNode ? state.selectedNode.component : {},
      attributes: state =>
        state.selectedNode ? state.selectedNode.component.attributes : {},
      props: state => (state.selectedNode ? state.selectedNode.props : {})
    })
  },
  methods: {
    displayValue(value) {
      if (typeof value === 'string' && value.length >= 10) {
        return value.substr(0, 8) + '..'
      }
      return value
    },
    handlerCellClick(rowIndex, columnName, td) {
      let attr = this.attributes[td.name]
      this.showEditor(attr, td)
    },
    showEditor(attr, td) {
      if (attr.type === String) {
        console.log('fdsfds')
      }
    }
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
    flex-basis: 100px;
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
