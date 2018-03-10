define(function(require) {
    var $ = require("jquery");
    var justep = require("$UI/system/lib/justep");

    //加载获取定位信息插件
    require("cordova!cordova-plugin-geolocation");
});

//获取当前位置信息
function getCurPos(success, fail){
    navigator.geolocation.getCurrentPosition(success, fail, null);
}

/*   在调用页      */

function success(data){
    alert("经度:"+data.coords.longitude +"\n"
        +"纬度:"+data.coords.latitude +"\n"
        +"类型:"+data.coorType +"\n"
    );
}
function fail(msg){
    alert("错误消息："+msg);
}
if(isExitsFunction(top.getCurPos) == true){
    top.getCurPos(success, fail);
}