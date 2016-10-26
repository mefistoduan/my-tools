/**
 * @author: mefisto
 * @description:
 * @Date: 2016/10/26 16:12
 */

var events = require('events');

var emitter = new events.EventEmitter();


emitter.on('someEvent1',function(arg1,arg2){
    console.log('listener1',arg1, arg2);
});

emitter.on('someEvent2',function(arg1,arg2){
    console.log('listener1',arg1, arg2);
});

emitter.emit('someEvent1','byoid',1991);

//引入库以后，使用方法就是在第一参数里设置方法名称，
// 回调里设置函数，引用的时候调用emit的方法，
// 按照顺序载入方法名，参数1，参数2