<!--  -->
<template>
  <div class="test1">
    <Common :api="api" />
  </div>
</template>

<script>
// 引入公共组件
import Common from '@/components/Common/index'

export default {
  components: {
    Common
  },
  data() {
    return {
      //  当前页面的接口
      api: '/rest/1.0/admin/role'
    }
  },
  created() {},
  methods: {}
}
</script>

<style  scoped lang='scss'>
</style>
