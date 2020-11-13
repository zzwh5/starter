<!--  -->
<template>
  <div>
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in Routes">
        <template v-if="item.meta.hasChildren">
          <!--  vue组件自己调用自己  -->
          <sub-Menu :key="item.name" :item="item" />
        </template>
        <template v-else>
          <a-menu-item :key="item.name" @click="goRoute(item.path)">
            {{ item.meta.title }}
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
// 引入 submenu组件 \
import SubMenu from './SubMenu'
export default {
  components: {
    SubMenu
  },
  props: {
    collapsed: {
      type: Boolean
    }
  },
  data() {
    return {
      // 路由数组
      Routes: []
    }
  },
  created() {
    // console.log(this.$router.options.routes)
    this.Routes = this.$router.options.routes.filter(
      v => v.meta.title != '登录'
    )
    // console.log(this.Routes)
  },
  methods: {
    // 路由跳转
    goRoute(path) {
      if (path == '/') {
        path = '/home'
      }
      // console.log(path)
      if (this.$route.path != path) {
        this.$router.push({
          path: path
        })
      }
    }
  }
}
</script>


<style  scoped lang='scss'>
// ant-menu-item
/deep/.ant-menu-inline {
  .ant-menu-item {
    display: flex;
    align-items: center;
    span {
      a {
        color: rgba(255, 255, 255, 0.65);
        &:hover {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>
