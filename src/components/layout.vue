<template>
  <a-layout id="components-layout-demo-responsive" style="height:100vh">
    <a-layout-sider
      v-model="collapsed"
      width="15vw"
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo"></div>
      <SlideBar :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        :style="{
          background: '#fff',
          padding: '0',
          position: 'fixed',
          zIndex: 1,
          width: '100%'
        }"
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          marginTop: '84px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SlideBar from '@/components/slideBar.vue'
export default {
  components: {
    SlideBar
  },
  data() {
    return {
      collapsed: false
    }
  },
  created() {},
  methods: {
    onCollapse(collapsed, type) {
      // console.log(collapsed, type)
    },
    onBreakpoint(broken) {
      // console.log(broken)
    }
  }
}
</script>
<style lang="scss">
#components-layout-demo-responsive .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-responsive .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
