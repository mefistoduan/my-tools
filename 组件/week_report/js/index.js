/**
 * Created by Administrator on 2016/9/27.
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

    $('.reborn_btn').click(function(){
        var start = $('#start').val();
        var end = $('#end').val();
        var startdata = start.slice('');
        var enddata = end.slice('');
        var startMonth1 = startdata[5];//十位
        var startMonth2 = startdata[6];//个位
        var endMonth1 = enddata[5];//十位
        var endMonth2 = enddata[6];//个位

        var startday1 = startdata[8];//十位
        var startday2 = startdata[9];//十位
        var endday1 = enddata[8];//十位
        var endday2 = enddata[9];//十位

        var dayStart = parseInt(startday1+startday2);//开始日
        var dayEnd = parseInt(endday1+endday2);//结束日

        var dataInter = '';

        var bigMonth =  parseInt(startMonth1+startMonth2);
        var bigM = '';
        //判断大月和小月
        bigMonth=='1'?bigM=true: bigMonth=='3'?bigM=true:bigMonth=='5'?bigM=true:bigMonth=='7'?bigM=true:bigMonth=='8'?bigM=true:bigMonth=='10'?bigM=true:bigMonth=='2'?bigM=null:bigM=false;

        //同月份
        if(startMonth1==endMonth1&&startMonth2==endMonth2){
             dataInter = dayEnd-dayStart;
        }
        //不同月份
        else {

            //大月
            if(bigM==true){
                dataInter = 31-dayStart+dayEnd
            }

            //小月
            if(bigM==false){
                dataInter = 30-dayStart+dayEnd
            }

            //非润月
            if(bigM==null){
                dataInter = 28-dayStart+dayEnd
            }

        }

        //间隔多少天
        console.log(dataInter);
    });
});