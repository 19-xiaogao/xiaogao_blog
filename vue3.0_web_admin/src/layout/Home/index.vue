<template>
  <a-layout>
    
    <a-layout-sider class="sider">
      <div class="logo">小膏_管理后台</div>
      <a-menu theme="dark" mode="inline" v-model="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout class="right-body">
      <a-layout-header class="right-body-header"> header </a-layout-header>
      <a-layout-content class="right-body-content"> aa </a-layout-content>
      <a-layout-footer class="right-body-footer">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const selectedKeys = ref<string[]>(["4"]);
    return {
      selectedKeys,
    };
  },
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
  },
});
</script>
<style lang="scss"  scoped>
.sider {
  display: flex;
  overflow: auto;
  height: 100vh;
  left: 0;
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    color: #fff;
    text-align: center;
    line-height: 32px;
    font-size: 18px;
  }
}
.right-body {
  .right-body-header {
    background: "#fff";
    padding: 0;
  }
  .right-body-content {
    margin: 24px 16px 0;
    overflow: initial;
  }
  .right-body-footer {
    text-align: center;
  }
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>