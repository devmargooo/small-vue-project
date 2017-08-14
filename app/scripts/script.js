new Vue({
    el: '#app',
    data: {
        list: false,
        sortKey: '№',
        search: '',
        reverse: false,
        columns: ['№', 'Product number', 'Date', 'Category', 'Name', 'Quantity'],
    },
    mounted: function () {
        this.load();
    },
    methods: {
        sortBy: function(sortKey) {
            this.list.sort(this.compareByName);
        },
        compareByName: function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
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