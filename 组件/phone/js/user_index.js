/**
 * Created by mefisto on 2016/8/11.
 */
$(function(){
          $(".tabs_index li").each(function(i){
                $(this).click(function(){
                    $(".tabs_index li").removeClass("curr").eq(i).addClass("curr");
                        $(".list_container").hide().eq(i).show();
                        return false;  //防止a跳转；
                })
            })
});
