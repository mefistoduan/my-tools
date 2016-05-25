/**
 * Created by mefisto on 2016/2/23.
 */
$(function(){
    $(".reduce li>a").hover(function(){
        $(this).find("span").css('width','60px');
        $(this).closest("li").css('overflow','visible')
    },function(){
        $(this).find("span").css('width','0');
        $(this).closest("li").css('overflow','hidden');
w    })
});