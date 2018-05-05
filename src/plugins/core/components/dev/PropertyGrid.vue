<template>
  <div class="property-grid">
    <div class="body">
      <template v-if="pubProps">
        <!-- 优先摆放共同属性 -->
        <div class="subtitle">
          <ide-icon-button :icon="pubPropExpand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'" @click="pubPropExpand = !pubPropExpand" :size="12"/>
          <span>共同属性</span>
          <hr>
        </div>
        <template v-if="pubPropExpand">
          <div v-for="(prop, name) in pubProps" :key="name"
            @mouseenter="hoverProp = name"
            @mouseleave="hoverProp = ''"
            class="row" >
            <div class="name">{{ prop.title || name }}</div>
            <div class="value">
                <value-editor
                  :selections="prop.selections"
                  class="editor"
                  :data-type="prop.type"
                  :value="propsData[name]"
                  :hintText="prop.description || prop.title"
                  @change="handlerPubChange(name, ...arguments)"
                />
            </div>
          </div>
        </template>
      </template>
      <div class="subtitle">
        <ide-icon-button :icon="curPropExpand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'" @click="curPropExpand = !curPropExpand" :size="12"/>
        <span>当前属性</span>
        <hr>
      </div>
      <template v-if="curPropExpand">
        <!-- 当前对像属性 -->
        <div v-for="(prop, name, index) in props" :key="index"
          @mouseenter="hoverProp = name"
          @mouseleave="hoverProp = ''"
          class="row" >
          <div class="name">{{ prop.title || name }}</div>
          <div class="value">
              <value-editor
                :selections="prop.selections"
                class="editor"
                :data-type="prop.type"
                :value="propsData[name]"
                :hintText="prop.description || prop.title"
                @change="handlerChange(name, ...arguments)"
              />
          </div>
        </div>
      </template>
    </div>
    <div v-if="showFooter" class="footer">
      {{propDescription}}
    </div>
  </div>
</template>

<script>
import ValueEditor from './ValueEditor'

export default {
  components: {
    ValueEditor
  },
  props: {
    props: Object,
    propsData: Object,
    pubProps: Object,
    showFooter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hoverProp: '',
      pubPropExpand: true,
      curPropExpand: true
    }
  },
  computed: {
    propDescription() {
      if (this.hoverProp) {
        const prop = this.props[this.hoverProp]
        return this.hoverProp + ' - ' + prop.descripion || prop.title || '略'
      }
    }
  },
  methods: {
    handlerChange(prop, value, oldValue) {
      this.$emit('propchange', { prop, value, oldValue })
    },
    handlerPubChange(prop, value, oldValue) {
      this.$emit('pubpropchange', { prop, value, oldValue })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~muse-ui/src/styles/colors.less');

.property-grid {
  display: flex;
  flex-direction: row;
  .footer {
    flex-basis: 64px;
    border-top: #bbb solid 1px;
    padding: 10px;
  }
  .body {
    flex-grow: 1;
    flex-basis: 0px;
    overflow-y: auto;
    .subtitle {
      padding: 12px 12px 0px 12px;
      color: #aaa;
      hr {
        padding: 0px;
        margin: 0px;
      }
    }
    .row {
      &:hover {
        background: #ddd;
      }
      padding: 0px 15px 0px 15px;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      height: 46px;
      line-height: 46px;
      vertical-align: middle;
      .value {
        flex-grow: 1;
        flex-basis: 0px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        white-space: nowrap; //强制文本在一行内输出
        overflow: hidden; //隐藏溢出部分
        text-overflow: ellipsis; //对溢出部分加上...
        .editor {
          width: 100%;
        }
      }
      .name {
        white-space: nowrap; //强制文本在一行内输出
        overflow: hidden; //隐藏溢出部分
        text-overflow: ellipsis; //对溢出部分加上...
        height: 50px;
        line-height: 50px;
        flex-basis: 85px;
        font-size: 9pt;
        vertical-align: middle;
      }
      .default {
        color: @grey200;
      }
    }
  }
}
</style>
