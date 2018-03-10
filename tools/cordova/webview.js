define(function(require) {
    var $ = require("jquery");
    var justep = require("$UI/system/lib/justep");

    //webview
    require("cordova!cordova-plugin-inappbrowser");
});

//点击链接打开webview
function webview(url ,target, options) {
    //alert('webview:' + url);
    var ref = cordova.InAppBrowser.open(url, target, options);
}



/*   在调用页      */

$('body').on('click','.webview',function () {
    // 加载动画
    $.showPreloader();
    setTimeout(function () {
        $.hidePreloader();
    }, 2000);
    // 调用
    var title = $(this).attr('title');
    var iframe_url = $(this).attr('iframe_url');
    var thisTitle = $(this).attr('title');
    localStorage.setItem('title',title);
    localStorage.setItem('iframe_url',iframe_url);
    window.location.href = '/zhsh/?ctl=main&mod=main&act=webview';
});