/**
 * Created by Administrator on 2016/10/3.
 */
$(function(){
    var start = {
        elem: '#start',
        format: 'YYYY/MM/DD ',
        max: '2099-06-16 ', //最大日期
        istime: true,
        istoday: false,
        choose: function(datas){
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas; //将结束日的初始值设定为开始日
        }
    };
    var end = {
        elem: '#end',
        format: 'YYYY/MM/DD ',
        min: laydate.now(),
        max: '2099-06-16',
        istime: true,
        istoday: false,
        choose: function(datas){
            start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };
    $('#start').click(function(){
        laydate(start);
    });
    $('#end').click(function(){
        laydate(end);
    });
});

function submitChecek(form) {
    var dataStart = $('#start').val();
    var dataEnd = $('#end').val();
    if(dataStart=="")
    {
        alert("请输入开始时间!");
        return false;
    };
    if(dataEnd=="")
    {
        alert("请输入结束时间!");
        return false;
    };
    return true;
}