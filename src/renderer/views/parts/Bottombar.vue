<template>
  <div class="bottombar">
    <div class="header">
      <div class="tabs">
        <mu-flat-button v-for="(bar, index) in $ide.visibleBottombars" :key="index"
          :class="{ actived: activeBottombar === bar }"
          :label="bar.title"
          @click="$ide.setActiveBottombar(bar)" />
      </div>
      <div class="tools">
        <mu-icon v-for="(item, index) in $ide.activeBottombar.tools" :key="index"
        :value="item.icon"
        @click.native="$exec(item.command)" />
      </div>
      <div class="close">
        <mu-icon class="icon-btn" :size="16" value="clear" @click.native="$ide.hideBottombar()"/>
      </div>
    </div>
    <keep-alive>
      <component :is="$ide.activeBottombar.component"></component>
    </keep-alive>
  </div>
</template>
<script>
export default {
}
</script>

<style lang="less" scoped>
  .bottombar {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background: #f8f8f8;
    .header {
      flex: 0 0 35px;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      .tabs {
        flex: 1 1 0px;
      }
      .tools {
        flex: 1 1 0px;
        text-align: right;
      }
      .close {
        flex: 0 0 24px;
        padding: 8px;
      }
    }
    .body {
      flex: 1 1 0px;
    }
  }

  .icon-btn {
    cursor: pointer;
  }
</style>
