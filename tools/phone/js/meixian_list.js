$(function(){
   //滚轮事件
    new IScroll("#category8", {
        mouseWheel: true,
        click: true
    });
    //切换事件
    <!--JS获取ajax信息部分-->
        $("#category7 li").each(function(i){
            $(this).click(function(){
                $("#category7 li").removeClass("cur").eq(i).addClass("cur");
                var pageNum = i ;
                var content ='';
                $.ajax({
                    url:'xxx.php',
                    data:pageNum,
                    success: function(result){
                        content=
                        $('.mx_category_div.cur').html(result);
                    }
                })
            })
        })

});