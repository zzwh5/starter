import FormColumn from './FormColumn'

export default class SearchFormColumn extends FormColumn {
  searchCondition = 'EQ'

  get searchCondition() {
    return this.searchCondition
  }

  set searchCondition(value) {
    this.searchCondition = value
  }
}
