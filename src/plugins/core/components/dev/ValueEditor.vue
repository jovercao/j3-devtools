<template>
  <div>
    <mu-select-field underlineClass="text-field-underline" class="text-field"  v-if="selections" :value="value" @change="emitChange">
      <mu-menu-item v-for="(item, index) in selections" :key="index" :value="item.value" :title="item.title || item.value" />
    </mu-select-field>

    <mu-text-field underlineClass="text-field-underline" type="number" v-else-if="isType(Number)" 
      class="text-field" :value="value" :hintText="hintText" 
      @change="emitChange(parseFloat(arguments[1]))"/>

    <mu-date-picker v-if="isType(Date)" container="inline" :value="value" :hintText="hintText" @change="emitChange(arguments[1])"/>
    <mu-switch v-if="isType(Boolean)" :value="value" @change="emitChange(arguments[1])" :hintText="hintText"/>
    <object-editor v-else-if="isType(Object)" class="text-field" :label="label" :props="subProps" :propsData="value" :hintText="hintText" @change="emitChange"/>
    <array-editor v-else-if="isType(Array)" class="text-field" :value="value" :hintText="hintText" @change="emitChange"/>
    <regexp-editor v-else-if="isType(RegExp)" class="text-field" :value="value" :hintText="hintText" @change="emitChange"/>
    <mu-text-field underlineClass="text-field-underline" class="text-field" v-else :value="value" :hintText="hintText" @change="emitChange(arguments[1])"/>

  </div>
</template>

<script>
import ObjectEditor from './ObjectEditor'
import ArrayEditor from './ArrayEditor'
import StyleEditor from './StyleEditor'
import ClassEditor from './ClassEditor'
import RegexpEditor from './RegexpEditor'
import _ from 'lodash'

export default {
  components: {
    ObjectEditor,
    RegexpEditor,
    StyleEditor,
    ArrayEditor,
    ClassEditor
  },
  props: [
    // {
    //   name: 'dataType',
    //   type: Function,
    //   default: String
    // },
    'dataType',
    'value',
    'hintText',
    'selections',
    'label',
    'subProps'
  ],
  render() {

  },
  methods: {
    emitChange(...args) {
      this.$emit('change', ...args)
    },
    isType(type) {
      if (this.dataType === type) {
        return true
      }
      if (_.isArray(this.dataType)) {
        if (this.dataType.includes(type)) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style>

.text-field {
  width: 100%;
}

.text-field-underline {
  background: #999;
}

</style>