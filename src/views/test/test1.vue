<!--  -->
<template>
  <div class="test1">
    <Common :columns="columns" :data="table" />
  </div>
</template>

<script>
// 引入公共组件
import Common from '@/components/common/index'
// 引入接口
import {
  getColumns,
  getTable,
  addTable,
  editTable,
  delTable
} from '@/request/api'
export default {
  components: {
    Common
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
      table: []
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
    delTable() {}
  }
}
</script>

<style  scoped lang='scss'>
.test1 {
}
</style>
