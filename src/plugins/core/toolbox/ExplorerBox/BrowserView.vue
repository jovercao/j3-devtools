<template>
  <div class="browser-view">
    <div class="header">
      {{resourceName}}打开文件夹
    </div>
    <div class="body">
      <div class="item" v-for="(item, index) in list" :key="index">
        <i :class="item.icon"/>
        <span>{{tile.title}}</span>
      </div>
    </div>
    <div class="footer">
      <mu-flat-button label="打开" primary/>
      <mu-flat-button label="取消" secondary/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resourceType: String,
    resourcePath: {
      type: String,
      default: '/'
    }
  },
  data() {
    return {
      list: [
        {
          icon: 'el-icon-home',
          contentType: 'js',
          title: '文件1.js'
        },
        {
          icon: 'el-icon-home',
          title: '文件2.vue',
          contentType: 'vue'
        },
        {
          icon: 'el-icon-home',
          contentType: 'view',
          title: 'J3视图1'
        },
        {
          icon: 'el-icon-home',
          contentType: 'js',
          title: '文件4.js'
        },
        {
          icon: 'el-icon-home',
          contentType: 'js',
          title: '文件5.js'
        },
        {
          icon: 'el-icon-home',
          contentType: 'js',
          title: '文件6.js'
        }
      ]
    }
  },
  methods: {
    loadList() {
      const resource = this.$service('resource')
      this.list = resource(this.resourceType).list(this.resourcePath)
    }
  }
}
</script>


<style lang="less" scoped>
.browser-view {
  width: 640px;
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .header {
    flex: 0 0 32px;
  }
  .body {
    flex: 1 1 0px;
    .item {
      float: left;
      width: 96px;
      height: 96px;
      padding: 20px;
    }
  }

  .footer {
    flex: 0 0 36px;
    text-align: center;
  }
}
</style>
