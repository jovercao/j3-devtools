<template>
  <div>
    <mu-select-field class="text-field"  v-if="selections" :value="value" @change="emitChange(arguments[0])">
      <mu-menu-item v-for="(item,index) in selections" :key="index" :value="item.value" :title="item.title || item.value" />
    </mu-select-field>

    <el-input-number class="text-field" v-else-if="dataType === Number" :value="value" :hintText="hintText" @change="emitChange"/>
    <mu-date-picker v-if="dataType === Date" container="inline" :value="value" :hintText="hintText" @change="emitChange(arguments[1])"/>
    <mu-switch v-if="dataType === Boolean" :value="value" @change="emitChange(arguments[1])" :hintText="hintText"/>
    <object-editor class="text-field" v-else-if="dataType === Object" :value="value" :hintText="hintText" @change="emitChange"/>
    <mu-text-field class="text-field" v-else-if="dataType === String" :value="value" :hintText="hintText" @change="emitChange(arguments[1])"/>

  </div>
</template>

<script>
import ObjectEditor from './ObjectEditor'

export default {
  components: {
    ObjectEditor
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
    'selections'
  ],
  methods: {
    emitChange(...args) {
      console.log(args)
      this.$emit('change', ...args)
    }
  }
}
</script>

<style>

.text-field {
  width: 100%;
}

</style>