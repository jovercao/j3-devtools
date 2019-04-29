<template>
  <transition name="expand"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave">
    <slot></slot>
  </transition>
</template>

<script>

const elProperties = {
  vertical: {
    thickness: 'height',
    oldThickness: 'oldHeight',
    scrollThickness: 'scrollHeight',
    paddingStart: 'paddingTop',
    oldPaddingStart: 'oldPaddingTop',
    paddingEnd: 'paddingBottom',
    oldPaddingEnd: 'oldPaddingBottom'
  },
  horizontal: {
    thickness: 'width',
    oldThickness: 'oldWidth',
    scrollThickness: 'scrollWidth',
    paddingStart: 'paddingLeft',
    oldPaddingStart: 'oldPaddingLeft',
    paddingEnd: 'paddingRight',
    oldPaddingEnd: 'oldPaddingRight'
  }
}

export default {
  name: 'ExpandTransition',
  props: {
    direction: {
      type: String,
      default: 'vertical'
    },
    expandThickness: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ps() {
      return elProperties[this.direction]
    }
  },
  methods: {
    beforeEnter (el) {
      el.dataset[this.ps.oldPaddingStart] = el.style[this.ps.paddingStart]
      el.dataset[this.ps.oldPaddingEnd] = el.style[this.ps.paddingEnd]
      el.dataset[this.ps.oldThickness] = el.style[this.ps.scrollThickness]
      el.style[this.ps.thickness] = '0'
    },
    enter (el) {
      el.dataset.oldOverflow = el.style.overflow
      el.style.display = 'block'
      if (this.expandThickness) {
        el.style[this.ps.thickness] = this.expandThickness + 'px'
      } else if (el[this.ps.scrollThickness] !== 0) {
        el.style[this.ps.thickness] = el[this.ps.scrollThickness] + 'px'
      } else {
        el.style[this.ps.thickness] = ''
      }
      el.style[this.ps.paddingStart] = el.dataset[this.ps.oldPaddingStart]
      el.style[this.ps.paddingEnd] = el.dataset[this.ps.oldPaddingEnd]
      el.style.overflow = 'hidden'
    },
    afterEnter (el) {
      el.style.display = ''
      // uc浏览器上设置height会闪屏
      if (this.expandThickness) {
        el.style[this.ps.thickness] = this.expandThickness + 'px'
      } else {
        el.style[this.ps.thickness] = ''
      }
      el.style.overflow = el.dataset.oldOverflow
      el.style[this.ps.paddingStart] = el.dataset[this.ps.oldPaddingStart]
      el.style[this.ps.paddingEnd] = el.dataset[this.ps.oldPaddingEnd]
    },
    beforeLeave (el) {
      el.dataset[this.ps.oldPaddingStart] = el.style[this.ps.paddingStart]
      el.dataset[this.ps.oldPaddingEnd] = el.style[this.ps.paddingEnd]
      el.dataset.oldOverflow = el.style.overflow

      el.style.display = 'block'
      if (el[this.ps.scrollThickness] !== 0) {
        el.style[this.ps.thickness] = el[this.ps.scrollThickness] + 'px'
      }
      el.style.overflow = 'hidden'
    },
    leave (el) {
      if (el[this.ps.scrollThickness] !== 0) {
        setTimeout(() => {
          el.style[this.ps.thickness] = 0
          el.style[this.ps.paddingStart] = 0
          el.style[this.ps.paddingEnd] = 0
        })
      }
    },
    afterLeave (el) {
      el.style.display = 'none'
      if (this.expandThickness) {
        el.style[this.ps.thickness] = this.expandThickness + 'px'
      } else {
        el.style[this.ps.thickness] = ''
      }
      el.style.overflow = el.dataset.oldOverflow
      el.style[this.ps.paddingStart] = el.dataset[this.ps.oldPaddingStart]
      el.style[this.ps.paddingEnd] = el.dataset[this.ps.oldPaddingEnd]
    }
  }
}
</script>

<style lang="less">

@easeOutFunction: cubic-bezier(0.23, 1, 0.32, 1);

.expand-enter-active,
.expand-leave-active {
  transition: height .45s @easeOutFunction, padding .45s @easeOutFunction, width .45s;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
}
</style>
