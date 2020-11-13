<!-- 顶部操作的容器 -->
<template>
  <a-row style="display:flex;align-items:center">
    <a-col :span="4" :style="{ textAlign: 'left' }">
      <a-button-group>
        <a-button type="primary" icon="plus" @click="openModal('insert')">
          新增
        </a-button>
        <a-button
          type="danger"
          icon="edit"
          :disabled="selectCount > 0 ? false : true"
          @click="delSelect"
        >
          删除
        </a-button>
      </a-button-group>
    </a-col>
    <a-col
      :span="1"
      :style="{
        textAlign: 'center',
        'margin-left': 'auto'
      }"
    >
      <a-icon type="reload" style="cursor: pointer;" @click="reload" />
    </a-col>
  </a-row>
</template>

<script>
export default {
  props: {
    // 当前选中的表格数据的个数 用来判断删除按钮的禁用与否
    // eslint-disable-next-line vue/require-prop-types
    selectCount: {
      tye: Number,
      default: null,
      require: true
    }
  },
  data() {
    return {}
  },
  methods: {
    // 打开增删改查的弹框
    openModal() {
      this.$parent.openModal('insert')
    },
    // 删除表格中选中的数据
    delSelect() {
      this.$parent.delSelect()
    },
    // 刷新表格
    reload() {
      this.$parent.getTable()
    }
  }
}
</script>

<style  scoped lang='scss'>
</style>
