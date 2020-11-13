export default class FormColumn {
  /**
   * 主键
   * <br/>
   * 标记字段是否为表的主键
   */
  primary = false

  field

  /**
   * 字段名
   * <br/>
   * 前端展示用的字段名
   */
  name

  /**
   * 描述
   */
  description

  /**
   * 示例值
   */
  exampleValue

  /**
   * 默认值
   */
  defaultValue

  /**
   * 数据类型
   */
  dataType = 'string'

  /**
   * 校验正则
   */
  verifyReg

  /**
   * 必填
   */
  required = true

  /**
   * 排序位置
   */
  position = 0

  /**
   * 隐藏
   */
  hidden = false

  /**
   * 只读
   */
  readOnly = false

  get primary() {
    return this.primary
  }

  set primary(value) {
    this.primary = value
  }

  get field() {
    return this.field
  }

  set field(value) {
    this.field = value
  }

  get name() {
    return this.name
  }

  set name(value) {
    this.name = value
  }

  get description() {
    return this.description
  }

  set description(value) {
    this.description = value
  }

  get exampleValue() {
    return this.exampleValue
  }

  set exampleValue(value) {
    this.exampleValue = value
  }

  get defaultValue() {
    return this.defaultValue
  }

  set defaultValue(value) {
    this.defaultValue = value
  }

  get dataType() {
    return this.dataType
  }

  set dataType(value) {
    this.dataType = value
  }

  get verifyReg() {
    return this.verifyReg
  }

  set verifyReg(value) {
    this.verifyReg = value
  }

  get required() {
    return this.required
  }

  set required(value) {
    this.required = value
  }

  get position() {
    return this.position
  }

  set position(value) {
    this.position = value
  }

  get hidden() {
    return this.hidden
  }

  set hidden(value) {
    this.hidden = value
  }

  get readOnly() {
    return this.readOnly
  }

  set readOnly(value) {
    this.readOnly = value
  }
}

// const form = Object.assign(new FormColumn(), { readOnly: false })
// console.log(form)
