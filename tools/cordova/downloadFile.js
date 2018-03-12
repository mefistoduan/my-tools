define(function(require) {
    var $ = require("jquery");
    var justep = require("$UI/system/lib/justep");

    //	文件下载
    require("$UI/system/lib/cordova/cordova");
    require("cordova!cordova-open");
    require("cordova!cordova-plugin-file");
    require("cordova!cordova-plugin-file-transfer");

});

//文件下载
function downloadFile(uri) {
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(uri); //下载地址
    var filePath = 'file:///storage/emulated/0/Android/data/com.honghuoquan.b/files/logo.png';
    fileTransfer.download( //调用对象的下载方法，开始下载
        uri,
        filePath,
        function(entry) {
            alert('文件已保存至手机内存下../Android/data/com.honghuoquan.b/files文件夹中;');
        },
        function(error) {  //出错回调函数
            alert('权限不足，请在手机系统设置中将应用的文件读取权限打开;');

        },
        false,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );

//	    var open = cordova.plugins.disusered.open;
//	    function success() {
//	           console.log('it is open');
//	    }
//	    function error(code) {
//	    	console.log(code);
//	    }
//	    open(filePath, success, error);
};

/*   在调用页      */

// 下载海报
$('#download_btn').live('click',function () {
    var url = $(this).attr('imgsrc');
    top.downloadFile(url);
});