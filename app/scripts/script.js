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
            wasReversed: false,
            columns: ['№', 'Product number', 'Date', 'Category', 'Name', 'Quantity'],
            MAX_NAME_LENGTH: 250
        }
    },
    mounted: function () {
        this.load();
        this.initReverse();

        if (localStorage.getItem('sortkey')){
            this.sortKey = localStorage.getItem('sortkey');
        } else {
            this.sortKey = '№';
        }

        if (localStorage.getItem('wasreversed')){
            this.wasReversed = localStorage.getItem('wasreversed');
            this.reverse[this.sortKey] = this.wasReversed;

        } else {
            this.wasReversed = false;
        }

        if (localStorage.getItem('show')){
            this.show = localStorage.getItem('show');

        } else {
            this.show = 'all';
        }

        if (localStorage.getItem('filter')){
            this.filter = localStorage.getItem('filter');

        } else {
            this.filter = 'all';
        }

    },
    computed: {
        list: function () {
            if (this.listOrigin) {
                localStorage.setItem('sortkey', this.sortKey);
                localStorage.setItem('wasreversed', this.wasReversed);
                localStorage.setItem('show', this.show);
                localStorage.setItem('filter', this.filter);

                for (let i = 0; i < this.listOrigin.length; i++){
                    if (this.listOrigin[i].name.length > this.MAX_NAME_LENGTH){
                        this.listOrigin[i].name = this.listOrigin[i].name.slice(0, this.MAX_NAME_LENGTH);
                    }
                }
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
                if (this.wasReversed || !this.wasReversed) {
                    switch (this.sortKey) {
                        case 'Name':
                            if (!this.reverse[this.sortKey]) temp = temp.sort(this.compareByName);
                            else temp = temp.sort(this.compareByNameReversed);
                            break;
                        case 'Product number':
                            if (!this.reverse[this.sortKey]) temp = temp.sort(this.compareByNumber);
                            else temp = temp.sort(this.compareByNumberReversed);
                            break;
                        case 'Date':
                            if (!this.reverse[this.sortKey]) temp = temp.sort(this.compareByDate);
                            else temp = temp.sort(this.compareByDateReversed);
                            break;
                        case 'Category':
                            if (!this.reverse[this.sortKey]) temp = temp.sort(this.compareByCategory);
                            else temp = temp.sort(this.compareByCategoryReversed);
                            break;
                        case 'Quantity':
                            if (!this.reverse[this.sortKey]) temp = temp.sort(this.compareByQuantity);
                            else temp = temp.sort(this.compareByQuantityReversed);
                            break;
                        default:
                            return temp;
                    }
                }
                switch (this.show) {
                    case 'all':
                        this.pagesCount = 1;
                        break;
                    case 'five':
                        this.pagesCount = Math.ceil(temp.length / 5);
                        temp =  temp.slice(this.page * 5, (this.page + 1) * 5);
                        break;
                    case 'ten':
                        this.pagesCount = Math.ceil(temp.length / 10);
                        temp = temp.slice(this.page * 10, (this.page + 1) * 10);
                        break;
                    default:
                        break;
                }
                return temp;

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
        path: function (item) {
            return "product/" + item.id;
        },
        setSortKey: function (column) {
            if (this.sortKey == column) this.reverse[this.sortKey] = !this.reverse[this.sortKey];
            this.sortKey = column;
            this.wasReversed = !this.wasReversed;
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

            }, error => {
                console.log("error");
            });
        }
    }
});

const Product = Vue.component('product', {
    template: '#product',
    data: function () {
        return {
            tabIndex: null,
            data: false,
            imgPath: 'img/',
            reviewText: '',
            rating: 1,
            MAX_NAME_LENGTH: 250,
            MAX_DESCRIPTION_LENGTH: 4000
        }
    },
    computed:{
        product: function () {
            if (this.data){
                for (let i = 0; i < this.data.length; i++){
                    if (this.data[i].id == this.$route.params.id){
                        if (this.data[i].name.length > this.MAX_NAME_LENGTH){
                            this.data[i].name = this.data[i].name.slice(0, this.MAX_NAME_LENGTH);
                        }
                        if (this.data[i].description.length > this.MAX_DESCRIPTION_LENGTH){
                            this.data[i].description = this.data[i].description.slice(0, this.MAX_NAME_LENGTH);
                        }

                        return this.data[i];
                    }
                }
            }
        },
        imgSrc: function () {
            if (this.data && this.product){
                return this.imgPath + this.product.img;
            }
        },
        title: function () {
            if (this.data && this.product){
                return this.product.name.charAt(0).toUpperCase() + this.product.name.slice(1);
            }
        }
    },
    mounted: function () {
        this.load();
    },
    methods:{
        getRating: function (review) {
            return +review.rating;
        },
        load: function () {
            this.$http.get('api/extended.json').then(response => {

                this.data = response.body;

            }, error => {
                console.log("error");
            });
        },
        sendReview: function () {
            let review = {};
            review.text = this.reviewText;
            review.rating = this.rating;
            this.product.reviews.push(review);
        }
    }
});

const routes = [
    { path: '/product/:id', component: Product },
    { path: '/', component: Index }
];

const router = new VueRouter({
    routes
});

const app = new Vue({
    router
}).$mount('#app');