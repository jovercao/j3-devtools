<template>
  <div class="sidebar">
    <div class="header">
      <span>{{ activeSidebar ? activeSidebar.title : '未打开' }}</span>
      <div class="right">
        <ide-icon-button icon="el-icon-d-arrow-left" :size="12" @click="hideSidebar"/>
        <!-- <mu-icon class="hide-btn"
          @click.native="hideSidebar"
          value="keyboard_arrow_left" :size="16" /> -->
      </div>
    </div>
    <keep-alive>  
      <component class="body" :is="activeSidebar.component" />
    </keep-alive>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['activeSidebar'])
  },
  methods: {
    ...mapMutations(['hideSidebar'])
  }
}
</script>


<style lang="less" scoped>
  @import url('../../assets/define.less');

  .sidebar {
    background: @bg1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .header {
      font-size: 9pt;
      color: #bbb;
      line-height: 26px;
      flex: 0 0 32px;
      padding: 3px 12px 3px 12px;
      background: @bg1;
      .right {
        float: right;
        .hide-btn {
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
    .body {
      flex: 1 1 0px;
    }
  }
</style>
