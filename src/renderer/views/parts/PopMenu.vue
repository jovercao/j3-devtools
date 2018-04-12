<script>
export default {
  render(create) {
    const list = []
    for (const childItem of this.items) {
      list.push(this.createItem(create, childItem))
    }
    return create('mu-menu', list)
  },
  props: [
    'items'
  ],
  methods: {
    execCmd(cmd) {
      window.alert(cmd)
    },
    createItem(create, item) {
      if (item === '-') {
        return create('mu-divider')
      }
      const children = (item.children || []).map(childItem => this.createItem(create, childItem))
      return create('mu-menu-item', {
        props: {
          leftIcon: item.icon,
          rightIcon: children.length > 0 ? 'keyboard_arrow_right' : '',
          title: item.title
        },
        on: {
          click: () => {
            if (item.command) {
              this.$emit('command', item.command)
            }
          }
        }
        // ,
        // nativeOn: {
        //   mousemove: event => {
        //     if (children.length > 0) this('click', event)
        //   }
        // }
      }, children)
    }
  }
}
</script>
