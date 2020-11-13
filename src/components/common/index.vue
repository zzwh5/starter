<!-- 公共的页面  包括列表的展示 以及增删改查的操作 -->
<template>
  <div class="common">
    <!-- 头部 form -->
    <!-- 如果search的数组是空的说明没有搜索功能 -->
    <div v-if="formColumns.search.length > 0" class="table-page-search-wrapper">
      <SearchHeader
        ref="header"
        :expand="expand"
        :columns="formColumns.search"
        :count="count"
      />
    </div>
    <!-- 操作容器 比如新增 -->
    <div class="table-page-edit-wrapper">
      <EditHeader :selectCount="selectCount" />
    </div>
    <!-- 表格列表容器 -->
    <div class="table">
      <Table
        :loading="loading"
        :columns="columns"
        :data="table"
        :pagination="pagination"
      />
    </div>

    <!-- 增删查的弹框 -->
    <Dialog
      ref="child"
      :types="nowFormType"
      :visible="visible"
      :columns="formColumns[nowFormType]"
    />
  </div>
</template>

<script>
// 引入对应的类
import FormColumn from '@/pojo/metadata/form/FormColumn.js'
import SearchFormColumn from '@/pojo/metadata/form/SearchFormColumn.js'
import DetailFormColumn from '@/pojo/metadata/form/DetailFormColumn.js'
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
// 引入表单的类
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
      // 原始的字段数据
      oldTableColumns: [],
      // 当前页面的主键
      primary: '',
      // 表格参数列表参数列表
      columns: [],
      nowFormType: 'insert',
      // 表单参数列表四种类型
      formColumns: {
        search: [],
        insert: [],
        update: [],
        detail: []
      },
      // 当前选中的表格的数据的列表
      selectKeys: [],
      // 表格数据
      table: [],
      // 表格的分页数据
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      // 表格排序的字段
      sort: {
        // 字段名
        field: '',
        // 排序条件
        condition: ''
      },
      // 表格搜素筛选的字段
      filter: [],
      // 表格的数据是否正在加载中
      loading: false,
      // 搜索的form对象
      seachFrom: {},
      // 是否展开更多的搜索内容
      expand: false,
      // 增改查弹框的显示与否
      visible: false,
      // 当前选择的表格对象
      nowTableObj: {}
    }
  },
  // 计算属性
  computed: {
    count() {
      return this.expand ? this.columns.length : 7
    },
    selectCount() {
      return this.selectKeys.length
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
        // 赋值原始的字段数组
        if (res.code != 200) {
          return
        }
        // 将表格的原始columns保存起来 以防再用
        this.oldTableColumns = res.data.grid.columns
        // 如果data里面有 forms说明 表单的字段要用forms的  如果没有统一使用 grid的 字段
        // console.log(res.data.forms)
        // 调用 this.formattingByType函数
        // 第一个参数表示当前的forms数组
        // 第二个参数表示当前的form的类型
        // 第三个参数表示froms数组中是不是又当前的类型的form 相对应的如果是false 第一个参数的
        // 数组就表示的是 grid的数组
        // 循环遍历添加对应的表格数据
        for (const key in this.formColumns) {
          // console.log(key + '---' + obj[key])
          this.formColumns[key] = this.hasChildren(res.data.forms, key)
            ? this.formattingByType(res.data.forms, key, true)
            : this.formattingByType(res.data.grid.columns, key, false)
        }

        // 如果是表格 第二个参数为true的话 新增 action 列
        this.columns = this.formatting(res.data.grid.columns)
      })
    },
    // 判断数据中有没有某个子集
    hasChildren(arr, type) {
      arr = JSON.parse(JSON.stringify(arr))
      var nowArr = arr.filter(v => v.type == type)
      return nowArr.length > 0
    },
    // 返回的数据里面有form数组的话
    formattingByType(arr, type, turn) {
      // console.log(arr, type, turn)
      // 根据对应的类型拿到forms几种forms中的某个类型的表单 并且处理好当前这个数据 然后return
      arr = JSON.parse(JSON.stringify(arr))
      var arrs = []
      if (!turn) {
        if (type == 'search') {
          arr.forEach(v => {
            if (!v.hidden) {
              var obj = Object.assign(new SearchFormColumn(), v)
              arrs.push({
                ...obj
              })
            }
          })
          return arrs
        }
        if (type == 'detail') {
          arr.forEach(v => {
            if (!v.hidden) {
              var obj = Object.assign(new DetailFormColumn(), v)
              arrs.push({
                ...obj
              })
            }
          })
          return arrs
        }
        arr.forEach(v => {
          if (!v.hidden) {
            var obj = Object.assign(new FormColumn(), v)
            arrs.push({
              ...obj
            })
          }
        })
        // console.log(arrs)
        return arrs
      }
      var nowArr = arr.filter(v => v.type == type)
      var columns = nowArr[0].columns
      columns.forEach(v => {
        if (!v.hidden) {
          arrs.push({
            ...v
          })
        }
      })
      return arrs
    },
    // 拿到后台的数据进行格式化
    formatting(arr) {
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
            ...v,
            sorter: v.order
          })
        }
      })
      arrs.push({
        title: 'Action',
        key: 'operation',
        // fixed: 'right',
        ellipsis: true,
        width: 200,
        scopedSlots: { customRender: 'action' }
      })
      return arrs
    },
    // 判断某个
    // 子级传递给父级表格查询条件发生变化
    changeCondition(pagination, sort) {
      // console.log(sort)
      if (sort.column) {
        this.sort.field = sort.column.tableField
        this.sort.condition = sort.order == 'ascend' ? 'ASC' : 'DESC'
      }

      this.pagination = JSON.parse(JSON.stringify(pagination))
      // console.log(this.sort, this.pagination)
      this.getTable()
    },
    // 获取表格数据列表
    getTable() {
      this.loading = true
      var that = this
      that.table = []
      // 查询的条件
      // 分页条件
      var Pagination = {}
      // 排序条件
      var sort = {}
      if (this.pagination.current) {
        Pagination.index = this.pagination.current
        Pagination.size = this.pagination.pageSize
      }
      if (this.sort.field != '') {
        sort = this.sort
      }
      // console.log(Pagination, sort, this.filter)
      // return
      crud.Search(this.api, Pagination, sort, this.filter).then(res => {
        if (res.code != 200) {
          return false
        }
        this.loading = false
        this.pagination.total = res.total
        if (!res.data) {
          return false
        }
        res.data.forEach((v, i) => {
          that.table.push({
            key: v[that.primary],
            ...v
          })
        })
      })
    },
    // 当表格组件中选中的表格数据发生变化时记录下来
    onSelectChange(arr) {
      this.selectKeys = arr
    },
    // 点击表格调用的
    // 查看表格数据
    detailTable(params) {
      crud.Detail(this.api, params).then(res => {
        this.$refs.child.setValue(res.data)
      })
    },
    // 删除选中的表格数据
    delSelect() {
      var arr = JSON.parse(JSON.stringify(this.selectKeys))
      this.delTable({ ids: arr.join(',') })
    },
    // 删
    delTable(params) {
      console.log(params)
      // return
      crud.Delete(this.api, params).then(res => {
        // console.log(res)
        if (res.code != 200) {
          return false
        }
        // 删除的bug就是删除了当前页面的最后一个的时候 页面显示没有数据
        // 只是当前页面没有 上一页应该是有数据的
        // 计算出当前页面的第一条数据
        if (this.pagination.current != 1) {
          var nowPage = this.pagination.current * this.pagination.pageSize + 1
          if ((this.pagination.total = nowPage)) {
            this.pagination.current--
          }
        }
        this.getTable()
      })
    },
    // 点击表单的提交调用的
    // 新增表格数据
    insertTable(obj) {
      console.log(obj)
      crud.Insert(this.api, obj).then(res => {
        // console.log(res)
        if (res.code != 200) {
          return false
        }
        this.$refs.child.loading = false
        this.visible = false
        this.$refs.child.resetForm()
        this.getTable()
      })
    },
    // 编辑表格数据
    editTable(obj) {
      console.log(obj)
      crud.Update(this.api, obj).then(res => {
        if (res.code != 200) {
          return false
        }
        // console.log(res)
        this.$refs.child.loading = false
        this.visible = false
        this.$refs.child.resetForm()
        this.getTable()
      })
    },

    // 点击搜索
    handleSearch(arr) {
      // console.log(arr)
      // arr是顶部搜索组件 解析好的传过来的 每个搜索字段的集合
      this.filter = arr
      this.getTable()
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
    openModal(type, params) {
      this.nowFormType = type
      this.visible = true
      if (type == 'detail') {
        this.detailTable(params)
        return
      }
      if (type == 'update') {
        // update相当于 先详情再 submit 更改
        this.detailTable(params)
        return
      }
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
