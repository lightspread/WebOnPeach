var pagecomponet = {
    template: '<div class="ui pagination menu">\n    ' +
    '  <a v-if="showPrevious() || currentPage <= 1" :class="{ \'disabled\' : currentPage <= 1 }" class="item" @click.prevent="changePage(1)">\n   ' +
    '     {{ config.firstText}}\n    ' +
    '  </a>\n     ' +
    ' <a v-if="currentPage > 1" @click.prevent="changePage(currentPage - 1)" class="item">\n    ' +
    '    {{ config.previousText }}\n     ' +
    ' </a>\n    ' +
    '  <a v-for="num in array" :class="{ \'active\': num === currentPage }" class="item" @click.prevent="changePage(num)">\n   ' +
    '     {{ num }}\n  ' +
    '    </a>\n    ' +
    ' <a v-if="currentPage < lastPage" @click.prevent="changePage(currentPage + 1)" class="item">\n   ' +
    '     {{ config.nextText }}\n   ' +
    '   </a>\n   ' +
    '  <a v-if="showNext() || currentPage === lastPage || lastPage === 0" :class="{ \'disabled\' : currentPage === lastPage || lastPage === 0 }" class="item" @click.prevent="changePage(lastPage)">\n  ' +
    '      {{ config.lastText}}\n   ' +
    '   </a>\n     ' +
    ' </div>',
    props: {
        total: {
            type: Number,
            required: true
        },
        pageSize: {
            type: Number,
            required: true
        },
        callback: {
            type: Function,
            required: true
        },
        options: {
            type: Object
        }
    },
    data: function data() {
        return { currentPage: 1 };
    },

    computed: {
        _total: function _total() {
            return this.total;
        },
        _pageSize: function _pageSize() {
            return this.pageSize;
        },
        lastPage: function lastPage() {
            var _total = this._total / this._pageSize;
            if (_total < 1) return 1;

            if (_total % 1 != 0) return parseInt(_total + 1);

            return _total;
        },
        array: function array() {

            var _from = this.currentPage - this.config.offset;
            if (_from < 1) _from = 1;

            var _to = _from + this.config.offset * 2;
            if (_to >= this.lastPage) _to = this.lastPage;

            var _arr = [];
            while (_from <= _to) {
                _arr.push(_from);
                _from++;
            }

            return _arr;
        },
        config: function config() {
            return Object.assign({
                offset: 2,
                previousText: '«',
                nextText: '»',
                firstText: "|<",
                lastText:">|",
                alwaysShowPrevNext: false
            }, this.options);
        }
    },
    methods: {
        showPrevious: function showPrevious() {
            return this.config.alwaysShowPrevNext || this.currentPage > 1;
        },
        showNext: function showNext() {
            return this.config.alwaysShowPrevNext || this.currentPage < this.lastPage;
        },
        changePage: function changePage(page) {
            if (this.currentPage === page) return;
            this.currentPage = page;
            this.callback(page);
        }
    }
};

var app4 = new Vue({
    el: '#app-4',
    data: {
        total: 5,
        pageSize: 3,
        items: [],
        fetchError:"",
        paginationOptions: { // Not required to pass this configurations
            offset: 2,
            previousText: JsLocale.getLocaleDatas().preTxt,
            nextText: JsLocale.getLocaleDatas().nextTxt,
            firstText: JsLocale.getLocaleDatas().firstTxt,
            lastText: JsLocale.getLocaleDatas().lastTxt,
            alwaysShowPrevNext: true
        }
    },
    components: { pagination: pagecomponet },
    created: function () {
        this.loadData(1)
    },
    methods: {
        pageChanged: function  (page) {
            console.log(page);
            this.loadData(page);
        },
        loadData : function (page) {
            var self = this;
            axios.get('/samples/list',{
                params: {
                    locale : JsLocale.getLocale(),
                    offset : self.pageSize * (page-1),
                    pagesize : self.pageSize
                }})
                .then(function (response) {
                    var repdata = response.data;
                    self.items = repdata.datas;
                    self.total = repdata.total;
                })
                .catch(function (error) {
                    self.fetchError = error;
                    //console.log(error)
                })
        }

    }
});