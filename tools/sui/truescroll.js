/**
 * Created by Administrator on 2017/6/3 0003.
 */
$(function(){
    $.init();
    writeDate();
})

//列表加载
function writeDate()
{
    var loading = false;    // 加载flag
    var maxItems = 200;     // 最多可加载的条目
    var itemsPerLoad = 5;  // 每次加载添加多少条目
    var lastIndex = 0;
    var row = '';
    var score  = '';
    var isrent = '';
    var lilength = '';
    var pagesize = 1;
    var url = $('#Query').data('url');

    addItems();    //预先加载记录

    function addItems() {
        if (loading)
            return;    // 如果正在加载，则退出
        loading = true;
        pagesize = $('#pagesize').val();
        var postdata = {
            itemsPerLoad:itemsPerLoad,
            items:pagesize
        };
        $('.infinite-scroll-preloader').show();
        $.post(url,postdata,function(result){
            var data = eval('('+result+')');
            var count = (data.data.length < itemsPerLoad) ? data.data.length : itemsPerLoad;
            // 生成新条目的HTML
            var html = '';
            for (var i = 0; i < count; i++) {
                row = data.data[i];
                score  = parseInt(data.data[i]['score']);
                html +=  '<li>' +
                    '<div class="appraise_title">' +data.data[i]['cmtid']+
                    '<a class="external now_appoint" bw_attr="shopid"  shopid='+row['shopid']+' >' +
                    '<img src="../../../sys2/tpl/res/images/mine_icon02.fw.png" alt="" class="icon_car">' +
                    '<em bw_name="deptname">' + row['deptname'] + '</em>' +
                    '<img src="../../../sys2/tpl/res/images/mine_icon01.fw.png" alt="" class="jump_to">' +
                    '</a>' +
                    '</div>' +
                    '<div class="appraise_text">' +
                    '<div class="tiem_info">' +
                    '<img src="../../../sys2/tpl/res/images/mine_icon.png" alt="" class="head_logo">' +
                    '<em class="username" bw_name="usercode">' + row['usercode'] + '</em>' +
                    '<span class="time">' + row['commenttime'] + '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="appraise_detail">' +
                    '<em>打分</em>' +
                    '<img src="../../../sys2/tpl/res/images/star'+score+'.png" bw_img="score" alt="" class="appraise_start">' +
                    '<p bw_name="comment">' + row['comment'] + '</p>' +
                    '<ul class="photo_list pb-standalone">' +
                    '<li><img src="" bw_src="'+row['picup']+'" >'+
                    '</ul>' +
                    '<div class="idea">' +
                    '<em>商家回复:</em>' +
                    '<i class="replytime" bw_name="replytime">' + row['replytime'] + '</i>' +
                    '<p bw_name="reply"></p>' +
                    '<input type="hidden" class="ccorderstate"  bw_attr="ccorderstate" ccorderstate="'+row['ccorderstate']+'">' +
                    '<input type="hidden" class="state"  bw_attr="state" state="'+row['state']+'" >' +
                    '<input type="hidden" class="todayRemain"  bw_attr="todayRemain" todayRemain="'+row['todayRemain']+'">' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            }
            $('.infinite-scroll-preloader').hide();
            // 添加新条目
            $('.infinite-scroll-bottom>ul').append(html);
            //页面渲染
            drawList(data);
            lilength = $('.infinite-scroll-bottom>ul>li').length;
            $('#pagesize').val(lilength/itemsPerLoad);
            if (data.length < itemsPerLoad) {
                if ((pagenum == 1) && (!(data.length > 0)))
                    $.toast("暂无记录");
                else
                    $.toast("无更多记录");
            }
            else {
            }
            loading = false;    //重置加载flag
        });
    }

    // 注册'infinite'事件处理函数
    $(document).on('infinite', function() {
        if (lastIndex >= maxItems) {
            $('.infinite-scroll-preloader').hide();
            $.toast("已到底部");
            return;
        }
        addItems();    // 添加新条目
        lastIndex =  $('.infinite-scroll-bottom>ul>li').length; // 更新最后加载的序号
        $.refreshScroller();    //容器发生改变,如果是js滚动，需要刷新滚动
    });
}