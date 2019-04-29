<template>
  <div class="component-box">
    <div v-for="(category, name) in componentTemplates.categories" :key="name"
      class="category"
      :style="{ 'flex-grow': expands[name] ? 1 : 0 }">
      <div class="header" @click="expands[name] = !expands[name]">
        <div class="left">
          <i :class="category.icon"/>
        </div>
        <div class="center">
          {{category.title}}
        </div>
        <div class="right">
          <ide-icon-button :icon="expands[name] ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"/>
        </div>
      </div>
      <div class="body" v-show="expands[name]">
        <template v-if="componentTemplates">
          <div v-for="(item, index) in componentTemplates.filter(item => item.category === name)" :key="index"
            class="item"
            draggable="true"
            @dragstart.stop="beginDrag({ source: 'components-sidebar', type: 'view-data', data: item })"
            @dragend.stop="endDrag()">
            <i v-if="item.icon" :class="[ 'material-icons' ]">{{item.icon}}</i>
            {{item.title}}
          </div>
        </template>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'component-box',
  data() {
    return {
      expands: null
    }
  },
  created() {
    const expands = {}
    for (const key in this.componentTemplates.categories) {
      expands[key] = false
    }
    this.expands = expands
  },
  computed: {
    ...mapGetters('vue-editor', ['componentTemplates'])
  },
  methods: {
    ...mapActions(['beginDrag', 'endDrag']),
    ...mapActions('vue-editor', ['loadCatalogs'])
  }
}
</script>


<style lang="less" scoped>
  @import url('../../../../renderer/assets/define.less');

  .component-box {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow-y: hidden;
    .category {
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      transform: height .4s;
      .header {
        flex-basis: 36px;
        color: @font-light;
        cursor: pointer;
        display: flex;
        padding: 0px 12px 0px 12px;
        line-height: 36px;
        // border-bottom: @bg3 solid 1px;
        // border-top: @bg1 solid 1px;
        background: #e1e1e1;
        &:hover {
          color: #555;
          transition: background-color .4s;
          background: #ccc;
        }
        .left, .right {
          font-size: 12px;
          flex-basis: 36px;
        }

        // 两端
        .right {
          flex: 0 0 36px;
          text-align: right;
        }

        // 中间
        .center {
          flex:  1 1 0px;
          text-align: center;
        }
      }
      .body {
        flex-grow: 1;
        flex-basis: 0px;
        overflow: auto;

        .item {
          padding-left: 10px;
          padding-right: 10px;
          height: 32px;
          line-height: 32px;
          white-space: nowrap; //强制文本在一行内输出
          overflow: hidden; //隐藏溢出部分
          text-overflow: ellipsis; //对溢出部分加上...
          i {
            margin-right: 10px;
            vertical-align: middle;
            font-size: 14pt;
          }
          &:hover, &.active {
            background: rgba(116, 0, 173, 0.157)
          }
        }
      }
    }
  }
  

</style>
