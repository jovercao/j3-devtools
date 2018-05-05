<template>
  <div class="designer-sidebar">
    <div :class="['outline-box', { 'collapsed': !outlineExpaned }]">
      <div class="header" @click="outlineExpaned = !outlineExpaned">
        <div class="left">
          <i class="el-icon-share"/>
        </div>
        <div class="center">大纲</div>
        <div class="right"> 
          <i :class="{ 'el-icon-arrow-down': outlineExpaned, 'el-icon-arrow-right': !outlineExpaned }"/>
        </div>
      </div>
      <OutlineBox class="body"/>
    </div>
    <div  :class="['property-box', { 'collapsed': !propertyExpand }]">
      <div slot="title" class="header" @click="propertyExpand = !propertyExpand">
        <div class="left">
          <i class="el-icon-tickets"/> 
        </div>
        <div class="center"> 属性</div>
        <div class="right">
          <i :class="{ 'el-icon-arrow-down': propertyExpand, 'el-icon-arrow-right': !propertyExpand }"/>
        </div>
        
      </div>
      <PropertyBox class="body"/>
    </div>
  </div>
</template>

<script>
import PropertyBox from './PropertyBox'
import OutlineBox from './OutlineBox'

export default {
  name: 'designer-box',
  components: {
    PropertyBox,
    OutlineBox
  },
  data() {
    return {
      activeNames: ['outline', 'property'],
      outlineExpaned: true,
      propertyExpand: true
    }
  }
}
</script>

<style lang="less" scoped>

.designer-sidebar {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .outline-box {
    flex-basis: 300px;
    .box;
  }

  .property-box {
    flex-grow: 1;
    flex-basis: 0px;
    .box;
  }

  .box {
    display: flex;
    flex-direction: column;
    .header {
      flex-basis: 36px;
      cursor: pointer;
      display: flex;
      padding: 0px 12px 0px 12px;
      line-height: 36px;
      background: #e1e1e1;
      .left {
        font-size: 12px;
        flex-basis: 36px;
      }
      line-height: 36px;
      // 两端
      .right {
        flex-basis: 36px;
        line-height: 36px;
        text-align: right;
      }
      // 中间
      .center {
        flex-basis: 0px;
        text-align: center;
        flex-grow: 1;
      }
    }
    .body {
      flex-grow: 1;
      flex-basis: 0px;
      overflow: auto;
    }
  }

.collapsed {
    flex-basis: 36px;
    .body {
      display: none;
    }
  }
}

</style>
