new Vue({
    el: '#app',
    data: {
        list: false,
        sortKey: '№',
        search: '',
        reverse: {},
        columns: ['№', 'Product number', 'Date', 'Category', 'Name', 'Quantity'],
    },
    mounted: function () {
        this.load();
        this.initReverse();
    },
    methods: {
        sortBy: function(sortKey) {
            switch (sortKey){
                case 'Name':
                    if (!this.reverse[sortKey]) this.list.sort(this.compareByName);
                    else this.list.sort(this.compareByNameReversed);
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
        initReverse: function () {
            for (item in this.columns){
                this.reverse[this.columns[item]] = false;
            }
        },
        load: function () {

            this.$http.get('api/list.json').then(response => {

                this.list = response.body;

            }, error => {
                console.log("error");
            });
        }
    }
});