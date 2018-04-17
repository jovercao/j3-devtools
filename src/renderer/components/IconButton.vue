<template>
  <button :class="[ 'ide-icon-btn', { down } ]" type="button"  @click="handlerClick"
    @mousedown="down = true"
    @mouseup="down = false"
    @mouseout="down = false"
    :style="{
      'height': diameter + 'px',
      'width': diameter + 'px',
      'border-radius': diameter / 2 + 'px',
      'font-size': size + 'px',
      'line-height': diameter + 'px'
    }">
    <i :class="[ 'icon', icon ]"></i>
  </button>
</template>

<script>
export default {
  name: 'IdeIconButton',
  props: {
    icon: String,
    size: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      down: false
    }
  },
  computed: {
    diameter() {
      return this.size * 2
    }
  },
  methods: {
    handlerClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>
<style lang="less">

.ide-icon-btn {
  transition: background-color .3s;
  cursor: pointer;
  border: 0px;
  background: transparent;
  box-sizing: border-box;
  color: #666;
  text-align: center;
  vertical-align: middle;
  &:hover {
    color: rgb(77, 0, 107);
  }
  &.down {
    background: #ccc;
    transition: background-color .3s;
  }

  .icon {
    // vertical-align: middle;
  }
}

</style>
