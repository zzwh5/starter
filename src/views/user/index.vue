<!--  -->
<template>
  <div class="user">
    <a-col :xs="20" :sm="18" :md="16" :lg="14" :xl="10" :xxl="8">
      <div class="tabs">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="登录">
            <a-form
              id="components-form-demo-normal-login"
              :form="form"
              class="login-form"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 16 }"
              @submit="handleSubmit"
            >
              <a-form-item label="用户名">
                <a-input
                  v-decorator="[
                    'username',
                    {
                      rules: [{ required: true, message: '请输入用户名!' }]
                    }
                  ]"
                  placeholder="用户名"
                />
              </a-form-item>
              <a-form-item label="密码">
                <a-input-password
                  v-decorator="[
                    'password',
                    {
                      rules: [{ required: true, message: '请输入密码' }]
                    }
                  ]"
                  autocomplete="off"
                  type="password"
                  placeholder="密码"
                />
              </a-form-item>
              <!-- <a-form-item label="验证码">
                <a-row :gutter="16" type="flex" justify="center" align="middle">
                  <a-col :span="18">
                    <a-input
                      v-decorator="[
                        'code',
                        {
                          rules: [{ required: true, message: '请输入验证码!' }]
                        }
                      ]"
                      placeholder="验证码"
                    >
                    </a-input>
                  </a-col>
                  <a-col :span="6">
                    <a-button
                      :loading="iconLoading"
                      @click="getCode"
                      style="width:100%"
                    >
                      {{ code }}
                    </a-button>
                  </a-col>
                </a-row>
              </a-form-item> -->
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <!-- <a class="login-form-forgot" href="">
                Forgot password
              </a> -->
                <a-button
                  type="primary"
                  html-type="submit"
                  class="login-form-button"
                >
                  Log in
                </a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="注册" force-render>
            Content of Tab Pane 2
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-col>
  </div>
</template>

<script>
// md5加密
import md5 from 'js-md5'
import { Base64 } from 'js-base64'
// 登录接口
import { login } from '@/request/api'
import { setBothToken } from '@/util/token-storage'
export default {
  data() {
    return {
      // form
      form: this.$form.createForm(this, { name: 'normal_login' }),
      // code验证码 是否正在请求
      iconLoading: false,
      // 验证码
      code: 345
    }
  },
  created() {},
  methods: {
    // tab切换的时候
    callback(key) {
      console.log(key)
    },
    // 获取验证码
    getCode() {
      // console.log(this.form)
      var that = this
      this.iconLoading = true
      this.code = ''
      setTimeout(() => {
        that.iconLoading = false
        that.code = 234
      }, 500)
    },
    // 表单提交的时候
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
          var obj = values
          obj.password = md5(obj.password)
          // console.log(obj)
          login(obj)
            .then((res) => {
              // console.log(res)
              // 在storage中设置token
              setBothToken(res.data)
              var time = res.data.token.split('.')[1]
              console.log(Base64.decode(time))
              this.$router.push({
                path: '/'
              })
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
    }
  }
}
</script>

<style  scoped lang='scss'>
.user {
  z-index: 990;
  width: 100vw;
  height: 100vh;
  background: #001529;
  display: flex;
  justify-content: center;
  align-items: center;
  .tabs {
    height: 50rem;
    background-color: #fff;
    border-radius: 1rem;
    /deep/.ant-form {
      margin-top: 2rem;
    }
  }
  /deep/.ant-form-item {
    @media (max-width: 575px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0 5%;
      box-sizing: border-box;
    }
    .ant-form-item-control-wrapper {
      @media (max-width: 575px) {
        display: block;
        width: 70%;
      }
    }
    .ant-form-item-label {
      @media (max-width: 575px) {
        display: block;
        width: 20%;
        text-align: right;
        padding-bottom: 0;
      }
    }
  }
}
</style>
