import FormColumn from './FormColumn'

export default class SearchFormColumn extends FormColumn {
  readOnly = true

  get searchCondition() {
    return this.searchCondition
  }

  set searchCondition(value) {
    this.searchCondition = value
  }
}
