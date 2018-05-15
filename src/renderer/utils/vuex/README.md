# vuex工具


## normalizeModule

> 本工具并不是为了改变vuex理念而存在，仅仅做了改变，提供了api可以直接在action中操作 stat
本质上仍然是通过mutation提交state的改变，而这个mutation无须手动处理，本工具会自动生成

```js
const rootModule = {
  namespace: 'moduleA',
  state: {
    items: [],
    totals: 0
  },
  getters: {
    count() {
      return this.items.length
    }
  },
  methods: {
    insert({ item, index }) {
      /**
       *  修改数组，以下方法均可访问，用法同 Array对应的实例方法
       *   $push, $pop, $shift, $unshift, $splice, $sort, $reverse
       */
      this.$splic(state.items, index, 0, item)
      /**
       * 修改成员属性
       * 用法同 Vue.$set
       */
      this.$set(state, 'total', state.total + 1)
      this.$commit()
    },
    add(item) {
      const state = this.$state
      const index = state.items.findIndex(item)
      // 简化actions之间相互调用
      this.insert({ item, state.items.length })
    },
    remove() {
      const state = this.$state
      const index = state.items.findIndex(item)
      if (index >= 0) {
        this.$splice(state.items, index, 1)
      }
    },
    sleep(local, interval) {
      return new Promise(resolve => {
        setTimeout(resolve, interval)
      })
    },
    async waitAdd(item) {
      await this.sleep(1000)
      this.add(item)
    }
  }
}
```