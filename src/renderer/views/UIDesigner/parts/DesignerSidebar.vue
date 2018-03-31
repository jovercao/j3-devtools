<template>
  <div v-model="activeNames" class="designer-sidebar">
    <div class="outline-box">
      <div class="header">
        <i class="el-icon-share"/> 组件
      </div>
      <div class="body">
        <OutlineBox/>
      </div>
    </div>
    <div class="property-box">
      <div slot="title" class="header">
        <i class="el-icon-tickets"/> 属性
      </div>
      <div class="body">
        <PropertyBox/>
      </div>
    </div>
  </div>
</template>

<script>
import PropertyBox from './PropertyBox'
import OutlineBox from './OutlineBox'
export default {
  components: {
    PropertyBox,
    OutlineBox
  },
  data() {
    return {
      activeNames: ['outline', 'property']
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
    flex-basis: 250px;
    .box;
  }

  .property-box {
    flex-grow: 1;
    .box;
  }

  .box {
    display: flex;
    flex-direction: column;
    .header {
      flex-basis: 32px;
      display: flex;
      padding: 12px;
      // 两端
      .side {
        flex-basis: 32px;
      }
      // 中间
      .center {
        flex-grow: 1;
      }
    }
    .body {
      flex-grow: 1;
      overflow: auto;
    }
  }
}

</style>
