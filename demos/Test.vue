<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      name:
      <input type="text" v-model="item.name">
      <button @click="handlerClick(item.name)" type="button">test</button>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: '张彦雄1'
        },
        {
          name: '张彦雄2'
        },
        {
          name: '张彦雄3'
        },
        {
          name: '张彦雄4'
        },
        {
          name: '张彦雄5'
        }
      ]
    }
  },
  method: {
    handlerClick(name) {
      alert(name + ' is a pig')
    }
  }
}
</script>

