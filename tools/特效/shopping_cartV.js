/**
 * Created by duan on 2016/3/21.
 */
$(document).ready(function(){
    function update_goods_list($this) {
        if ($this.hasClass('btn_add_disable') || $this.hasClass('btn_reduce_disable')) {
            return;
        }
        var r_id = $this.closest('tr').find(".goods_checked").val();
        var this_num=$this.closest(".calc_num").find("input[name=number]").val();
        if($this.hasClass('btn_reduce')){
            this_num = parseInt(this_num) - 1;
        }
        if($this.hasClass('btn_add')){
            this_num = parseInt(this_num) + 1;
        }
        var good1;
        for(var k in goods_list) {
            good1 = goods_list[k];
            if (good1.r_id == r_id) {
                break;
            }
        }
        var goods_number = good1.goods_num;
       // console.log(goods_number);
        $.ajax({
            url: update_goods_list_url,
            type: 'POST',
            data: {"key":goods_key,"id":r_id,"this_num":this_num,"goods_number":goods_number},
            async: false,
            success: function(e){
                if(e.indexOf("{")<0){                   
                return false;
                }
                e = $.parseJSON(e);
                if (e.goods_key){
                    goods_key= e.goods_key;
                }
                if(e.goods_num){
                    for(var k in goods_list) {
                        var good = goods_list[k];
                        if (good.r_id == e.r_id) {
                            good.goods_id = e.goods_id;
                            good.goods_price = e.goods_price;
                            good.goods_buy = e.goods_buy;
                            good.goods_num = e.goods_num;
                            good.goods_min = e.goods_min;
                            good.goods_attr = e.goods_attr;
                            goods_list[k] = good;
                        }
                    }
                }
            }
        });
        return true;
    }
// 2016-04-22 数量为最小购买单位时，添加减少的禁用状态
    function disablecut() {
        $(".calc_num").each(function () {
            var $this = $(this);
            //通过循环获得good
            var good;
            var r_id = parseFloat($this.closest('tr').find(".goods_checked").val());
            for(var k in goods_list) {
                good = goods_list[k];
                if (good.r_id == r_id) {
                    break;
                }
            }
            var goods_min = parseFloat(good.goods_min) ;
            var maxNum =  parseFloat(good.goods_num);
            var this_num=$(this).closest(".calc_num").find("input[name=number]").val();
            var Num = parseInt(this_num);
            if(Num>goods_min){
                Num=Num-1;
            }
            reset_style_of_add_or_reduce_btn($this, goods_min, maxNum);
            if(this_num<=goods_min){
                $this.find(".btn_reduce").addClass("btn_reduce_disable");
            }
        })
    }
    disablecut();
    //减号被点击，商品数量减1，并且根据判断改变加减号的样式
    $(".btn_reduce").click(goods_cut);
    function goods_cut(){
        var $this = $(this);
        //通过循环获得good
        var good;
        var r_id = parseFloat($this.closest('tr').find(".goods_checked").val());
       if(! update_goods_list($this)){
            var d = dialog({
                    skin: 'calc_dialog',
                    content:  '暂不能使用！',
                    quickClose: true
                });
                d.show();
                return ;
       }
        for(var k in goods_list) {
            good = goods_list[k];
            if (good.r_id == r_id) {
                break;
            }
        }
        var goods_min = parseFloat(good.goods_min) ;
        var maxNum =  parseFloat(good.goods_num);
        var this_num=$(this).closest(".calc_num").find("input[name=number]").val();
        var Num = parseInt(this_num);
        if(Num>goods_min){
            Num=Num-1;
            $(this).closest(".calc_num").find(".text").val(Num);
        }
        reset_style_of_add_or_reduce_btn($this, goods_min, maxNum);
    }

    //加号被点击，商品数量加1，并且根据判断改变加减号的样式
    $(".btn_add").click(goods_add);
    function goods_add(){
        var $this = $(this);
        //通过循环获得good
        var good;
        var r_id = $this.closest('tr').find(".goods_checked").val();
        if(! update_goods_list($this)){
            var d = dialog({
                    skin: 'calc_dialog',
                    content:  '系统繁忙，请稍后重试！',
                    quickClose: true
                });
                d.show();
                return ;
       }
        for(var k in goods_list) {
            good = goods_list[k];
            if (good.r_id == r_id) {
                break;
            }
        }
        var goods_min = parseFloat(good.goods_min);
        var maxNum =  parseFloat(good.goods_num);
        var this_num=$(this).closest(".calc_num").find("input[name=number]").val();
        var Num = parseInt(this_num);
        if(Num >= maxNum) {
                  var d = dialog({
                    skin: 'calc_dialog',
                    content:  '已达到最高购买量',
                    quickClose: true
                });
                d.show();
            return;
        }
        if(Num>0){
            Num=Num+1;
            $(this).closest(".calc_num").find(".text").val(Num);
        }
        reset_style_of_add_or_reduce_btn($this, goods_min, maxNum);
    }
    $(".btn_reduce").hover(function(){
        $(this).addClass('btn_reduce_hover');
    },function(){
        $(this).removeClass('btn_reduce_hover');
    });
    $(".btn_add").hover(function(){
        $(this).addClass('btn_add_hover');
    },function(){
        $(this).removeClass('btn_add_hover');
    });
    $(".calc_num input[name=number]").blur(function(){
        var $this = $(this);
        //通过循环获得good
        var good;
        var r_id = $this.closest('tr').find(".goods_checked").val();
        if(! update_goods_list($this)){
            var d = dialog({
                    skin: 'calc_dialog',
                    content:  '系统繁忙，请稍后重试！',
                    quickClose: true
                });
                d.show();
                return ;
       }
        for(var k in goods_list) {
            good = goods_list[k];
            if (good.r_id == r_id) {
                break;
            }
        }
        var goods_min = good.goods_min;
        var maxNum = parseFloat(good.goods_num);
        var Num = parseFloat($this.val());
        if(/^\d+$/g.test( Num)){
            if(Num<goods_min){
                var d = dialog({
                    skin: 'calc_dialog',
                    content:  '低于最低购买量',
                    quickClose: true
                });
                d.show();
                $(".ui-popup-backdrop").click(function(){
                    d.close().remove();
                });
                $this.closest(".calc_num").find(".text").val(goods_min);
            }else{
                if(Num >= maxNum){
                    var d = dialog({
                        skin: 'calc_dialog',
                        content:  '已达到最高购买量',
                        quickClose: true
                    });
                    d.show();
                    $this.closest(".calc_num").find(".text").val(maxNum);
                    $(".ui-popup-backdrop").click(function(){
                        d.close().remove();
                    });
                }
            }
        } else {
            var d = dialog({
                skin: 'calc_dialog',
                content:  '请输入数字',
                quickClose: true
            });
            d.show();
            $this.closest(".calc_num").find(".text").val(goods_min);
        }
        reset_style_of_add_or_reduce_btn($this, goods_min, maxNum);
    });

    //根据数量重新设置加号和减号的样式
    function reset_style_of_add_or_reduce_btn($this, $min, $max) {
        $this.closest('.calc_num').find('.btn_reduce').removeClass('btn_reduce_disable');
        $this.closest('.calc_num').find('.btn_add').removeClass('btn_add_disable');
        var result_num = $this.closest(".calc_num").find(".text").val();
        if (parseInt(result_num) <= parseInt($min)) {
            $this.closest('.calc_num').find('.btn_reduce').addClass('btn_reduce_disable');
        }
        if(parseInt(result_num) >= parseInt($max)) {
            $this.closest('.calc_num').find('.btn_add').addClass('btn_add_disable');
        }
    }

    //底部滑动
    var flag = "left";
    function DY_scroll(wraper,prev,next,img,speed,or){
        var wraper = $(wraper);
        var prev = $(prev);
        var next = $(next);
        var img = $(img);
        //var w = img.outerWidth(true);
        var w = 220;
        var s = speed;
        next.click(function(){
            img.animate({'margin-left':-w},function(){
                img.find('li').eq(0).appendTo(img);
                img.css({'margin-left':0});
            });
            flag = "left";
        });
        prev.click(function(){
            img.find('li:last').prependTo(img);
            img.css({'margin-left':-w});
            img.animate({'margin-left':0});
            flag = "right";
        });
        if (or == true){
            ad = setInterval(function() { flag == "left" ? next.click() : prev.click()},s*1000);
            wraper.hover(function(){clearInterval(ad);},function(){ad = setInterval(function() {flag == "left" ? next.click() : prev.click()},s*1000);});
        }
    }
    DY_scroll('.bottom_buy .tabs_content','.tab_left_btn','.tab_right_btn','.bottom_buy .content_warp ',1,false);
// true为自动播放，不加此参数或false就默认不自动

    // bottom_buy 切换
    $(".bottom_buy .tab_control li").each(function(i){
        $(this).find('a').click(function(){
            $('.bottom_buy .tab_control li a').removeClass('selected').eq(i).addClass('selected');
            $('.bottom_buy .tabs_content ').fadeOut().eq(i).fadeIn();
        })
    });

    //calc计算单个商品的总价
    $(".btn_add ").click(function(){
        itemNum = $(this).closest(".calc_num").find(".text").val();
        itemPrice = $(this).closest("tr").find(".goods_price span").text();
        mulSum = mul(itemNum,itemPrice).toFixed(2);
        $(this).closest("tr").find(".item_sum span").html(mulSum);
        displayCalcSum();
    });
    $(".btn_reduce ").click(function(){
        itemNum = $(this).closest(".calc_num").find(".text").val();
        itemPrice = $(this).closest("tr").find(".goods_price span").text();
        mulSum = mul(itemNum,itemPrice).toFixed(2);
        $(this).closest("tr").find(".item_sum span").html(mulSum);
        displayCalcSum();
    });
    $(".calc_num input[name=number]").blur(function() {
        itemNum = $(this).closest(".calc_num").find(".text").val();
        itemPrice = $(this).closest("tr").find(".goods_price span").text();
        mulSum = mul(itemNum,itemPrice).toFixed(2);
        $(this).closest("tr").find(".item_sum span").html(mulSum);
        displayCalcSum();
    });

    //选中背景变色
        $(".item_select").click(function(){
         // changecolor(this);
         autoColor();
        });

    //
    function changecolor(o){
       // this=o;
    
          if ( $(o).prop( "checked" )){
                $(o).closest("tr").find("td").css('background-color','#F5FEF8');
                displayCalcSum();

            }else { 
                $(o).closest("tr").find("td").removeAttr("style");
                $(o).closest("tr").find("td").css('background-color','#ffffff');
                //console.log($(o).closest("tr").find("td"));
               displayCalcSum();
            }
    }
    //打开页面后自动渲染背景
function autoColor(){
      //  $("tr").find("td").css('background-color', '#F5FEF8');
      //  $(".table_title").find("tr").find("td").css('background-color', '#fff');
     $('.items_check:checkbox').each(function(i,o){  
         if ( $(o).prop( "checked" )){
                $(o).closest("tr").find("td").css('background-color','#F5FEF8');
                displayCalcSum();

            }else { 
                $(o).closest("tr").find("td").removeAttr("style");
                $(o).closest("tr").find("td").css('background-color','#ffffff');
                //console.log($(o).closest("tr").find("td"));
               displayCalcSum();
            }
         
     })

    }
    autoColor();

    //全选
    $(".all_choice").click(function() {
        $('.items_check:checkbox').attr("checked", this.checked );
        $('.items_check:checkbox').each(function(i,v){
            if( $(this).attr("checked")){
                changecolor(this)
            }
        })
         $("tr").find("td").css('background-color', '#F5FEF8');
        autoColor();
        displayCalcSum();
    });
    //取消全选
    $('.items_check:checkbox').click(function(){
        $('.all_choice:checkbox').attr("checked", this.checked );
         $("tr").find("td").css('background-color', '#fff');
        autoColor();
        displayCalcSum();
    });
    //美鲜自营全选
    $(".meixian_all").click(function() {
        $('.meixian_check:checkbox').attr("checked", this.checked );
        $('.meixian_check:checkbox').each(function(i,v){
            if( $(this).attr("checked")){
                changecolor(this)
            }
        })
        $("tr").find("td").css('background-color', '#F5FEF8');
        autoColor();
        displayCalcSum();
    });
    //取消自营全选
    $('.meixian_check:checkbox').click(function(){
        $('.meixian_all:checkbox').attr("checked", this.checked );
        $("tr").find("td").css('background-color', '#fff');
        autoColor();
        displayCalcSum();
    });
    //济南全选
    $(".list_title_info .jinan_list").click(function() {
        $('.jinan_list:checkbox').attr("checked", this.checked );
        autoColor();
        displayCalcSum();
    });
    //取消济南全选
    $('.jinan_list:checkbox').click(function(){
        $('.list_title_info .jinan_list:checkbox').attr("checked", this.checked );
        autoColor();
        displayCalcSum();
    })
    //青岛全选
    $(".list_title_info .qingdao_list").click(function() {
        $('.qingdao_list:checkbox').attr("checked", this.checked );
        autoColor();
        displayCalcSum();
    });
    //取消青岛全选
    $('.qingdao_list:checkbox').click(function(){
        $('.list_title_info .qingdao_list:checkbox').attr("checked", this.checked );
        autoColor();
        displayCalcSum();
    });
    //店铺全选(只选本店）
    $(".list_title_info .shop_list").click(function() {
        $(this).closest(".shop_part_warp").find('.shop_list:checkbox').attr("checked", this.checked );
        autoColor();
        displayCalcSum();
    });
    //取消本店铺全选
    $('.shop_list:checkbox').click(function(){
        $(this).closest(".shop_part_warp").find('.list_title_info .shop_list:checkbox').attr("checked", this.checked );
        autoColor();
        displayCalcSum();
    })
});


//自动计算美鲜自营总价
function meixianSelfSum(){



}
meixianSelfSum ();
//计算价格自动遍历
function displayCalcSum(){
    var sumMeixian = 0;
    var sumMXToFixed = 0;
    var meixianSum = 0;
    var meixianSumToFix = 0;
    var shopSum = 0;
    var shopSumToFix = 0;
    var checkGoodsNum = 0;
    var CheckCountSample = 0;
    var CheckCount = 0;
    var sumItemGoodsPrice = 0;
    var sumToFix = 0;
    var sumShop = 0;
    var shopToFix = 0;
//遍历样品
    $('.sample_item:checkbox:checked').each(function(){
        if($(this).attr("checked")){
            CheckCountSample += parseFloat($(this).closest("tr").find(".sample_num").text());
        }
    });
    //美鲜自营
    $('.meixian_check:checkbox:checked').each(function(){
        if($(this).attr("checked")){
            if($(this).closest("tr").find(".item_sum span").text()!=0){
                sumMeixian += parseFloat($(this).closest("tr").find(".item_sum span").text());
                sumMXToFixed = parseFloat(sumMeixian).toFixed(2);
            }
        }
    });

 //店铺自营
    $('.shop_list:checkbox:checked').each(function(){
        if($(this).attr("checked")){
            $this = $(this);
            $thisParents = $this.closest(".shop_part_warp");
            if($(this).closest("tr").find(".item_sum span").text()!=0){
                sumShop += parseFloat($(this).closest("tr").find(".item_sum span").text());
                shopToFix = parseFloat(sumShop).toFixed(2);
            }
        }
        $thisParents.find(".span_sum").html(shopToFix);
    });
    //遍历所有商品
    $('.goods_checked:checkbox:checked').each(function(){
        if($(this).attr("checked")){
            CheckCount += parseFloat($(this).closest("tr").find(".text").val());
            sumItemGoodsPrice += parseFloat($(this).closest("tr").find(".item_sum span").text());
            sumToFix = parseFloat(sumItemGoodsPrice).toFixed(2);
        }
    });

    $("#go_cash05 .span_sum span").html(sumToFix);//所有商品价格
    $("#go_cash04 .span_sum").html(CheckCount);//所有商品数量
    $("#go_cash04 .cut_sum").html(CheckCountSample); //样品
    $("#MXSS").html(sumMXToFixed);//美鲜自营总价

}
//默认加载一次
displayCalcSum();
//checkbox点击加载计算
$(".btn_add").click(function(){
    //displayCalcSum()
});
$(".btn_reduce").click(function(){
    //displayCalcSum();
});
$("input").blur(function(){
    //displayCalcSum();
});
$(".icon_select ").click(function(){
    //displayCalcSum();
})

//海哥写的关于删除和加入收藏夹部分
$(".add_fav").click(function(){
    s_index=$(this).closest("tr").index();
    id=goods_list[s_index].goods_id;
    r_id=goods_list[s_index].r_id;
    o=this;
    //  console.log(id);
    $.post("cart.php?step=add_to_collect",{"id":id},function(e){
        h=e=="0"?"加入失败，稍后重试！":'成功加入收藏夹!';
        var d = dialog({
            // skin: 'calc_dialog',
            content:  h,
            //padding:5,
            align:"right",
            quickClose: true
        });
        d.show(o);
    })

})

$(".add_fav_all").click(function(){

    var str ='';
    var id='';
    $('.goods_checked:checkbox:checked').each(function(){
        if($(this).attr("checked")){
            s_index =$(this).closest("tr").index();
            id +=goods_list[s_index].goods_id+",";
        }});

    o=this;

    $.post("cart.php?step=add_to_collect",{"id":id},function(e){
        h=e=="0"?"加入失败，稍后重试！":'成功加入收藏夹!';
        var d = dialog({
             skin: 'add_dialog',
            content:  h,
            //padding:5,
            align:"right",
            quickClose: true
        });
        d.show(o);
    })

});

$('span.btn_delete').click(function () {
    var $this = $(this);
    var rec_id = $this.closest('tr').find(".goods_checked").val();
    var d_out = dialog({
        content: '您确定要删除该商品？',
        okValue: '确定',
        ok: function () {
            $.ajax({
                url: 'cart.php?delete_cart_goods',
                type: 'POST',
                data: {step:'delete_cart_goods', rec_id:rec_id},
                dataType: "json",
                error: function(handler) {
                    var d_in = dialog({
                        skin: 'add_dialog',
                        content:  '删除失败，请重试！',
                        quickClose: true
                    });
                    d_in.show();
                },
                success: function(result) {
                    if(!result.error){
                        var d_in = dialog({
                            skin: 'add_dialog',
                            content:  '删除成功！',
                            quickClose: true
                        });
                        d_in.show();
                        $this.closest('tr').remove();
                    }else{
                        var d_in = dialog({
                            skin: 'add_dialog',
                            content:  '删除失败，请重试！',
                            quickClose: true
                        });
                        d_in.show();

                    }

                }
            });
        },
        cancelValue: '取消',
        cancel: function () {}
    });
    d_out.show();
});
//删除选中的商品
$('.delete_goods_all').click(function () {
    console.log(111);
    var $this = $(this);
    var str = '';
    // var rec_id ='';
    //alert($this.closest('tr').find("input[name=items]").val());
    $("input[name='rec_id[]']:checked").each(function(){

        var rec_id = $(this).val();

        if(!isNaN(rec_id)){

            str += rec_id+',';
        }

    });
    var d_out = dialog({
        content: '您确定要删除该商品？',
        okValue: '确定',
        ok: function () {
            $.ajax({
                url: 'cart.php?step=delete_all_goods',
                type: 'POST',
                data: {step:'delete_all_goods', rec_id:str},
                dataType: "json",
                error: function(handler) {
                    var d_in = dialog({
                        skin: 'add_dialog',
                        content:  '删除失败，请重试！',
                        quickClose: true
                    });
                    d_in.show();
                },
                success: function(result) {
                    if(!result.error){
                        var d_in = dialog({
                            skin: 'add_dialog',
                            content:  '删除成功！',
                            quickClose: true
                        });
                        d_in.show();
                        $('input[name=rec_id[]]:checked').each(function () {
                            var $this = $(this);
                            $this.closest('tr').remove();
                        });
                    }else{
                        var d_in = dialog({
                            skin: 'add_dialog',
                            content:  '删除失败，请重试！',
                            quickClose: true
                        });
                        d_in.show();
                    }
                }
            });
        },
        cancelValue: '取消',
        cancel: function () {}
    });
    d_out.show();
});
//提交的时候去检测是否登录，没有登录先弹出登录
$("#submit_login").click(function(){
    var d = dialog({
        title: ' ',
        skin:'nopadding',

        url:'cart.php?step=login',width:'400', height:'400'
    });
    d.show();
});
//弹出小购车
$(".add_cart_btn2").click(function(){

    var id = $(this).attr("jsstr");
    var d = dialog({
        title: ' ',
        skin:'nopadding',
        url:'cart.php?step=add_flow_cart&id='+id,width:'400', height:'300'
    });

    d.show();
});
//提交购物车去结算

function check_step(){
    var str ='';
    $("input[name='rec_id[]']:checked").each(function(){

        var rec_id = $(this).val();
        
        if(!isNaN(rec_id)){

            str += rec_id+',';
        }
    });
    //console.log(str);
    if(str!==''){
        document.getElementById("form_check").submit();

    }else{
        window.location.reload();
    }
};
//当鼠标移到这个图片上面显示红包层
$(".icon_coupon").hover(function(){
    $(".coupon_list").css('display','block');
},function(){
    $(".coupon_list").css('display','none');
});
//领取成功
$(".coupon_state").click(function(){
    $this = $(this);
   // thisCouponId = '你自己定义吧，我就不管了~'
    var bonus_id = $(this).find(".coupon_state").attr("jsstr");
    $.ajax({
        type:"POST",
        url: "cart.php?step=get_bonus", // <= Providing the URL
        data: {id:bonus_id}, // <= Providing the form data, serialized above
        success: function(result){
            eval("r="+result);
            if(r.error){
                var d = dialog({
                    //title:'提示',
                    content: '领取失败',
                    okValue: '确定',
                    skin:"coupon_style",
                    ok: function () {
                        d.remove();
                        return false;
                    }
                });
                d.show();
            }else{
                $this .find('.coupon_state').html("已领取").css('color','#1eaa39').css('border','none');
            }


        }

   });
});
//.go_cash 浮动
$(function(){
        var banner2height = $(".list_title").offset().top;
        var position_go_cash_height = $(".position_go_cash").offset().top;
        $(window).scroll(function(){
            var this_scrollTop = $(this).scrollTop();
            if(this_scrollTop>banner2height ){
                $(".go_cash_warp").addClass('float_go_cash');
                if(this_scrollTop>position_go_cash_height ){
                    $(".go_cash_warp").removeClass('float_go_cash');
                }
                else {
                    $(".go_cash_warp").addClass('float_go_cash');
                }
            }
            else{
                $(".go_cash_warp").removeClass('float_go_cash');
            }
        });
});
