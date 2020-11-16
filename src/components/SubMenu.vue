<!--  -->
<template>
  <a-sub-menu :key="item.name" :title="item.meta.title">
    <template v-for="v in item.children">
      <template v-if="v.meta.hasChildren">
        <!--  vue组件自己调用自己  -->
        <sub-Menu :key="v.name" :item="v" />
      </template>
      <template v-else>
        <a-menu-item :key="v.name" @click="goRoute(v.path)">
          {{ v.meta.title }}
        </a-menu-item>
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
export default {
  name: 'SubMenu',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
      require: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    goRoute(path) {
      if (this.$route.path != path) {
        this.$router.push({
          path: path,
        })
      }
    },
  },
}
</script>

<style  scoped lang='scss'>
</style>
