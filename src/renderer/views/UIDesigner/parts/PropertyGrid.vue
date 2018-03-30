<template>
  <div class="property-grid">
    <div @mouseover="curProp = key" :class="['grid-row', { 'grid-property-current': curProp === key } ]" v-for="(item, key, index) in selectedComponent.props" :key="index">
      <div class="grid-property-name">{{selectedComponent.props[key].title || key}}</div>
      <div class="grid-property-value">
          <value-editor :selections="selectedComponent.props[key].selections" class="" :data-type="item.type" :value="props[key]" :hintText="selectedComponent.props[key].description || selectedComponent.props[key].title" @change="changeProp({ prop: key, value: arguments[0] })"/>
      </div>
    </div>
    <div v-if="selectedItem && curProp && selectedComponent.props[curProp]" class="grid-property-description">
      {{curProp}} - {{selectedComponent.props[curProp].descripion || selectedComponent.props[curProp].title}}
    </div>
  </div>
</template>