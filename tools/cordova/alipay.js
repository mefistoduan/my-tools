define(function(require) {
    var $ = require("jquery");
    var justep = require("$UI/system/lib/justep");

    //alipay插件
    require("cordova!com.justep.cordova.plugin.alipay");
});

//alipay支付
function cordova_alipay(seller,subject,body,price,orderID){

    var tradeNo = orderID;
    if (!navigator.alipay) {
        alert(-33);
        return;
    }
    var alipay = navigator.alipay;
    alipay.pay({
            "seller" : seller,    // 卖家支付宝账号或对应的支付宝唯一用户号
            "subject" : subject,  // 商品名称
            "body" : body,        // 商品详情
            "price" : price,      // 金额，单位为RMB
            "tradeNo" : tradeNo,  // 唯一订单号
            "timeout" : "30m",    // 超时设置
            "notifyUrl" : 'http://b.honghuoquan.com/sys2/pay/zhifubao/notify_chargeurl.php'      // 服务器通知路径
        },
        function(message) {
            var responseCode = parseInt(message);
            if (responseCode === 9000) {
                alert("支付成功");
            } else {
                alert("支付失败");
            }
        }, function(msg) {
            alert("支付失败");
        });
}