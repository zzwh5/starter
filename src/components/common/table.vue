<!-- 表格列表数据 -->
<template>
  <div class="table">
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 1500, y: 500 }"
      bordered
    >
      <template v-slot:action>
        <a-button type="primary" ghost size="small">
          查看
        </a-button>
        <a-button type="primary" ghost size="small">
          编辑
        </a-button>
        <a-button type="danger" ghost size="small">
          删除
        </a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  props: {
    // 参数列表
    columns: [Array, []],
    // 表格数据列表
    data: [Array, []]
  },
  data() {
    return {}
  },
  created() {
    console.log(this.columns)
  }
}
</script>

<style  scoped lang='scss'>
.table {
  .ant-table-bordered .ant-table-tbody > tr > td {
    .ant-btn {
      margin-right: 0.5rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
