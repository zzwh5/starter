<!-- 顶部的搜索 公共组件 -->
<template>
  <a-form
    layout="inline"
    class="ant-advanced-search-form"
    :form="form"
    @submit="handleSearch"
  >
    <a-row :gutter="48">
      <template v-for="(item, i) in columns">
        <a-col
          v-if="item.enableSearch"
          :key="item.field"
          :span="8"
          :style="{ display: i < count ? 'block' : 'none' }"
        >
          <a-form-item :label="item.title">
            <a-input
              v-decorator="[
                `${item.field}`,
                {
                  rules: [
                    {
                      required: false,
                      message: 'Input something!'
                    }
                  ]
                }
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
      </template>
    </a-row>
    <a-row>
      <a-col :span="24" :style="{ textAlign: 'right', paddingRight: '2rem' }">
        <a-button type="primary" html-type="submit">
          查询
        </a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
          重置
        </a-button>
        <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
          {{ expand ? '收起' : '展开' }}
          <a-icon :type="expand ? 'up' : 'down'" />
        </a>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
export default {
  props: {
    // 是否展开更多的顶部搜索框
    expand: [Boolean, false],
    // 字段数据
    columns: [Array, []],
    // count
    count: [Number, 0]
  },
  data() {
    return {
      // 搜索的表格
      form: this.$form.createForm(this, { name: 'advanced_search' })
    }
  },
  created() {
    // console.log(this.columns)
  },
  methods: {
    // 点击搜索
    handleSearch(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        // console.log('error', error)
        // console.log('Received values of form: ', values)
        this.$parent.handleSearch(values)
      })
    },
    // 清空搜索内容
    handleReset() {
      this.form.resetFields()
    },
    // 是否展开更多内容
    toggle() {
      // 调用父组件的方法
      this.$parent.toggle()
    }
  }
}
</script>

<style  scoped lang='scss'>
</style>
