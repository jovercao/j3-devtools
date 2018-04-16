<script>
export default {
  render() {
    return (
      <mu-menu>
        {
          this.items.map(item => {
            return this.createItem(item)
          })
        }
      </mu-menu>
    )
  },
  // render(create) {
  //   const list = []
  //   for (const childItem of this.items) {
  //     list.push(this.createItem(create, childItem))
  //   }
  //   return create('mu-menu', list)
  // },
  props: [
    'items'
  ],
  methods: {
    execCmd(cmd) {
      window.alert(cmd)
    },
    createItem(item) {
      const hasChild = item.children && item.children.length > 0
      return item === '-' ? <mu-divider/> : <mu-menu-item
        leftIcon={ item.icon }
        rightIcon={ hasChild ? 'keyboard_arrow_right' : '' }
        onClick={ () => item.command && this.$emit('command', item.command) }
        nativeOnMousemove={ event => hasChild && this.$emit('click', event) }
        title={item.title}>
        { hasChild && item.children.map(childItem => this.createItem(childItem)) }
      </mu-menu-item>
    }
    // createItem(create, item) {
    //   if (item === '-') {
    //     return create('mu-divider')
    //   }
    //   const children = (item.children || []).map(childItem => this.createItem(create, childItem))
    //   return create('mu-menu-item', {
    //     props: {
    //       leftIcon: item.icon,
    //       rightIcon: children.length > 0 ? 'keyboard_arrow_right' : '',
    //       title: item.title
    //     },
    //     on: {
    //       click: () => {
    //         if (item.command) {
    //           this.$emit('command', item.command)
    //         }
    //       }
    //     }
    //     // ,
    //     // nativeOn: {
    //     //   mousemove: event => {
    //     //     if (children.length > 0) this.$emit('click', event)
    //     //   }
    //     // }
    //   }, children)
    // }
  }
}
</script>
