<template>
  <flex-container class="container">
    <flex-container-item class="activitybar" :thickness="64">
      <flex-container class="activitybar-box" direction="vertical">
        <flex-container-item class="body" :grow="1">
          <mu-icon-button :class="{ active: activeSidebar === 'menu' }" icon="view_headline" @click="selectSidebar('menu')" /> <br>
          <mu-icon-button icon="view_module" :class="{ active: activeSidebar === 'components' }" @click="selectSidebar('components')"/> <br>
          <!-- <mu-icon-button :class="{ active: activeSidebar === 'property' }" icon="build" @click="selectSidebar('property')" /> <br> -->
          <mu-icon-button icon="mouse" /> <br>
          <mu-icon-button icon="flash_on" /> <br>
          <mu-icon-button icon="data_usage" /> <br>
        </flex-container-item>
        <flex-container-item :thickness="64">
          <mu-icon-button icon="settings" /> <br>
        </flex-container-item>
      </flex-container>
    </flex-container-item>
    <flex-container-item class="sidebar" :thickness="250">
      <components-box v-if="activeSidebar === 'components'"></components-box>
    </flex-container-item>
    <flex-container-item class="content">
      <div class="header">
        <mu-flat-button @click="selectTab('designer')" :class="{ active: activeTab === 'designer' }" icon="computer" label="设计视图"></mu-flat-button>
        <mu-flat-button @click="selectTab('code')" :class="{ active: activeTab === 'code' }" icon="code" label="查看代码"></mu-flat-button>
        <mu-flat-button @click="selectTab('preview')" :class="{ active: activeTab === 'preview' }" icon="camera" label="预览效果"></mu-flat-button>
        <!-- <mu-tabs :value="activeTab" @change="handlerTabChange">
          <mu-tab icon="computer" value="design" title="可视化设计器" />
          <mu-tab value="code" icon="code" title="查看代码" />
          <mu-tab value="preview" icon="camera" title="预览效果" />
        </mu-tabs> -->
      </div>
      <div class="body">
        <div v-if="activeTab === 'designer'">
          <h2>Tab One</h2>
          <p>
            这是设计视图
          </p>
        </div>
        <div v-if="activeTab === 'code'">
          <h2>Tab Two</h2>
          <p>
            这是代码视图
          </p>
        </div>
        <div v-if="activeTab === 'preview'">
          <h2>Tab Three</h2>
          <p>
            这是预览效果
          </p>
        </div>
      </div>
    </flex-container-item>
  </flex-container>
</template>

<script>
// import FlexContainer from '../../components/layout/FlexContainer'
// import FlexContainerItem from '../../components/layout/FlexContainerItem'
import ComponentsBox from './parts/ComponentsBox'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ComponentsBox
    // FlexContainer,
    // FlexContainerItem,
    // OutlineBox,
    // PropertyBox
  },
  computed: {
    ...mapState('ui-designer/', ['activeSidebar', 'activeTab'])
  },
  methods: {
    ...mapActions('ui-designer', ['selectSidebar', 'selectTab']),
    handlerTabChange(tab) {
      this.activeTab = tab
    }
  }
}
</script>


<style lang="less">
@import url('~muse-ui/src/styles/colors.less');

.mu-tabs {
  background: @grey200;
}

.mu-tab-link {
  color: @grey800;
}

.container {
  height: 100%;
  width: 100%;

  .sidebar {
    background: @grey100;
    overflow: auto;
    // width: 200px;
    // color: @grey100;
  }

  .activitybar {
    background: @grey200;
    padding: 10px;
    // width: 64px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .activitybar-box {
      height: 100%;
    }
  }

  .content {
    flex: 1;
    display: flex;
    align-items: stretch;
    flex-direction: column;

    .header {
      display: flex;
      background: @grey100;
    }

    .body {
      flex: 1;
    }
  }

  .active {
    color: rebeccapurple;
  }
}
</style>
