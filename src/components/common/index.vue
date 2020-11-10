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
import { crud } from '@/request/api'
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
  props: {
    // 接收父级的api接口
    api: {
      type: String,
      default: '',
      require: true
    }
  },
  data() {
    return {
      // 当前页面的主键
      primary: '',
      // 表格参数列表参数列表
      columns: [],
      // 表单参数列表四种类型
      formColumns: {
        Search: [],
        add: [],
        edit: [],
        detail: []
      },
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
      crud.Metadata(this.api).then(res => {
        console.log(res)
        if (res.code != 200) {
          return
        }
        // 如果data里面有 forms说明 表单的字段要用forms的  如果没有统一使用 grid的 字段
        if (res.data.forms.length > 0) {
          // console.log(res.data.forms)
          this.formColumns = this.formattingByType(res.data.forms, 'search')
        }
        this.columns = this.formatting(res.data.grid.columns, true)
      })
    },
    formattingByType(arr, type) {
      // 根据对应的类型拿到forms几种forms中的某个类型的表单 并且处理好当前这个数据 然后return
      arr = JSON.parse(JSON.stringify(arr))
      var nowArr = arr.filter(v => (v.type = type))
      var columns = nowArr[0].columns
      var arrs = []
      columns.forEach(v => {
        arrs.push({
          ...v
        })
      })
    },
    // 拿到后台的数据进行格式化
    formatting(arr, turn) {
      var that = this
      arr = JSON.parse(JSON.stringify(arr))
      var arrs = []
      arr.forEach(v => {
        if (v.primary) {
          that.primary = v.field
        }
        if (!v.hidden) {
          arrs.push({
            title: v.name,
            dataIndex: v.field,
            ellipsis: true,
            key: v.field,
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
      crud.Search(this.api).then(res => {
        res.data.forEach((v, i) => {
          that.table.push({
            key: v[that.primary],
            ...v
          })
        })
      })
    },

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
