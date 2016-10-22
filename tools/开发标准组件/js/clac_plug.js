/**
 * Created by mefisto on 2016/4/1.
 * function is clac js
 */
    //减号被点击，商品数量减1，并且根据判断改变加减号的样式
var update_goods_list_url="onecart.php";
var goods_key = "123456";//缓存方式
$(function(){

    var goods_list=[{"r_id":"184698","goods_id":"1261","goods_price":"40.00","goods_num":"464","goods_min":"1","goods_attr":"20150"}];



    function update_goods_list($this) {
        if ($this.hasClass('btn_add_disable') || $this.hasClass('btn_reduce_disable')) {
            return;
        }
        var r_id = $this.closest('tr').find(".goods_checked").val();
        var this_num=$this.closest(".calc_num").find("input[name=number]").val();
        this_num = parseInt(this_num) + 1;
        var good1;
        for(var k in goods_list) {
            good1 = goods_list[k];
            if (good1.r_id == r_id) {
                break;
            }
        }
        var goods_number = good1.goods_num;
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

$(".btn_reduce").click(goods_cut);
function goods_cut(){
    var $this = $(this);
    //通过循环获得good
    var good;
    var r_id = parseFloat($this.closest('tr').find(".goods_checked").val());
    //console.log(r_id);
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
    var goods_min = good.goods_min;
    var maxNum = good.goods_num;
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
    var goods_min = good.goods_min;
    var maxNum = good.goods_num;
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
    var r_id = $this.closest('tr').find(".goods_check").val();
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
    var maxNum = good.goods_num;
    var $nowNum = $this.val();
    if(/^\d+$/g.test( $nowNum)){
        if($nowNum<goods_min){
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
            if($nowNum>maxNum){
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
});