<script>
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'content-tree',
  props: [
    'type',
    'path'
  ],
  data() {
    return {
      items: []
    }
  },
  computed: {
    ...mapState(['activeTab'])
  },
  async created() {
    this.$mgr = this.$service.resource(this.type)
    await this.loadData()
    // this.items = [
    //   {
    //     name: 'd:\\',
    //     path: 'd:\\',
    //     isPath: true,
    //     expand: true,
    //     children: [
    //       { name: 'A.vue', id: 'd:\\A.vue', isFile: true, isPath: 'false', type: 'vue' }
    //     ]
    //   }
    // ]
  },
  render() {
    const resource = this.$service('resource')
    let deep = 0
    const r = (items) => {
      deep++
      const dom = <ul>
        { items && items.map(item =>
          <li>
            <div class={['item', { active: this.activeTab && item.path === this.activeTab.id }]} on-click={ async (event) => {
              event.stopPropagation()
              if (item.isPath) {
                await this.toggleExpand(item)
              }
              if (!item.isPath) {
                try {

                  await this.$ide.open(resource.toUriString({
                    resourceType: this.type,
                    path: item.path
                  }))
                } catch (err) {
                  this.$alert(err.message, '错误！')
                }
              }
            }}>
              <i class={ this.contentIcon(item) } style={{ 'margin-left': deep * 12 + 'px' }}/>
              <span style="margin-left: 5px">{ item.name }</span>
            </div>
            { item.expand && item.children && item.children.length > 0 && r(item.children) }
          </li>
        ) }
      </ul>
      deep--
      return dom
    }
    return r(this.items)
  },
  methods: {
    contentIcon(item) {
      if (item.isPath) {
        return item.expand ? 'el-icon-arrow-down' : 'el-icon-arrow-right'
      }
      let contentType = this.$service('resource').contentType(item.type)
      return (contentType && contentType.icon) || 'el-icon-document'
    },
    properItems(items) {
      items.forEach(item => {
        item.expand = false
        item.children = []
      })
      return _.sortBy(items, [ (x) => -x.isPath, 'name' ])
    },
    async toggleExpand(item) {
      item.expand = !item.expand
      if (item.expand) {
        const items = await this.$mgr.list(item.path)
        item.children = this.properItems(items)
      }
      this.$emit('expand-change', item, this.type)
    },
    async loadData() {
      // 默认打开根目录
      const items = await this.$mgr.list(this.path)
      this.items = this.properItems(items)
    },
    itmeLabel(value) {
      if (value && value.length > 20) {
        return value.substr(0, 18) + '..'
      }
      return value
    }
  },
  watch: {
    type() {
      this.loadData()
    },
    path() {
      this.loadData()
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  margin: 0px;
  padding: 0px;
  li {
    padding: 0px;
    margin: 0px;
    overflow: hidden;
    display: block;
    .item {
      height: 28px;
      line-height: 28px;
      padding-right: 10px;
      list-style: none;
      font-size: 10pt;
      white-space: nowrap; //强制文本在一行内输出
      overflow: hidden; //隐藏溢出部分
      text-overflow: ellipsis; //对溢出部分加上...
      &:hover, &.active {
        background: rgba(116, 0, 173, 0.157)
      }
    }
    cursor: pointer;
    .holder {
      display: inline-block;
    }
  }
}
</style>
