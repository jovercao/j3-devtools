<template>
  <div class="icons-box">
    <div class="header">
      <mu-text-field type="text" hintText="过滤" v-model="filterText"/>
    </div>
    <div class="body"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      :style="{ 'overflow-y': (hover && scrollable) ? 'auto' : 'hidden'}">
      <div
        v-for="(icon, name) in filteredIcons" :key="name"
        draggable="true"
        @dragstart="handlerDrag(icon)"
        @dragend="endDrag()"
        @click="$helper.copyToClip($event.currentTarget.querySelector('p'))"
        class="item">
        <icon :value="name" :size="28"/>
        <br>
        <p class="label">{{name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { namespace } from '../../store/vue-editor'

export default {
  name: 'icons-box',
  props: {
    scrollable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapActions([ 'beginDrag', 'endDrag' ]),
    handlerDrag(icon) {
      this.beginDrag({
        source: 'components-sidebar',
        type: 'view-data',
        data: {
          type: 'J3Icon',
          props: {
            type: icon.type,
            value: icon.name
          }
        }
      })
    }
  },
  data() {
    return {
      hover: false,
      filterText: ''
    }
  },
  computed: {
    ...mapGetters(namespace, [ 'icons' ]),
    filteredIcons() {
      if (!this.filterText) return this.icons

      const icons = {}
      for (const name in this.icons) {
        if (name.includes(this.filterText)) {
          icons[name] = this.icons[name]
        }
      }
      return icons
    }
  }
}
</script>


<style lang="less" scoped>
.icons-box {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;
  .header {
    height: 40px;
    display: flex;
    flex-direction: row;
    padding-left: 12px;
    padding-right: 12px;
  }
  .body {
    flex: 1 1 0px;
    .item {
      width: 88px;
      height: 96px;
      padding-top: 20px;
      float: left;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: rgba(115, 28, 255, 0.157)
      }
      .label {
        padding: 5px;
        white-space:normal;
        word-break:break-all;
        font-size: 11px;
      }
      i {
        font-size: 28px;
        vertical-align: middle;
      }
    }
  }
}
</style>
