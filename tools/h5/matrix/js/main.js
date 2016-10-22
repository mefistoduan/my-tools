/**
 * Created by mefsito on 2016/10/10.
 */
$(function(){
    $('.layer1').hide();
    $('.layer2').hide();
    $('.error').hide();
    var video = document.getElementById("video");
    video.style.display = "block";

    //宽屏时才能播放
    var W = $(window).width();
    var H = $(window).height();
    if(H>W){
        $('#video').hide();
        $('.error').show();
        video.pause();
    } else{
        video.play();
    }
    //video结束
    video.onended = function() {
        $('#video').fadeOut(200);
        $('.layer1').fadeIn(200);
        rain();
        title();
    };

    function rain(){
        var s = window.screen;
        var width = q.width = s.width;
        var height = q.height = s.height;
        var letters = Array(256).join(1).split('');
        var draw = function () {
            q.getContext('2d').fillStyle='rgba(0,0,0,.05)';
            q.getContext('2d').fillRect(0,0,width,height);
            q.getContext('2d').fillStyle='#0F0';
            q.getContext('2d').font="0.6em verdana";
            letters.map(function(y_pos, index){
                text = String.fromCharCode(34+Math.random()*33);
                x_pos = index * 10;
                q.getContext('2d').fillText(text, x_pos, y_pos);
                letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
                q.getContext('2d').fillStyle='#'+letters[index];
            });
        };
        setInterval(draw, 33);
    };
    function title(){
        var draw = function () {
            $('.layer2').fadeIn(600);
        };
        function closeFont(){
            $('.layer2 h1 em').each(function(i){
                $(this).eq(0).animate({right:'250px'},800);
                $(this).eq(1).animate({right:'250px'},1000);
                $(this).eq(2).animate({right:'250px'},1200);
                $(this).eq(3).animate({left:'250px'},1200);
                $(this).eq(4).animate({left:'250px'},1000);
                $(this).eq(5).animate({left:'250px'},800);
            });
        }
        setTimeout(draw,800);
        setTimeout(closeFont,1800);
    }

});