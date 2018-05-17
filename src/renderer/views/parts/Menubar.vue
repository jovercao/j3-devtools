<template>
  <div class="menubar">
    <mu-flat-button v-for="(mu, index) in $ide.menus" :key="index" :label="mu.title" @click="showMenu($event, mu)"
      :class="[ 'menubar-btn', { 'actived-btn': actived === mu}]"
      @mouseover.native="handlerMouseover($event, mu)" />
    <mu-popover :trigger="trigger" :open="!!actived" @close="closeMenu">
      <pop-menu v-if="!!actived" :items="actived.children || []" @command="handlerCommand"/>
    </mu-popover>
  </div>
</template>

<script>
import PopMenu from './PopMenu'

export default {
  components: {
    PopMenu
  },
  data() {
    return {
      actived: null,
      trigger: null
    }
  },
  computed: {
    propedMenu() {
      if (!this.actived) return {}
      return this.actived
    }
  },
  methods: {
    handlerCommand(command) {
      this.closeMenu()
      this.$exec(command)
    },
    showMenu(event, mu) {
      this.trigger = event.target
      this.actived = mu
    },
    closeMenu() {
      this.actived = null
    },
    handlerMouseover(event, mu) {
      if (this.actived !== null) {
        this.closeMenu()
        this.$nextTick(() => this.showMenu(event, mu))
      }
    }
  }
}
</script>

<style lang="less">
.menubar {
  .menubar-btn {
    min-width: 64px !important;
  }
  .actived-btn {
    background: #e8e8e8;
  }
}
</style>
