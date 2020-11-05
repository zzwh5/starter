<!-- 顶部操作的容器 -->
<template>
  <a-row>
    <a-col :span="24" :style="{ textAlign: 'left' }">
      <a-button type="primary" icon="plus" @click="openModal">
        新增
      </a-button>
    </a-col>
  </a-row>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    // 打开增删改查的弹框
    openModal() {
      this.$parent.openModal()
    }
  }
}
</script>

<style  scoped lang='scss'>
</style>
