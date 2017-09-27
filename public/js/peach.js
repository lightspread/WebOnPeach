$(document).ready(function () {

	// Emojify
    //emojify.setConfig({
    //    img_dir: '/img/emoji'
    //});
    //emojify.run();

    // Highlight JS
    if (typeof hljs != 'undefined') {
        hljs.initHighlightingOnLoad();
    }

    // Set anchor.
    var headers = {};
    var skipped_first = false;
    $('.markdown').find('h1, h2, h3, h4, h5, h6').each(function () {
    	if (!skipped_first) {
    		skipped_first = true;
    		return
    	}
    	
        var node = $(this);
        var val = encodeURIComponent(node.text().toLowerCase().replace(/\s+/g, "-"));
        var name = val;
        if (headers[val] > 0) {
            name = val + '-' + headers[val];
        }
        if (headers[val] == undefined) {
            headers[val] = 1;
        } else {
            headers[val] += 1;
        }
        node = node.wrap('<div id="' + name + '" class="anchor-wrap" ></div>');
        node.append('<a class="anchor" href="#' + name + '"><span class="octicon octicon-link"></span></a>');
    });
});

var JsLocale = JsLocale || (function () {
    var local = "zh-CN";
    var localzh = local;

    var datach = {
        firstTxt:"首页",
        preTxt:"上一页",
        nextTxt:"下一页",
        lastTxt:"尾页"
    };
    var dataen = {
        firstTxt:"First Page",
        preTxt:"Rre Page",
        nextTxt:"Next Page",
        lastTxt:"Last Page"
    };

    var datas = datach;

    return {
       changeLocale : function(name) {

           if(name === localzh) {
               datas = datach;
           } else {
               datas = dataen;
           }
           local = name;
       },
       getLocale : function () {
           return local;
       },
       getLocaleDatas : function () {
           return datas;
       }
    }
}());