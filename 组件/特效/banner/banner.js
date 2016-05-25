/**
 * Created by Administrator on 2016/4/8.
 */
$(function(){
   var liNum = $(".banner_img li").length;
    var i;
    setInterval(function(){
       if(i<3){
           i++;
       }
        else{
           i=0;
           $(".banner_img li").show();
       }
        $(".banner_img li").eq(i-1).hide();
        $(".banner_img li").eq(i).show();
        $(".banner_item li").css('background-color','green');
        $(".banner_item li").eq(i).css('background-color','red');
    },1200);

});