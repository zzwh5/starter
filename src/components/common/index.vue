<!-- 公共的页面  包括列表的展示 以及增删改查的操作 -->
<template>
  <div class="common">
    <!-- 头部 form -->
    <div class="table-page-search-wrapper">
      <SearchHeader
        ref="header"
        :expand="expand"
        :columns="columns"
        :count="count"
      />
    </div>
    <!-- 操作容器 比如新增 -->
    <div class="table-page-edit-wrapper">
      <EditHeader />
    </div>
    <!-- 表格列表容器 -->
    <Table :columns="columns" :data="table" />
    <!-- 增删查的弹框 -->
    <Dialog ref="child" :visible="visible" :columns="columns" />
  </div>
</template>

<script>
// 查看表格数据详情的接口
// 引入接口
import {
  getColumns,
  getTable,
  addTable,
  editTable,
  delTable,
  detailTable
} from '@/request/api'
// 公共表格组件
import Table from './table'
// 公共弹框组件
import Dialog from './commonDialog'
// 公共搜索头部组件
import SearchHeader from './headerSearch'
// 公共操作头部组件
import EditHeader from './headerEdit'
export default {
  // 引入的组件
  components: {
    Table,
    Dialog,
    SearchHeader,
    EditHeader
  },
  data() {
    return {
      // 当前页面的主键
      primary: '',
      // 表格参数列表参数列表
      columns: [],
      // 表单参数列表
      formColumns: [],
      // 表格数据
      table: [],
      // 搜索的form对象
      seachFrom: {},
      // 是否展开更多的搜索内容
      expand: false,
      // 增改查弹框的显示与否
      visible: false
    }
  },
  // 计算属性
  computed: {
    count() {
      return this.expand ? this.columns.length : 7
    }
  },
  created() {
    this.getColumns()
    this.getTable()
  },
  methods: {
    // 获取参数列表
    getColumns() {
      var that = this
      getColumns().then(res => {
        // console.log(res)
        if (res.code != 200) {
          return
        }
        // 如果data里面有 forms说明 表单的字段要用forms的  如果没有统一使用 grid的 字段
        if (res.data.forms) {
          this.formColumns = this.formatting(res.data.forms.columns)
        } else {
        }
        // 相对应的grid的 是表格的columns 不会发生变化
        // console.log(res.data.grid.columns)
        var arr = JSON.parse(JSON.stringify(res.data.grid.columns))
        // console.log(arr)
        arr.forEach(v => {
          // console.log(v.hidden)
          if (v.primary) {
            that.primary = v.field
          }
          if (!v.hidden) {
            that.columns.push({
              title: v.name,
              dataIndex: v.field,
              ellipsis: true,
              key: v.field,
              ellipsis: true,
              width: 150,
              scopedSlots: { customRender: v.field },
              ...v
            })
          }
        })
      })
    },
    // 拿到后台的数据进行格式化
    formatting(arr, turn) {
      var arrs = JSON.parse(JSON.stringify(arr))
      arr.forEach(v => {
        if (!v.hidden) {
          arrs.push({
            title: v.name,
            dataIndex: v.field,
            ellipsis: true,
            key: v.field,
            ellipsis: true,
            width: 150,
            scopedSlots: { customRender: v.field },
            ...v
          })
        }
      })
      if (turn) {
        arrs.push({
          title: 'Action',
          key: 'operation',
          // fixed: 'right',
          ellipsis: true,
          width: 200,
          scopedSlots: { customRender: 'action' }
        })
      }
      return arrs
    },
    // 获取表格数据列表
    getTable() {
      var that = this
      getTable().then(res => {
        // console.log(res)
        res.data.forEach((v, i) => {
          that.table.push({
            key: v[that.primary],
            ...v
          })
        })
      })
    },
    // 增
    addTable(obj) {},
    // 改
    editTable(obj) {},
    // 删
    delTable() {},

    // 点击搜索
    handleSearch(obj) {
      console.log(obj)
    },
    // 清空搜索内容
    handleReset() {
      this.$refs.header.handleReset()
    },
    // 是否展开更多内容
    toggle() {
      this.expand = !this.expand
    },
    // 打开增删改查的弹框
    openModal() {
      this.visible = true
    },
    // 弹框表格的提交 和取消弹框
    handleSbumit(obj) {
      console.log(obj)
    },
    // 弹框取消
    handleCancel() {
      this.visible = false
      this.$refs.child.resetForm()
    }
  }
}
</script>

<style  scoped lang='scss'>
.common {
  // 搜索容器
  .table-page-search-wrapper {
    /deep/ .ant-advanced-search-form {
      .ant-form-item {
        display: flex;
      }
      .ant-form-item-control-wrapper {
        flex: 1;
      }
    }
  }
  // 编辑容器
  .table-page-edit-wrapper {
    padding-bottom: 1.5rem;
  }
}

// 弹框的样式
/deep/.modal {
  .ant-form-inline .ant-form-item {
    width: 100%;
    display: flex;
    .ant-form-item-control-wrapper {
      flex: 1;
    }
  }
}
</style>
