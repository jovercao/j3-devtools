import _ from 'lodash'

// 将基本api置于此处
export default {
  computed: {

  },
  created() {
    this.$$subscribes = []
  },
  methods: {
    /**
     * 订阅系统消息
     * @param {string} type 消息类型
     * @param {function} handler 处理信息，可接收参数，参数由消息发起者决定
     * @param {object} options 选项
     */
    $subscribe(type, handler) {
      if (_.isObject(type)) {
        for (const [key, value] of Object.entries(type)) {
          this.$subscribe(key, value)
        }
        return
      }
      this.$messages.subscribe(type, handler)
      this.$$subscribes.push({
        index: this.$$subscribes.length,
        type,
        handler
      })
    }
    // ,$unsubscribe(atype, ahandler) {
    //   this.$$subscribes.filter(({ type, handler }) => (type === atype && ahandler === handler))
    //     .forEach(({ type, handler, index }) => {
    //       this.$messages.unsubscribe(type, handler)
    //       this.$$subscribes.splice(index, 1)
    //     })
    // }
  },
  destroyed () {
    this.$$subscribes.forEach(({ type, handler }) => {
      this.$messages.unsubscribe(type, handler)
    })
  }
}
