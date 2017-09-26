

var app4 = new Vue({
    el: '#app-4',
    data: {
        items: [],
        fetchError:""
    },
    created: function () {
        var self = this;
        return axios.get('/samples/list')
            .then(function (response) {
                self.items = response.data
            })
            .catch(function (error) {
                self.fetchError = error;
                console.log(error)
            })
    }
});