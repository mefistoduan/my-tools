define(function(require) {
    var $ = require("jquery");
    var justep = require("$UI/system/lib/justep");

    var enMsgPull = 0;		//是否启用消息推送 0:否 1:是
    var msgPullItvTime = 120000;//消息推送轮询时间 单位:ms
    var msgPullUrl = '';

    //本地通知
    require("cordova!de.appplant.cordova.plugin.local-notification");
});

// 消息推送
pullMsg();

setTimeout(function(){
    pullMsg();
}, 5000);

//信息推送
function pullMsg() {
    if ((enMsgPull > 0) && (msgPullUrl != '') && (msgPullUrl != undefined)) {
	    $.post(msgPullUrl, {}, function(result){
	        if(result != ''){
	        	//alert(result);
	            var msgobj = eval('('+result+')');
                if(msgobj.id > 0){
                	notify(msgobj);
                }
	        }
	    });
    }
    setTimeout(function(){
    	pullMsg();
	}, msgPullItvTime);
}

//本地通知
function notify(msgObj) {
    cordova.plugins.notification.local.schedule(msgObj);
}


/*   在调用页      */

// 信息推送
function appNotify() {
    var url = '/zhsh/?ctl=ajax&mod=index&act=MsgPull';//获取
    $.post(url,{},function(result){
        if(result != ''){
            var msgobj = eval('('+result+')');
            var id = msgobj.id;
            //  console.log(msgobj);
            if(top.notify == undefined){
                console.log('err: appNotify is not working');
            }else{
                if(!id){
                    console.log('err:本条信息已经推送过了！');
                }else{
                    top.notify(msgobj);
                }
            }
        }
    });
}