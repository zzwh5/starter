<!--  -->
<template>
  <a-modal
    v-model="visible"
    title="Title"
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
          <a-col
            v-if="!item.primary && item.title != 'Action'"
            :key="item.dataIndex"
            :span="12"
          >
            <a-form-item :label="`${item.title}`">
              <a-input
                v-decorator="[
                  `${item.dataIndex}`,
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Input something!'
                      }
                    ]
                  }
                ]"
                :readOnly="true"
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
    visible: {
      type: Boolean
    },
    columns: {
      type: Array,
      default() {
        return []
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
  methods: {
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
        console.log(this.$parent.handleSbumit)
        this.$parent.handleSbumit(values)
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
