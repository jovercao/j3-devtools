<template>
  <flex-panel class="container">
    <flex-panel-item class="activitybar" :thickness="64">
      <flex-panel class="activitybar-box" direction="vertical">
        <flex-panel-item class="body" :grow="1">
          <mu-icon-button :class="{ active: activeSidebar === 'ComponentsSidebar' }" icon="view_headline" @click="selectSidebar('ComponentsSidebar')" /> <br>
          <mu-icon-button icon="view_module" :class="{ active: activeSidebar === 'ExplorerSidebar' }" @click="selectSidebar('ExplorerSidebar')"/> <br>
          <!-- <mu-icon-button :class="{ active: activeSidebar === 'property' }" icon="build" @click="selectSidebar('property')" /> <br> -->
          <mu-icon-button icon="mouse" /> <br>
          <mu-icon-button icon="flash_on" /> <br>
          <mu-icon-button icon="data_usage" /> <br>
        </flex-panel-item>
        <flex-panel-item :thickness="64">
          <mu-icon-button icon="settings" @click="loadData"/> <br>
        </flex-panel-item>
      </flex-panel>
    </flex-panel-item>
    <flex-panel-item class="sidebar" :thickness="250">
      <component :is="activeSidebar"></component>
    </flex-panel-item>
    <flex-panel-item class="content">
      <div class="header">
        <mu-flat-button @click="changeActiveView('DesignerView')" :class="{ active: activeView === 'DesignerView' }" icon="computer" label="设计视图"></mu-flat-button>
        <mu-flat-button @click="changeActiveView('CodeView')" :class="{ active: activeView === 'code' }" icon="code" label="查看代码"></mu-flat-button>
        <!-- <mu-flat-button @click="selectTab('preview')" :class="{ active: activeTab === 'preview' }" icon="camera" label="预览效果"></mu-flat-button> -->
        <!-- <mu-tabs :value="activeTab" @change="handlerTabChange">
          <mu-tab icon="computer" value="design" title="可视化设计器" />
          <mu-tab value="code" icon="code" title="查看代码" />
          <mu-tab value="preview" icon="camera" title="预览效果" />
        </mu-tabs> -->
      </div>
      <div class="body">
        <component :is="activeView"/>
      </div>
    </flex-panel-item>
  </flex-panel>
</template>

<script>

import ExplorerSidebar from './parts/ExplorerSidebar'
import ComponentsSidebar from './parts/ComponentsSidebar'
import DesignerView from './parts/DesignerView'
import CodeView from './parts/CodeView'
import { mapState, mapActions, mapMutations } from 'vuex'
import modules from '../../store/store-modules'

export default {
  components: {
    ExplorerSidebar,
    DesignerView,
    ComponentsSidebar,
    CodeView
    // FlexContainer,
    // FlexContainerItem,
    // OutlineBox,
    // PropertyBox
  },
  computed: {
    ...mapState('ui-designer/', ['activeSidebar', 'activeView'])
  },
  methods: {
    ...mapActions(modules.UiDesigner, [ 'selectSidebar', 'selectTab', 'loadCatalogs', 'openView' ]),
    ...mapMutations(modules.UiDesigner, ['changeActiveView']),
    async loadData() {
      await this.loadCatalogs('http://simple.com/catalogs')
      await this.openView('http://simple.com/views/simple.view')
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
