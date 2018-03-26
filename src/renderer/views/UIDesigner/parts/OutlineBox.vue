<template>
  <!-- <mu-list :value="selectedNode" @change="selectNode">
    <mu-list-item :title="root.title" :key="root.path" :value="root">
      <mu-icon slot="left" :value="root.component.icon"/>
      <mu-list-item :key="item.path" v-for="item in root.children" slot="nested" :title="item.title" :value="item">
        <mu-icon slot="left" :value="item.component.icon" />
      </mu-list-item>
    </mu-list-item>
  </mu-list> -->
  <el-tree :data="[root]" :props="{ label: 'title', children: 'children' }" @current-change="selectNode">

  </el-tree>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('ui-designer', {
      root: 'views',
      selectedNode: 'selectedNode'
    })
  },
  methods: {
    ...mapActions('ui-designer', ['selectNode'])
  }
}
</script>
