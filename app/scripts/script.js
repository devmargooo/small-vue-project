new Vue({
    el: '#app',
    data: {
        listOrigin: false,
        sortKey: '№',
        search: '',
        filter: 'all',
        show: 'all',
        page: 0,
        pagesCount: 1,
        reverse: {},
        columns: ['№', 'Product number', 'Date', 'Category', 'Name', 'Quantity'],
    },
    mounted: function () {
        this.load();
        this.initReverse();
    },
    computed: {
      list: function () {
          switch (this.show){
              case 'all':
                  this.pagesCount = 1;
                  return this.listOrigin;
              case 'five':
                  this.pagesCount = Math.ceil(this.listOrigin.length / 5);
                  return this.listOrigin.slice(this.page*5, (this.page + 1)*5);
              case 'ten':
                  this.pagesCount = Math.ceil(this.listOrigin.length / 10);
                  return this.listOrigin.slice(this.page*10, (this.page + 1)*10);
              default:
                  return this.listOrigin;
          }
      },

      buttonLeftClass: function () {
          if (this.page == 0) return 'button--disabled';
          else return null;
      },
      buttonRightClass: function () {
          if (this.page >= this.pagesCount - 1) return 'button--disabled';
          else return null;
      },
      IsButtonLeftDisabled: function () {
          if (this.page == 0) return true;
          else return false;
      },
      IsButtonRightDisabled: function () {
          if (this.page >= this.pagesCount - 1) return true;
          else return false;
      }
    },
    methods: {
        filterArray: function (item) {
            if (this.filter === 'all') return true;
            else if (item.category == this.filter) return true;
        },
        sortBy: function(sortKey) {
            switch (sortKey){
                case 'Name':
                    if (!this.reverse[sortKey]) this.list.sort(this.compareByName);
                    else this.list.sort(this.compareByNameReversed);
                    this.reverse[sortKey] = !this.reverse[sortKey];
                    break;
                case 'Product number':
                    if (!this.reverse[sortKey]) this.list.sort(this.compareByNumber);
                    else this.list.sort(this.compareByNumberReversed);
                    this.reverse[sortKey] = !this.reverse[sortKey];
                    break;
                case 'Date':
                    if (!this.reverse[sortKey]) this.list.sort(this.compareByDate);
                    else this.list.sort(this.compareByDateReversed);
                    this.reverse[sortKey] = !this.reverse[sortKey];
                    break;
                case 'Category':
                    if (!this.reverse[sortKey]) this.list.sort(this.compareByCategory);
                    else this.list.sort(this.compareByCategoryReversed);
                    this.reverse[sortKey] = !this.reverse[sortKey];
                    break;
                case 'Quantity':
                    if (!this.reverse[sortKey]) this.list.sort(this.compareByQuantity);
                    else this.list.sort(this.compareByQuantityReversed);
                    this.reverse[sortKey] = !this.reverse[sortKey];
                    break;
                default:
                    return;
            }
        },
        compareByName: function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        },
        compareByNameReversed: function (a, b) {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
        },
        compareByNumber: function (a, b) {
            if (a.number < b.number) return -1;
            if (a.number > b.number) return 1;
            return 0;
        },
        compareByNumberReversed: function (a, b) {
            if (a.number > b.number) return -1;
            if (a.number < b.number) return 1;
            return 0;
        },
        compareByDate: function (a, b) {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        },
        compareByDateReversed: function (a, b) {
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
            return 0;
        },
        compareByCategory: function (a, b) {
            if (a.category < b.category) return -1;
            if (a.category > b.category) return 1;
            return 0;
        },
        compareByCategoryReversed: function (a, b) {
            if (a.category > b.category) return -1;
            if (a.category < b.category) return 1;
            return 0;
        },
        compareByQuantity: function (a, b) {
            if (this.modifyQuantity(a.quantity) < this.modifyQuantity(b.quantity)) return -1;
            if (this.modifyQuantity(a.quantity) > this.modifyQuantity(b.quantity)) return 1;
            return 0;
        },
        compareByQuantityReversed: function (a, b) {
            if (this.modifyQuantity(a.quantity) > this.modifyQuantity(b.quantity)) return -1;
            if (this.modifyQuantity(a.quantity) < this.modifyQuantity(b.quantity)) return 1;
            return 0;
        },
        modifyQuantity: function (quantity) {
            if (quantity == 'none') return 1;
            if (quantity == 'few') return 2;
            if (quantity == 'average') return 3;
            if (quantity == 'lot') return 4;
            return 0;
        },
        initReverse: function () {
            for (item in this.columns){
                this.reverse[this.columns[item]] = false;
            }
        },
        pageUp: function () {
            if (this.page < this.pagesCount - 1) this.page++;
        },
        pageDown: function () {
            if (this.page > 0) this.page--;
        },
        load: function () {

            this.$http.get('api/list.json').then(response => {

                this.listOrigin = response.body;
                this.list = response.body;

            }, error => {
                console.log("error");
            });
        }
    }
});