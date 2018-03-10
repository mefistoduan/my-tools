define(function(require) {
    var $ = require("jquery");
    var justep = require("$UI/system/lib/justep");

    //加载版本检测
    var curversion = '';	//当前版本号
    require(['./appVersionChecker']);
});

//获取APP当前版本号
function getAppVersion() {
    return curversion;
}

//检测程序版本   1:有新版本  0:无新版本  -1:检查版本失败
function checkVersion() {
    require(['./appVersionChecker'], function (vc){
        vc.check();
    });
}


/*   在调用页      */

function checkSysVersion() {
    top.checkVersion();
    setTimeout("checkVerValue()", 1500);
}