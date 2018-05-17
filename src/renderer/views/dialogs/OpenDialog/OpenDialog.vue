<template>
  <el-dialog :visible="visible" width="680px" class="open-dialog" @close="handlerClose" title="请选择要打开的路径">
    <!-- <div class="header" slot="title">
      <span class="left title">请选择要打开的路径</span>
      <mu-select-field underlineClass="text-field-underline" class="text-field" :value="currentResourceType" @change="resourceTypeChange">
        <mu-menu-item v-for="(item, index) in $service('resource').all()" :key="index" :value="item.name" :title="item.title || item.name" />
      </mu-select-field>
    </div> -->

    <div slot="default" class="body">
      <div class="header">
        <input type="text" class="path-input" v-if="pathInput" :value="uri" @blur="endInputPath" v-focus @change="changeUri($event.currentTarget.value)" />
        <div v-else @click="beginInputPath">
          <select class="protocol" v-model="uriInfo.resourceType" @click.stop>
            <option v-for="(item, index) in $service('resource').all()" :key="index" :value="item.name">{{item.name}}://</option>
          </select>
          <span class="node" @click.stop="changePath('/')">/</span>
          <span v-for="(node, index) in paths" :key="index">
            <icon value="chevron_right" :size="12" />
            <span class="node"  @click.stop="changeToNode">{{node.name}}</span>
          </span>
        </div>
      </div>
      <div class="box">
        <div tabindex="0" v-for="(item, index) in list" :key="index" :class="[ 'item', { active: selected === item } ]" @dblclick="enter(item)" @click="select(item)">
          <icon :value="item.icon || (item.isPath ? 'folder' : 'insert_drive_file')" :size="48" />
          <br/>
          <div class="title">{{ item.title || item.name }}</div>
        </div>
      </div>
    </div>

    <mu-flat-button slot="footer" label="打开" @click="handlerOpenClick" primary/>
    <mu-flat-button slot="footer" label="取消" @click="handlerClose" secondary/>

  </el-dialog>
</template>

<script>
export default {
  props: {
    openType: {
      type: String,
      default: 'path', // file or path
      selection: ['item', 'path']
    },
    filter: {
      type: String
    }
  },
  data: () => ({
    pathInput: false,
    uriInfo: {
      resourceType: 'file',
      host: '',
      username: '',
      password: '',
      path: '/'
    },
    list: null,
    visible: true,
    selected: null
  }),
  created() {
    // this.uri = this.path
    // this.uriInfo = this.$service('resource').parseUri(this.path)
    this.loadList()
  },
  computed: {
    paths() {
      return this.uriInfo.path
        .split(/\/|\\/)
        .filter(node => node.trim() !== '')
        .map((node, index) => ({ name: node, index }))
    },
    uri() {
      return this.$service('resource').toUriString(this.uriInfo)
    }
  },
  methods: {
    async loadList() {
      const res = this.$service('resource')
      const list = await res.list(this.uri)
      this.list = list.filter(p => (this.openType === 'path' ? p.isPath : true))
    },
    async changeUri(uri) {
      const old = this.uriInfo
      try {
        this.uriInfo = this.$service('resource').parseUri(uri)
        await this.loadList()
      } catch (err) {
        this.$helper.message('url 格式不正确 或者 url 资源不存在！')
        this.uriInfo = old
      }
    },
    async changePath(path) {
      const res = this.$service('resource')
      const old = this.uriInfo.path
      this.uriInfo.path = path
      console.log(this.uri)
      if (path !== '/') {
        const exists = await res.exists(this.uri)
        if (!exists) {
          this.$helper.message('路径不存在！')
          this.uriInfo.path = old
          return
        }
      }
      await this.loadList()
    },
    async changeToNode(index) {
      let newPath = ''
      for (let i = 0; i <= index; i++) {
        const node = this.paths[i]
        newPath += '/' + node.name
      }
      console.log(newPath)
      this.changePath(newPath)
    },
    resourceTypeChange(value) {
      this.currentResourceType = value
    },
    select(item) {
      this.selected = item
    },
    enter(item) {
      if (this.selected.isPath) {
        this.changePath(this.selected.path)
        return
      }
      this.done()
    },
    beginInputPath() {
      this.pathInput = true
    },
    endInputPath() {
      this.pathInput = false
    },
    done() {
      this.$emit('down', this.selected)
      this.callback({ ok: true, data: this.selected })
    },
    handlerOpenClick() {
      if (!this.selected) {
        this.$helper.message('请先选择要打开的项！')
        return
      }
      if (this.openType === 'file' && this.selected.isPath) {
        this.changePath(this.selected.path)
        return
      }
      this.done()
    },
    handlerClose() {
      console.log(this)
      this.$emit('close')
      this.callback({ ok: false })
    }
  }
}
</script>

<style lang="less" scoped>
.open-dialog {
  .header {
    display: flex;
    align-items: center;
    .title {
      font-size: 14pt;
      padding: 0px;
      margin: 0px;
    }
    .text-field {
      width: 120px;
      height: 30px;
      margin-left: 80px;
      margin-bottom: 0px;
    }
  }
  .body {
    .header {
      height: 36px;
      display: block;
      .protocol {
        &:focus {
          outline: none;
        }
        display: inline;
        border: none;
      }
      .node {
        &:hover {
          background: rgb(235, 217, 238);
        }
        background: rgb(238, 238, 238);
        padding-left: 4px;
        padding-right: 4px;
        border-radius: 5px;
        display: inline-block;
        text-align: center;
        min-width: 20px;
        cursor: pointer;
      }
      .path-input {
        border: none;
        width: 100%;
        border-bottom: 1px solid silver;
        &:focus {
          outline: none;
        }
      }
    }
    .box {
      width: 100%;
      height: 400px;
      overflow: hidden;
      &:hover {
        overflow-y: auto;
      }
      padding: 5px;
      .item {
        &.active {
          background: rgba(111, 0, 216, 0.198);
          color: rgb(85, 54, 104);
          outline: none;
        }
        &:focus {
          outline: solid 1px rgb(170, 141, 184);
        }
        .title {
          text-transform: none !important;
          white-space: nowrap; //强制文本在一行内输出
          overflow: hidden; //隐藏溢出部分
          text-overflow: ellipsis; //对溢出部分加上...
        }
        user-select: none;
        cursor: default;
        text-align: center;
        float: left;
        width: 96px;
        height: 96px;
        padding: 10px;
        &:hover {
          background: rgba(111, 0, 216, 0.198);
        }
      }
    }
  }
}
</style>
