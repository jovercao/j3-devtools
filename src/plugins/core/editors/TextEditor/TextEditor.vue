<template>
  <!-- <div class="text-editor" contenteditable="true"
    @keydown="newLine"
    @keyup="updatePos"
    @keypress.prevent="input(String.fromCharCode($event.keyCode))"
    @focus="updatePos"
    @mouseup="updatePos"
    >
    <template v-for="(line, index) in this.lines"><div :row="index" :key="index" class="line">{{line}}</div></template>
  </div> -->
  <textarea class="text-editor" v-model="value"></textarea>
</template>

<script>
// mixin 将被注入
export default {
  name: 'text-editor'
  // created() {
  //   console.log(this.value)
  //   this.lines = this.value.split('\n')
  // },
  // data: () => ({
  //   lines: [],
  //   row: 0,
  //   col: 0
  // }),
  // methods: {
  //   changeHandler(event) {
  //     // const value = event.currentTarget.value // .split('\n')
  //     // this.$emit('input', value)
  //   },
  //   updatePos() {
  //     const selection = getSelection()
  //     this.col = selection.focusOffset
  //     this.row = parseInt(selection.focusNode.parentElement.getAttribute('row'))
  //     console.log(selection)
  //     const range = selection.getRangeAt(0)
  //     console.log(range)

  //     console.log(this.col, this.row)
  //   },
  //   newLine(event) {
  //     switch (event.keyCode) {
  //       case 13:
  //         const line = this.lines[this.row]
  //         const left = line.substr(0, this.col + 1)
  //         const right = line.substr(this.col)
  //         this.$set(this.lines, this.row, left)
  //         this.lines.splice(this.row, 0, right)
  //         event.preventDefault()
  //         break
  //     }
  //   },
  //   input(key) {
  //     const line = this.lines[this.row]
  //     const left = line.substr(0, this.col + 1)
  //     const right = line.substr(this.col)
  //     const newLine = left + key + right
  //     this.$set(this.lines, this.row, newLine)
  //   }
  // }
}
</script>

<style lang="less">
  .text-editor {
    width: 100%;
    height: 100%;
    padding: 8px;
    overflow: auto;
    white-space: nowrap;
    border: 0px;
    &:focus {
      outline: #c3a3f7 1px solid;
    }
  }

  .line {
    white-space: nowrap;
    overflow-x: visible;
  }
</style>
