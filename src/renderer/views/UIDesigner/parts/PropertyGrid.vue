<template>
  <div class="property-grid">
    <div class="body">
      <div v-for="(prop, name, index) in propsDefine" :key="index"
        @mouseenter="hoverProp = name"
        @mouseout="hoverProp = ''"
        class="row" >
        <div class="name">{{ prop.title || name }}</div>
        <div class="value">
            <value-editor
              :selections="prop.selections"
              class="editor"
              :data-type="prop.type"
              :value="props[name]"
              :hintText="prop.description || prop.title"
              @change="$emit('propchange', { prop: name, value: arguments[0], oldValue: arguments[1] })"
            />
        </div>
      </div>
    </div>
    <div v-if="showFooter && hoverProp" class="footer">
      {{hoverProp}} - {{propsDefine[hoverProp].descripion || propsDefine[hoverProp].title}}
    </div>
  </div>
</template>

<script>
import ValueEditor from './editors/ValueEditor'

export default {
  components: {
    ValueEditor
  },
  props: {
    propsDefine: Object,
    props: Object,
    showFooter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hoverProp: ''
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~muse-ui/src/styles/colors.less');

.property-grid {
  display: flex;
  flex-direction: row;
  .footer {
    flex-basis: 32px;
  }
  .body {
    flex-grow: 1;
    overflow-y: auto;
    .row {
      :hover {
        background: #eee;
      }
      padding: 0px 15px 0px 15px;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      height: 50px;
      line-height: 50px;
      vertical-align: middle;
      .value {
        flex-grow: 1;
        flex-basis: 0px;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        overflow: hidden;
        .editor {
          width: 100%;
        }
      }
      .name {
        overflow: hidden;
        height: 50px;
        line-height: 50px;
        flex-basis: 80px;
        vertical-align: middle;
      }
      .default {
        color: @grey200;
      }
    }
  }
}
</style>
