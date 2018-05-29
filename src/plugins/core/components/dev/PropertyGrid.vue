<template>
  <div class="property-grid">
    <div class="body">
      <div class="content">
        <div v-if="pubProps">
          <!-- 优先摆放共同属性 -->
          <div class="subtitle">
            <ide-icon-button :icon="pubPropExpand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'" @click="pubPropExpand = !pubPropExpand" :size="12"/>
            <span>共同属性</span>
            <hr>
          </div>
          <template v-if="pubPropExpand">
            <div v-for="(name) in sortedPubProps" :key="name"
              @mouseenter="hoverProp = name"
              @mouseleave="hoverProp = ''"
              class="row" >
              <div class="name">{{ pubProps[name].title || name }}</div>
              <div class="value">
                  <value-editor
                    :selections="pubProps[name].selections"
                    class="editor"
                    :data-type="pubProps[name].type"
                    :value="pubProps[name].value"
                    :hintText="pubProps[name].description || pubProps[name].title"
                    @change="handlerPubChange(name, ...arguments)"
                  />
              </div>
            </div>
          </template>
        </div>
        <div>
          <div class="subtitle">
            <ide-icon-button :icon="curPropExpand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'" @click="curPropExpand = !curPropExpand" :size="12"/>
            <span>当前属性</span>
            <hr>
          </div>
          <template v-if="curPropExpand">
            <!-- 当前对像属性 -->
            <div v-for="(name) in sortedProps" :key="name"
              @mouseenter="hoverProp = name"
              @mouseleave="hoverProp = ''"
              class="row" >
              <div class="name">{{ props[name].title || name }}</div>
              <div class="value">
                  <value-editor
                    :selections="props[name].selections"
                    class="editor"
                    :data-type="props[name].type"
                    :value="propsData[name]"
                    :hintText="props[name].description || props[name].title"
                    @change="handlerChange(name, ...arguments)"
                  />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-if="showFooter" class="footer">
      {{propDescription}}
    </div>
  </div>
</template>

<script>
import ValueEditor from './ValueEditor'
import _ from 'lodash'

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
        return prop.description || prop.title || '略'
      }
    },
    sortedProps() {
      const hasValues = []
      const props = []
      for (const key in this.props) {
        // 有变更过的非默认值，优先显示
        if (this.propsData[key] !== undefined && this.props[key].default !== this.propsData[key]) {
          hasValues.push(key)
        } else {
          props.push(key)
        }
      }
      return hasValues.sort().concat(props.sort())
    },
    sortedPubProps() {
      return _.sortBy(Object.keys(this.pubProps), (name) => this.pubProps[name].value + name)
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
    .content {
      overflow: visible;
    }
    flex-grow: 1;
    flex-basis: 0px;
    overflow-y: hidden;
    &:hover {
      overflow-y: auto;
    }
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
