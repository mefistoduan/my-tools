/**
 * Created by Administrator on 2016/3/18.
 */
//common
//floating 滑动
$(function(){
    var screenHeight = $(document).height();
    $(".fore").each(function(i){
        $(this).click(function(){
            var iconThis = $(this);
            var iconAlt = $(this).find('img').attr('alt');
            if($(".i-mc_warp .i-mc").eq(i).is(":hidden")){
                $(".i-mc_warp .i-mc").eq(i).stop(true).fadeIn(50).animate({left:'80'},150);
                $(this).find(".i-mc").css('height',screenHeight+'px');
                    iconThis.siblings().click(function(){
                        //相邻按钮变灰
                        iconThis .find("h3 img").attr('src','images/'+iconAlt);
                    });
                $(".hide_mc").click(function(){
                    $(".i-mc").fadeOut(50).animate({left:'78'},150);
                    //iconThis.siblings().closest(".i-mc").fadeOut(50).animate({left:'78'},150);
                    iconThis .find("h3 img").attr('src','images/'+iconAlt);

                });
                iconThis .find("h3 img").attr('src','images/green/'+iconAlt);
            }
            else{
                $(this).closest(".mc").find(".fore").find("h3").css('background-color','#000000');
                $(".i-mc").stop(true).fadeOut(50).animate({left:'78'},150);
                iconThis .find("h3 img").attr('src','images/'+iconAlt);
            }
        });
    });
    return false;
});

//page part
//            hover效果
    $(".page .page_prv").hover(function(){
        $(this).find(".page_icon").removeClass("page_hover_l").addClass("page_hover_l");
    },function(){
        $(this).find(".page_icon").removeClass("page_hover_l");
    });
    $(".page .page_next").hover(function(){
        $(this).find(".page_icon").removeClass("page_hover_r").addClass("page_hover_r");
    },function(){
        $(this).find(".page_icon").removeClass("page_hover_r");
    });
//            获取当前页数
    $(".page input[name='page_content']").blur(function(){
        var pageNum = $(this).val();
        var NumType = parseInt(pageNum);
        if(typeof(NumType)==="number"){
            if(NumType=="NaN"){
//                        请输入正确的页码数
                console.log(NumType);

            }
            else {
//                        获取到了正确的页码
                console.log(NumType);
            }
        }
        else {
            console.log(NumType);
        }
    });
