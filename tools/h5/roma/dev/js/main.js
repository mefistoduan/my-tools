/**
 * @author: mefisto
 * @description:
 * @Date: 2016/10/25 15:21
 */
$(function () {
    //全屏黑背景
    $(window).on("load resize",function(){
        var h=window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight;
        $("#galaxy").css("height",h);
    });


    function addStart(){
        var startItem = $('#start').append('<div class="start_item"></div>');

        start();

    }
    addStart();
    function start(){
        var y=parseInt(Math.random()*50)*10;
        var x=parseInt(Math.random()*80)*10;
    }

});