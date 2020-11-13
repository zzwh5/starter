<!--  -->
<template>
  <a-modal
    v-model="visible"
    :title="
      types == 'detail'
        ? '查看'
        : types == 'insert'
        ? '新增'
        : types == 'update'
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
      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
      <a-button
        v-if="types != 'detail'"
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        提交
      </a-button>
    </template>
    <!-- 右上角的关闭按钮 -->
    <div class="close" @click="handleCancel">
      <a-icon type="close" style="font-size:1.6rem" />
    </div>
    <a-form
      layout="inline"
      class="ant-advanced-search-form"
      :form="submitForm"
      @submit="handleSbumit"
    >
      <a-row :gutter="48">
        <template v-for="item in columns">
          <a-col v-if="!item.primary" :key="item.field" :span="12">
            <a-form-item :label="`${item.name}`">
              <a-input
                v-decorator="[
                  `${item.field}`,
                  {
                    rules: [
                      {
                        pattern: item.verifyReg,
                        required: item.required,
                        message: `请输入${item.name}`
                      }
                    ]
                  }
                ]"
                :readOnly="item.readOnly"
                placeholder="请输入"
              />
            </a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: {
    // 弹框的显示与否
    visible: {
      type: Boolean
    },
    // 表单的字段列表
    columns: {
      type: Array,
      default() {
        return []
      },
      require: true
    },
    // 当前表格的类型
    types: {
      type: String,
      default() {
        return 'insert'
      },
      require: true
    }
  },
  data() {
    return {
      // 点击提交的加载中状态
      loading: false,
      // 弹框的form表单
      submitForm: this.$form.createForm(this, { name: 'advanced_dialog' })
    }
  },
  created() {
    // console.log(this.columns)
  },
  methods: {
    // v-decorator绑定数据 必须是字段已经绑定
    setValue(obj) {
      var that = this
      if (this.types == 'update') {
        this.id = obj.id
      }
      // obj是父级传过来的值
      // this.columns用来判断用不用渲染 比如 primary:true可能就不用渲染
      // console.log(obj)
      // console.log(this.columns)
      this.columns.forEach(v => {
        if (!v.primary) {
          console.log({ [v.field]: obj[v.field] })
          that.submitForm.setFieldsValue({
            [v.field]: obj[v.field]
          })
        }
      })
    },
    // 弹框的取消和确定
    handleOk(e) {
      e.preventDefault()
      // var that = this
      this.loading = true
      this.handleSbumit()
    },
    // 弹框表格的提交 和取消弹框
    handleSbumit() {
      this.submitForm.validateFields((error, values) => {
        if (error) {
          console.log(error)
        }
        // console.log('Received values of form: ', values)
        // console.log(this.types)
        if (this.types == 'insert') {
          this.$parent.insertTable(values)
        }
        if (this.types == 'update') {
          this.$parent.editTable({
            ...values,
            id: this.id
          })
        }
      })
    },
    // 弹框取消
    handleCancel(e) {
      this.$parent.handleCancel()
    },
    // 重置表单
    resetForm() {
      this.submitForm.resetFields()
    }
  }
}
</script>

<style scoped lang='scss'>
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
</style>
