define(function(require) {
    var $ = require("jquery");
    var justep = require("$UI/system/lib/justep");

//加载分享插件
    require("cordova!com.justep.cordova.plugin.weixin.v3");
});

function cordova_weixin(body,feeType,notifyUrl,totalFee,traceId,tradeNo){
    var notifyUrl = "http://b.honghuoquan.com/sys2/pay/weixin/notify_chargeurl.php";//支付成功通知地址
    var successCallback = function(message) {  //成功回调
        alert("[成功回调]" + JSON.stringify(message));
    };
    var failCallback = function(message) { //失败回调
        alert("[失败回调]" + JSON.stringify(message));
    };
    var cancelCallback = function(message) { //用户取消支付回调
        alert("[用户取消支付回调]" + JSON.stringify(message));
    };
    var weixin = navigator.weixin;
    weixin.generatePrepayId({ // 生成预支付id
        "body" : body,
        "feeType": "1", // 价格,单位分,
        "notifyUrl" : notifyUrl,
        "totalFee" : totalFee,
        "traceId": traceId,
        "tradeNo" : tradeNo
    }, function(prepayId) {
        weixin.sendPayReq(prepayId, function(message) {
            successCallback(message);
        }, function(message) {
            cancelCallback(message);
        });
    }, function(message) {
        failCallback(message);
    });
}