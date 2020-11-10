class SearchFormColumn extends FormColumn {
    _searchCondition = "EQ";


    get searchCondition() {
        return this._searchCondition;
    }

    set searchCondition(value) {
        this._searchCondition = value;
    }
}
