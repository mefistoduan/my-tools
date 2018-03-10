define(function(require) {
    var $ = require("jquery");
    var justep = require("$UI/system/lib/justep");

    //加载扫码插件
    require("cordova!phonegap-plugin-barcodescanner");
});

//扫码
function scan(success, fail) {
    cordova.plugins.barcodeScanner.scan(success, fail);
};


/*   在调用页      */

// 调用扫码
$('#scan_btn').click(function () {
    function scanSuccess(result) {
        var text = result.text;
        if(text.length > 7){
            // 跳转惠民消费季核销
            window.location.href = '/?ctl=hmxfj&mod=hmxfj&act=order&TICKET=' + text;
        }else{
            // 正常核销
            window.location.href = '/?ctl=coupon&mod=coupon&act=code&scan=' + text;
        }
    }
    function scanFail(error) {
        $.alert("扫描失败：" + error);
    }
    top.scan(scanSuccess, scanFail);
});