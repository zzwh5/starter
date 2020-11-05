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
    <Table :columns="columns" :data="data" />
    <!-- 增删查的弹框 -->
    <Dialog ref="child" :visible="visible" :columns="columns" />
  </div>
</template>

<script>
// 查看表格数据详情的接口
import { detailTable } from '@/request/api'
// 公共表格组件
import Table from './table'
// 公共弹框组件
import Dialog from './commonDialog'
// 公共搜索头部组件
import SearchHeader from './headerSearch'
// 公共操作头部组件
import EditHeader from './headerEdit'
export default {
  props: {
    // 进行增删改查的标识
    api: [String, ''],
    // 每个页面的特殊字段
    columns: [Array, []],
    // 表格的数据
    data: [Array, []]
  },
  // 引入的组件
  components: {
    Table,
    Dialog,
    SearchHeader,
    EditHeader
  },
  data() {
    return {
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
  methods: {
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
