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
        <a-menu-item
          :key="item.name"
          v-if="!item.children || !item.meta.hasChildren"
          @click="goRoute(item.path)"
        >
          <template v-if="!item.children || !item.meta.hasChildren">
            <a-icon type="pie-chart" />
            <span>
              {{ item.meta.title }}
            </span>
          </template>
        </a-menu-item>
      </template>
      <template v-for="item in Routes">
        <a-sub-menu
          :key="item.name"
          v-if="item.children && item.meta.hasChildren"
        >
          <span slot="title">
            <a-icon type="mail" />
            <span>
              {{ item.meta.title }}
            </span>
          </span>
          <a-menu-item
            v-for="v in item.children"
            :key="v.name"
            @click="goRoute(v.path)"
          >
            {{ v.meta.title }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  props: {
    collapsed: [Boolean, false]
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
  },
  methods: {
    // 路由跳转
    goRoute(path) {
      this.$router.push({
        path: path
      })
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
