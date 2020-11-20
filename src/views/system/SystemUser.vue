<!-- 系统用户管理 -->
<template>
  <div class="SystemUser">
    <!-- 顶部编辑 -->
    <div class="header-edit">
      <a-row style="display: flex; align-items: center">
        <a-col :span="4">
          <a-button-group>
            <a-button type="primary" icon="plus" @click="handleAdd">
              新增
            </a-button>
          </a-button-group>
        </a-col>
      </a-row>
    </div>
    <!-- 表格 -->
    <div class="table">
      <a-table
        :scroll="{ x: 1500, y: 500 }"
        :columns="columns"
        :data-source="data"
        bordered
        :pagination="pagination"
        :loading="loading"
        rowKey="id"
        @change="onChange"
      >
        <!-- 状态自定义渲染 -->
        <span slot="status" slot-scope="text">
          {{ getStatusStr(text) }}
        </span>
        <!-- 操作的自定义渲染  -->
        <template slot="action" slot-scope="text, record">
          <!-- {{ record }} -->
          <a-button-group>
            <a-button
              style="margin-right: 5%"
              size="small"
              type="primary"
              @click="handleDetail(record)"
            >
              查看
            </a-button>
            <a-button
              style="margin-right: 5%"
              size="small"
              type="primary"
              @click="handleEdit(record)"
            >
              编辑
            </a-button>
            <a-button size="small" type="danger" @click="handleDel(record)">
              删除
            </a-button>
          </a-button-group>
        </template>
      </a-table>
    </div>
    <!-- 表单弹框 -->
    <a-modal
      v-model="visible"
      :title="
        dialogType == 'detail'
          ? '查看'
          : dialogType == 'insert'
          ? '新增'
          : dialogType == 'update'
          ? '编辑'
          : ''
      "
      on-ok="handleOk"
      dialogClass="modal"
      width="45%"
      :maskClosable="false"
      centered
      :destroyOnClose="true"
      :closable="false"
    >
      <!-- 自定义弹框footer -->
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> 取消 </a-button>
        <a-button
          v-if="dialogType != 'detail'"
          key="submit"
          type="primary"
          @click="handleOk"
        >
          提交
        </a-button>
      </template>
      <!-- 右上角的关闭按钮 -->
      <div class="close" @click="handleCancel">
        <a-icon type="close" style="font-size: 1.6rem" />
      </div>
      <a-form
        class="ant-advanced-search-form"
        :form="submitForm"
        @submit="handleSbumit"
      >
        <a-row :gutter="48">
          <template v-for="item in dialogColumns">
            <a-col
              v-if="!item.primary && item.dataIndex != 'action'"
              :key="item.field"
              :span="24"
            >
              <a-form-item :label="`${item.name}`">
                <a-input
                  v-if="!item.isSelect"
                  v-decorator="[
                    `${item.field}`,
                    {
                      rules: [
                        {
                          required: true,
                          message: `请输入${item.name}`
                        }
                      ]
                    }
                  ]"
                  :readOnly="dialogType == 'detail' ? true : false"
                  placeholder="请输入"
                  :type="item.name == '密码' ? 'password' : 'text'"
                />
                <a-select
                  v-if="item.isSelect"
                  v-decorator="[
                    item.field,
                    {
                      rules: [{ required: true, message: `请输入${item.name}` }]
                    }
                  ]"
                  placeholder="请输入"
                  :disabled="
                    dialogType == 'detail'
                      ? true
                      : dialogType != 'update' && item.name == '角色名称'
                      ? true
                      : false
                  "
                  @mouseenter="selectFocus(item)"
                  @change="(value, option) => selectChange(value, option, item)"
                >
                  <a-icon
                    v-if="item.isLoading && item.options.length <= 0"
                    slot="suffixIcon"
                    type="loading"
                    style="color: blue"
                  />
                  <!-- 内容为空的时候显示 -->
                  <a-spin
                    v-if="item.isLoading && item.options.length <= 0"
                    slot="notFoundContent"
                    size="small"
                  />
                  <template v-for="v in item.options">
                    <a-select-option :key="v.index" :value="v.index">
                      {{ v.name }}
                    </a-select-option>
                  </template>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
// 引入主要的接口 增删改查 字段 表格数据
import { crud } from '@/request/api'
// md5加密
import md5 from 'js-md5'
export default {
  data() {
    return {
      // 当前弹框展示的用户id
      usre_id: '',
      // 弹框的参数列表
      dialogColumns: [],
      // 弹框的form表单
      submitForm: this.$form.createForm(this, { name: 'advanced_dialog' }),
      // 弹框的显示与否
      visible: false,
      // 弹框的类型
      dialogType: 'detail',
      //  当前页面的接口
      api: '/rest/1.0/admin/user',
      // 字段列表
      columns: [],
      // 表格列表是否正在加载中
      loading: false,
      // 表格的主键
      primary: '',
      // 表格列表
      data: [],
      // 表格分页信息
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      // 排序的条件
      sort: {},
      // 表格中状态的取值
      status: [
        {
          index: 0,
          name: '未激活'
        },
        {
          index: 1,
          name: '正常'
        },
        {
          index: 2,
          name: '锁定'
        },
        {
          index: 3,
          name: '删除'
        }
      ],
      // 需要前端手动加的 字段
      addcolumns: [
        {
          name: '密码',
          field: 'password'
        },
        {
          name: '角色名称',
          field: 'role'
        }
      ]
    }
  },
  created() {
    // 获取字段列表
    this.getMetadata()
    // 获取表格数据
    this.getTable()
  },
  methods: {
    // 获取当前页面的字段列表
    getMetadata() {
      crud.Metadata(this.api).then((res) => {
        // console.log(res)
        this.columns = this.formattingColumns(res.data.grid.columns)
        // 为了防止 浅拷贝 所以 JSON.parse(JSON.stringify())
        this.dialogColumns = JSON.parse(JSON.stringify(this.columns))
        this.dialogColumns = this.dialogColumns.concat(this.addcolumns)
        this.dialogColumns.forEach((v) => {
          if (v.name == '状态' || v.name == '角色名称') {
            v.isSelect = true
            v.options = []
            v.isLoading = true
          } else {
            v.isSelect = false
          }
        })
        // console.log(this.dialogColumns)
      })
    },
    // 弹框的取消和确定
    handleOk(e) {
      e.preventDefault()
      this.handleSbumit()
    },
    // 弹框表格的提交 和取消弹框
    handleSbumit() {
      this.submitForm.validateFields((error, values) => {
        if (error) {
          // console.log(error)
        }
        if (this.dialogType == 'insert') {
          // console.log('提交')
          // console.log(values)
          values.password = md5(values.password)
          crud.Insert(this.api, values).then((res) => {
            if (res.code != 200) {
              return false
            }
            // console.log(res)
            this.resetForm()
            this.visible = false
            this.getTable()
          })
        }
        if (this.dialogType == 'update') {
          console.log('编辑')
          console.log(values)
        }
      })
    },
    // 弹框取消
    handleCancel(e) {
      this.visible = false
      this.resetForm()
    },
    // 重置表单
    resetForm() {
      this.submitForm.resetFields()
    },
    // 查看表格数据
    handleDetail(obj) {
      this.dialogType = 'detail'
      // console.log(obj)
      this.openDialog(obj.id)
    },
    // 新增表格数据
    handleAdd() {
      this.dialogType = 'insert'
      this.openDialog()
    },
    // 编辑表格数据
    handleEdit(obj) {
      this.dialogType = 'update'
      // console.log(obj)
      this.openDialog(obj.id)
    },
    // 删除表格数据
    handleDel(obj) {
      console.log(obj)
    },
    // 获取当前页面的表格数据
    getTable() {
      var that = this
      this.loading = true
      this.data = []
      // 分页条件
      var Pagination = {}
      if (this.pagination.current) {
        Pagination.index = this.pagination.current
        Pagination.size = this.pagination.pageSize
      }
      // 排序条件
      var sort = {}
      if (this.sort.field != '') {
        sort = this.sort
      }
      crud.Search(this.api, Pagination, sort).then((res) => {
        console.log(res)
        if (res.code != 200) {
          return false
        }
        this.loading = false
        res.data.forEach((v, i) => {
          that.data.push({
            key: v[that.primary],
            ...v
          })
        })
      })
    },
    // 当表格的条件发生变化的时候 触发的事件 比如分页等
    onChange(pagination, filters, sorter) {
      // console.log('params', pagination, filters, sorter)
    },
    // 打开弹框 判断是否请求表格数据detail
    openDialog(id) {
      var that = this
      this.visible = true
      if (this.dialogType == 'insert') {
        return false
      }
      this.usre_id = id
      crud.Detail(this.api, { id }).then((res) => {
        console.log(res)
        for (var key in res.data) {
          // console.log(key)
          that.submitForm.setFieldsValue({
            [key]: res.data[key]
          })
        }
      })
    },
    // 解析表格参数的列表
    formattingColumns(arr) {
      var that = this
      var arrs = []
      arr = JSON.parse(JSON.stringify(arr))
      // 遍历生成antd识别的参数 如 dataIndex等
      arr.forEach((v) => {
        if (v.primary) {
          that.primary = v.field
        }
        if (!v.hidden) {
          arrs.push({
            title: v.name,
            dataIndex: v.field,
            ellipsis: true,
            key: v.field,
            scopedSlots: { customRender: v.field },
            ...v,
            sorter: v.order
          })
        }
      })
      arrs.push({
        title: '操作',
        dataIndex: 'action',
        ellipsis: true,
        key: 'action',
        scopedSlots: { customRender: 'action' }
      })
      return arrs
    },
    // 根据数据中的状态 返回对应的状态值
    getStatusStr(index) {
      var str = this.status.filter((v) => v.index == index)[0].name
      // console.log(str)
      return str
    },
    // 请求对应的下拉框的数据
    selectFocus(obj) {
      if (this.dialogType == 'detail') {
        return false
      }
      console.log(obj.name)
      if (obj.name == '状态') {
        obj.isLoading = false
        obj.options = this.status
      }
      if (obj.name == '角色名称') {
        crud.SelectOptions('/rest/1.0/admin/role').then((res) => {
          // console.log(res)
          if (res.code != 200) {
            return false
          }
          obj.isLoading = false
          obj.options = res.data.map((v) => {
            return {
              index: v.roleName,
              name: v.roleName,
              ...v
            }
          })
          // console.log(obj.options)
        })
      }
      this.$forceUpdate()
      // console.log(obj)
    },
    // 下拉框的数据发生变化
    selectChange(value, option, item) {
      console.log(value)
      if (item.field != 'role') {
        return false
      }
      var role_id = item.options.filter((v) => v.roleName == value)[0].id
      var usre_id = this.usre_id
      crud
        .RoleUser('/rest/1.0/admin/user/role', {
          roleId: role_id,
          userId: usre_id
        })
        .then((res) => {
          console.log(res)
        })
    }
  }
}
</script>

<style  scoped lang='scss'>
.SystemUser {
  width: 100%;
  height: 100%;
  // overflow-y: scroll;
  .header-edit {
    margin-bottom: 2%;
  }
}
.ant-modal {
  .ant-modal-body {
    .close {
      width: 5.5rem;
      height: 5.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
}
// 弹框的样式
/deep/.modal {
  .ant-form {
    width: 85%;
    margin: 0 auto;
    .ant-form-item {
      width: 100%;
      display: flex;
      .ant-form-item-label {
        width: 10%;
      }
      .ant-form-item-control-wrapper {
        // width: 75%;
        flex: 1;
      }
    }
  }
}
</style>
