class FormColumn {
    /**
     * 主键
     * <br/>
     * 标记字段是否为表的主键
     */
    _primary = false;

    _field;

    /**
     * 字段名
     * <br/>
     * 前端展示用的字段名
     */
    _name;

    /**
     * 描述
     */
    _description;

    /**
     * 示例值
     */
    _exampleValue;

    /**
     * 默认值
     */
    _defaultValue;

    /**
     * 数据类型
     */
    _dataType = "string";

    /**
     * 校验正则
     */
    _verifyReg;

    /**
     * 必填
     */
    _required = true;

    /**
     * 排序位置
     */
    _position = 0;

    /**
     * 隐藏
     */
    _hidden = false;

    /**
     * 只读
     */
    _readOnly = false;

    get primary() {
        return this._primary;
    }

    set primary(value) {
        this._primary = value;
    }

    get field() {
        return this._field;
    }

    set field(value) {
        this._field = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get exampleValue() {
        return this._exampleValue;
    }

    set exampleValue(value) {
        this._exampleValue = value;
    }

    get defaultValue() {
        return this._defaultValue;
    }

    set defaultValue(value) {
        this._defaultValue = value;
    }

    get dataType() {
        return this._dataType;
    }

    set dataType(value) {
        this._dataType = value;
    }

    get verifyReg() {
        return this._verifyReg;
    }

    set verifyReg(value) {
        this._verifyReg = value;
    }

    get required() {
        return this._required;
    }

    set required(value) {
        this._required = value;
    }

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = value;
    }

    get hidden() {
        return this._hidden;
    }

    set hidden(value) {
        this._hidden = value;
    }

    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        this._readOnly = value;
    }
}
