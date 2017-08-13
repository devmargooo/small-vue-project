new Vue({
    el: '#app',
    data: {
        list: false
    },
    mounted: function () {
        this.load();
    },
    methods: {
        load: function () {

            this.$http.get('api/list.json').then(response => {

                this.list = response.body;

            }, error => {
                console.log("error");
            });
        }
    }
});