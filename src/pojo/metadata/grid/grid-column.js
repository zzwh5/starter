export default class GridColumn {
  _primary = false
  _field
  _name
  _position = 0
  _hidden = false

  get primary() {
    return this._primary
  }

  set primary(value) {
    this._primary = value
  }

  get field() {
    return this._field
  }

  set field(value) {
    this._field = value
  }

  get name() {
    return this._name
  }

  set name(value) {
    this._name = value
  }

  get position() {
    return this._position
  }

  set position(value) {
    this._position = value
  }

  get hidden() {
    return this._hidden
  }

  set hidden(value) {
    this._hidden = value
  }
}
