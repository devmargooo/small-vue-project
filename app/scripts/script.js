const Index = Vue.component('main-content', {
    template: '#index',
    data: function () {
        return {
            listOrigin: false,
            sortKey: '№',
            search: '',
            filter: 'all',
            show: 'all',
            page: 0,
            pagesCount: 1,
            reverse: {},
            columns: ['№', 'Product number', 'Date', 'Category', 'Name', 'Quantity']
        }
    },
    mounted: function () {
        this.load();
        this.initReverse();
    },
    computed: {
        list: function () {
            if (this.listOrigin) {
                let temp;
                switch (this.filter) {
                    case 'all':
                        temp = this.listOrigin.filter(function () {
                            return true;
                        });
                        break;
                    case 'dresses':
                        temp = this.listOrigin.filter(this.filterDresses);
                        break;
                    case 't-shirts':
                        temp = this.listOrigin.filter(this.filterTShirts);
                        break;
                    case 'shoes':
                        temp = this.listOrigin.filter(this.filterShoes);
                        break;
                    case 'skirts':
                        temp = this.listOrigin.filter(this.filterSkirts);
                        break;
                    default:
                        temp = this.listOrigin.filter(function () {
                            return true;
                        });
                        break;

                }
                switch (this.show) {
                    case 'all':
                        this.pagesCount = 1;
                        return temp;
                    case 'five':
                        this.pagesCount = Math.ceil(this.listOrigin.length / 5);
                        return temp.slice(this.page * 5, (this.page + 1) * 5);
                    case 'ten':
                        this.pagesCount = Math.ceil(this.listOrigin.length / 10);
                        return temp.slice(this.page * 10, (this.page + 1) * 10);
                    default:
                        return temp;
                }
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
        filterDresses: function (value) {
            if (value.category === 'dresses') return true;
            else return false;
        },
        filterSkirts: function (value) {
            if (value.category === 'skirts') return true;
            else return false;
        },
        filterTShirts: function (value) {
            if (value.category === 't-shirts') return true;
            else return false;
        },
        filterShoes: function (value) {
            if (value.category === 'shoes') return true;
            else return false;
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

const Product = Vue.component('product', {
    template: '#product'
});

const routes = [
    { path: '/product', component: Product },
    { path: '/', component: Index }
];

const router = new VueRouter({
    routes
});

const app = new Vue({
    router
    /*data: {
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
          if (this.listOrigin) {
              let temp;
              switch (this.filter) {
                  case 'all':
                      temp = this.listOrigin.filter(function () {
                          return true;
                      });
                      break;
                  case 'dresses':
                      temp = this.listOrigin.filter(this.filterDresses);
                      break;
                  case 't-shirts':
                      temp = this.listOrigin.filter(this.filterTShirts);
                      break;
                  case 'shoes':
                      temp = this.listOrigin.filter(this.filterShoes);
                      break;
                  case 'skirts':
                      temp = this.listOrigin.filter(this.filterSkirts);
                      break;
                  default:
                      temp = this.listOrigin.filter(function () {
                          return true;
                      });
                      break;

              }
              switch (this.show) {
                  case 'all':
                      this.pagesCount = 1;
                      return temp;
                  case 'five':
                      this.pagesCount = Math.ceil(this.listOrigin.length / 5);
                      return temp.slice(this.page * 5, (this.page + 1) * 5);
                  case 'ten':
                      this.pagesCount = Math.ceil(this.listOrigin.length / 10);
                      return temp.slice(this.page * 10, (this.page + 1) * 10);
                  default:
                      return temp;
              }
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
        filterDresses: function (value) {
            if (value.category === 'dresses') return true;
            else return false;
        },
        filterSkirts: function (value) {
            if (value.category === 'skirts') return true;
            else return false;
        },
        filterTShirts: function (value) {
            if (value.category === 't-shirts') return true;
            else return false;
        },
        filterShoes: function (value) {
            if (value.category === 'shoes') return true;
            else return false;
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
    }*/
}).$mount('#app');