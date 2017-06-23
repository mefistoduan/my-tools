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
            if(data.data.length == 0 && $('.toast').length < 1){
                $.toast("暂无更多记录");
                $('.infinite-scroll-preloader').hide();
                return false
            }
            var count = (data.data.length < itemsPerLoad) ? data.data.length : itemsPerLoad;
            // 生成新条目的HTML
            var html = '';
            for (var i = 0; i < count; i++) {
                row = data.data[i];
                score  = parseInt(data.data[i]['score']);
                html +=  '<li>' + i +'</li>';
            }
            $('.infinite-scroll-preloader').hide();
            // 添加新条目
            $('.infinite-scroll-bottom>ul').append(html);
            //页面渲染
            drawList(data);
            lilength = $('.infinite-scroll-bottom>ul>li').length;
            $('#pagesize').val(lilength/itemsPerLoad);
            if (data.length < itemsPerLoad) {
                if (data.data.length == 0 && $('.toast').length < 1){
                    $.toast("暂无更多记录");
                    $('.infinite-scroll-preloader').hide();
                }
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