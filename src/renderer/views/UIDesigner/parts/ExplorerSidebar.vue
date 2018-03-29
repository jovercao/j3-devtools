<template>
  <el-collapse class="components-box">
    <el-collapse-item name="outline">
      <div slot="title" class="head">
        <i class="el-icon-share"/> 组件
      </div>
      <OutlineBox/>
    </el-collapse-item>
    <el-collapse-item name="property">
      <div slot="title" class="head">
        <i class="el-icon-tickets"/> 属性
      </div>
      <PropertyBox/>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import PropertyBox from './PropertyBox'
import OutlineBox from './OutlineBox'
export default {
  components: {
    PropertyBox,
    OutlineBox
  }
}
</script>

<style lang="less" scoped>

.el-collapse-item__wrap {
  background-color: transparent !important;
}

.components-box {
  background-color: transparent !important;
}

.head {
  padding-left: 15px;
}

.el-carousel__mask, .el-cascader-menu, .el-cascader-menu__item.is-disabled:hover, .el-collapse-item__header, .el-collapse-item__wrap {
  background: transparent !important;
}
</style>
