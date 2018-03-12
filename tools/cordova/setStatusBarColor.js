define(function(require) {
    var $ = require("jquery");
    var justep = require("$UI/system/lib/justep");
});

//设置顶部状态栏背景色 "#E1363A"
function setStatusBarColor(color){
    StatusBar.backgroundColorByHexString(color);
}

// 在config.xml里面配置如下：

<feature name="StatusBar">
    <param name="ios-package" onload="true" value="CDVStatusBar"/>
</feature>

/*   在调用页      */

    // 调用顶部状态栏颜色
    function thisSetStatusBarColor() {
        var color = $('header').css('background-color');
        var specil = getQueryString('act');
        console.log(color);
        if(specil == 'mine'){
            color = '#000';
        }
        if(specil == 'login'){
            color = '#810012';
        }
        if(color == 'rgb(225, 54, 58)'){
            color = '#E1363A';
        }
        if(color == 'rgb(250, 250, 250)'){
            color = '#fff';
        }
        if(color == 'rgb(255, 255, 255)'){
            color = '#fff';
        }
        if (typeof(top.setStatusBarColor) != "undefined") {
            top.setStatusBarColor(color);
        }
    }


// ps
//     具体请参考ngcordova官网，http://ngcordova.com/docs/plugins/statusbar/
//     和https://github.com/apache/cordova-plugin-statusbar上的资料