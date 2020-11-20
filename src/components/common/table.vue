<!-- 表格列表数据 -->
<template>
  <div class="table">
    <a-table
      :columns="columns"
      :data-source="data"
      :scroll="{ x: 1500, y: 500 }"
      bordered
      :pagination="pagination"
      :loading="loading"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: '2%'
      }"
      :rowKey="
        (record, index) => {
          return index
        }
      "
      @change="onChange"
    >
      <template slot="action" slot-scope="record">
        <a-button
          type="primary"
          ghost
          size="small"
          @click="handleDetail(record)"
        >
          查看
        </a-button>
        <a-button type="primary" ghost size="small" @click="handleEdit(record)">
          编辑
        </a-button>
        <a-button type="danger" ghost size="small" @click="handleDel(record)">
          删除
        </a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue'
export default {
  props: {
    // 参数列表
    columns: {
      type: Array,
      default() {
        return []
      },
      require: true
    },
    // 表格数据列表
    data: {
      type: Array,
      default() {
        return []
      },
      require: true
    },
    // 表格是否正在加载中的状态
    loading: {
      type: Boolean
    },
    // 分页情况
    pagination: {
      type: Object,
      default() {
        return {}
      },
      require: true
    }
  },
  data() {
    return {
      // 选中的列表的集合
      selectedRowKeys: []
    }
  },
  created() {
    // console.log(this.columns)
  },
  methods: {
    // 表格的列表发生变化
    onChange(pagination, filters, sorter) {
      // console.log(this.loading)
      // console.log('params', pagination, filters, sorter)
      this.$parent.changeCondition(pagination, sorter)
    },
    // 当选中的列表发生变化的时候
    onSelectChange(selectedRowKeys, selectedRows) {
      // console.log(selectedRowKeys, selectedRows)
      this.selectedRowKeys = selectedRowKeys
      this.$parent.onSelectChange(selectedRowKeys)
    },
    // 将选中的列表清空
    resetSelect() {
      this.selectedRowKeys = []
    },
    // 点击查看 表格详情
    handleDetail(obj) {
      // obj就是当前选中的对象
      var id = obj.id
      this.$parent.openModal('detail', { id })
    },
    handleEdit(obj) {
      // obj就是当前选中的对象
      var id = obj.id
      this.$parent.openModal('update', { id })
    },
    handleDel(obj) {
      var that = this
      Modal.confirm({
        title: '提示',
        centered: true,
        content: '是否删除当前选中的数据?',
        closable: true,
        okText: '确认',
        okButtonProps: {
          props: {
            type: 'default'
          }
        },
        cancelText: '取消',
        cancelButtonProps: {
          props: {
            type: 'primary'
          }
        },
        onOk() {
          var arr = [obj.id]
          // console.log(arr.join(','))
          that.$parent.delTable({ ids: arr.join(',') })
        },
        onCancel() {
          // console.log('cancel')
        }
      })
    }
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
