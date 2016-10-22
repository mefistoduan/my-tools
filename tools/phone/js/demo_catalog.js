/**
 * Created by Administrator on 2016/7/23.
 */
$(function(){
    //tabs 切换

        $(".bull a").each(function(i){
            $(this).click(function(){
                $(".bull a").removeClass("curr").eq(i).addClass("curr");
                //$(".cnt").hide().eq(i).show();
            })
        });
    /****手机列表滑动****/
    var phoneScroll;
    function liresize(){
        var w = $(".plist").width();
        $(".bull").width(w);
        phoneScroll.refresh();
    }

    $(function(){
        /*初始化滚动条*/
        phoneScroll = new iScroll("plist",{
            snap: true,
            momentum: false,
            vScroll:false,
            hScroll:true,
            hScrollbar:false,
        });

        /*页面加载完毕后，需要启动的函数*/
        $(window).load(function(e) {
            liresize();
        });

        /*页面分辨率改变，需要启动的函数*/
        $(window).resize(function(e) {
            liresize();
        });

    });


});