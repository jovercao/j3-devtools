<template>
  <div class="property-grid">
    <div @mouseover="curProp = key" :class="['grid-row', { 'grid-property-current': curProp === key } ]" v-for="(item, key, index) in selectedComponent.props" :key="index">
      <div class="grid-property-name">{{selectedComponent.props[key].title || key}}</div>
      <div class="grid-property-value">
          <value-editor :selections="selectedComponent.props[key].selections" class="" :data-type="item.type" :value="selectedProps[key]" :hintText="selectedComponent.props[key].description || selectedComponent.props[key].title" @change="changeProp({ prop: key, value: arguments[0] })"/>
      </div>
    </div>
    <div v-if="selectedItem && curProp && selectedComponent.props[curProp]" class="grid-property-description">
      {{curProp}} - {{selectedComponent.props[curProp].descripion || selectedComponent.props[curProp].title}}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import modules from '../../../store/store-modules'
import ValueEditor from './editors/ValueEditor'
export default {
  data() {
    return {
      curProp: null
    }
  },
  components: {
    ValueEditor
  },
  computed: {
    ...mapState(modules.UiDesigner, {
      selectedProps: state => state.selectedItem ? state.selectedItem.props : {},
      selectedItem: state => state.selectedItem
    }),
    ...mapGetters(modules.UiDesigner, [ 'selectedComponent' ])
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
    ...mapMutations(modules.UiDesigner, ['changeProp'])
  }
}
</script>

<style lang="less" scoped>
@import url('~muse-ui/src/styles/colors.less');

.default-value {
  color: @grey200;
}

.grid-property-current {
  background: #eee
}

.grid-row {
  padding: 0px 15px  0px 15px;
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
    flex-basis: 120px;
    vertical-align: middle;
  }
}
.grid-property-description {
  color: #aaa
}

.property-header {
  text-align: center;
  vertical-align: middle;
  font-size: 1.3em;
  padding: 25px;
}
.property-grid {
  
}

.mu-table {
  background-color: black !important;
}

.container {
  height: 100%;
  width: 100%;
}
</style>
