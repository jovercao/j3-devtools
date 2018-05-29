<template>
  <button :class="[ 'ide-icon-btn', { down, disabled } ]" type="button"  @click="handlerClick"
    @mousedown="down = true"
    @mouseup="down = false"
    @mouseout="down = false"
    :disabled="disabled"
    :style="{
      'height': diameter + 'px',
      'width': diameter + 'px',
      'border-radius': diameter / 2 + 'px',
      'line-height': diameter + 'px'
    }">
    <i :style="{ 'font-size': size + 'px' }" :class="[ 'icon', { [icon]: !isMaterialIcon, 'mu-icon': isMaterialIcon, 'material-icons': isMaterialIcon } ]">{{ isMaterialIcon ? icon : '' }}</i>
  </button>
</template>

<script>
export default {
  name: 'IdeIconButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
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
    },
    isMaterialIcon() {
      if (!this.icon) return false
      return !this.icon.startsWith('el-icon-')
    }
  },
  methods: {
    handlerClick(event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
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
  &:hover, &:focus {
    border: 0px;
    color: rgb(77, 0, 107);
    font-weight: 600;
    outline: none;
  }
  &.down {
    background: #ccc;
    transition: background-color .3s;
  }

  &.disabled {
    color: #ccc;
  }
  .icon {
    
  }
}

</style>
