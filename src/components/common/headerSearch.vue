<!-- 顶部的搜索 公共组件 -->
<template>
  <a-form
    layout="inline"
    class="ant-advanced-search-form"
    :form="form"
    @submit="handleSearch"
  >
    <a-row :gutter="48" style="display: flex; align-items: center">
      <template v-for="(item, i) in columns">
        <a-col
          :key="item.field"
          :span="8"
          :style="{ display: i < count ? 'block' : 'none' }"
        >
          <a-form-item :label="item.name">
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
      <!-- 下拉框的列表循环 -->
      <template v-for="(item, i) in Select">
        <a-col :key="item.name" :span="8">
          <a-form-item :label="item.name">
            <a-select
              v-decorator="[
                item.field,
                {
                  rules: [{ required: item.isRequired }]
                }
              ]"
              placeholder="请输入"
              @mouseenter="selectFocus(i)"
            >
              <a-spin
                v-if="item.isLoading && item.value.length <= 0"
                slot="notFoundContent"
                size="small"
              />
              <template v-for="v in item.value">
                <a-select-option :key="v.values" :value="v.index">
                  {{ v.values }}
                </a-select-option>
              </template>
            </a-select>
          </a-form-item>
        </a-col>
      </template>
    </a-row>
    <a-row>
      <a-col :span="24" :style="{ textAlign: 'right', paddingRight: '2rem' }">
        <a-button type="primary" html-type="submit"> 查询 </a-button>
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
    expand: {
      type: Boolean
    },
    // 字段数据
    columns: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    // 顶部搜索展示的字段的个数
    count: {
      type: Number,
      default: null,
      required: true
    }
  },
  data() {
    return {
      // 搜索的表格
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      // 下拉框的数组
      Select: []
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
        if (error) {
          console.log(error)
        }
        var obj = JSON.parse(JSON.stringify(values))
        var arr = []
        if (JSON.stringify(obj) == '{}') {
          arr = []
        } else {
          for (const key in obj) {
            var condition = this.columns.filter((v) => v.field == key)[0]
              .searchCondition
            arr.push({
              condition,
              field: key,
              value: obj[key]
            })
          }
        }
        // 子级调用父级的搜索方法筛选表格数据
        this.$parent.handleSearch(arr)
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
    },
    // 下拉框得到焦点
    selectFocus(index) {
      var that = this
      // console.log(index)
      setTimeout(() => {
        that.Select[index].isLoading = false
        that.Select[index].value = [
          {
            values: 'Lucy',
            index: 0
          },
          {
            values: 'Marry',
            index: 1
          }
        ]
      }, 2000)
    }
  }
}
</script>

<style  scoped lang='scss'>
</style>
