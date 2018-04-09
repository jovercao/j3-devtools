<template>
  <div class="object-editor">
    <div class="container">
      <input ref="field" :name="name" type="text" :value="jsonValue" @focus="isFocused = true" @blur="isFocused = false"
        :disabled="disabled" class="mu-text-field-input field" :required="required">
      <div class="icon" @click="dialogVisible = true">
        <i class="el-icon-more"/>
      </div>
    </div>
    <underline :focus="isFocused" :disabled="disabled"/>
    <mu-popover class="pop" :trigger="$refs.field" :open="dialogVisible" @close="dialogVisible = false">
      <property-grid class="body" :props="props" :propsData="propsData" @propchange="emitPropChange" />
      <div class="footer"></div>
    </mu-popover>
  </div>
</template>

<script>
import Underline from './Underline'

export default {
  components: {
    Underline
  },
  props: {
    label: String,
    name: String,
    props: Object,
    propsData: Object,
    value: Object,
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialogVisible: false,
    isFocused: false
  }),
  computed: {
    jsonValue() {
      return JSON.stringify(this.propsData)
    }
  },
  beforeCreate: function () {
    // 避免循环引用
    this.$options.components.PropertyGrid = require('./PropertyGrid.vue').default
  },
  methods: {
    emitPropChange(...args) {
      this.$emit('propchange', ...args)
    }
  }
}
</script>

<style lang="less">
.object-editor {
  // align-items: stretch;
  // flex-direction: row;
  width: 100%;
  position: relative;
  height: 40px;
  .container {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 35px;
    .field {
      flex-basis: 0px;
      flex-grow: 1;
    }
    .icon {
      cursor: pointer;
      flex-basis: 21px;
    }
  }
}
</style>
