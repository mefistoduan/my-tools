/**
 * Created by caojiangtao on 15/2/28.
 */


var car ={
    init:function(){
        this.error();
        car.leftClick();
    },
    touchPint:{
        _X:0,
        _X2:0
    },
    total:0,
    music:0,
    error:function(){
        var video = document.getElementById("video");
        video.style.display = "block";
        var W = $(window).width();
        var H = $(window).height();
        if(H>W){
            $('.black-layer2').show();
            $('.black-layer2').show();
            $('.error2').show();
            video.pause();
        } else{
            video.play();
            car.vodeOver();
        }

        var audio = document.getElementById("audio");
        function orientationChange(){
            switch(window.orientation) {
                case 0: // Portrait
                    $('.black-layer2').show();
                    $('.error2').show();
                    var audio = document.getElementById("audio");
                    audio.pause();
                    var video = document.getElementById("video");
                    video.style.display = "none";
                    video.pause();
                    break;
                case 180: // Upside-down Portrait
                    $('.black-layer2').show();
                    $('.error2').show();
                    audio.pause();
                    var video = document.getElementById("video");
                    video.style.display = "none";
                    video.pause();;
                    break;
                case -90: // Landscape: turned 90 degrees counter-clockwise
                    $('.black-layer2').hide();
                    $('.error2').hide();
                    if(car.total==0 && $('.first-img').is(":hidden")){
                        var video = document.getElementById("video");
                        video.src="images/00.mp4";
                        video.style.display = "block";
                        video.play();
                        var audio = document.getElementById("audio");
                        audio.pause();
                        car.vodeOver();
                    } else{
                        var audio = document.getElementById("audio");
                        audio.play();
                    }
                    break;
                case 90: // Landscape: turned 90 degrees clockwise
                    $('.black-layer2').hide();
                    $('.error2').hide();
                    if(car.total==0 && $('.first-img').is(":hidden")){
                        var video = document.getElementById("video");
                        video.src="images/00.mp4";
                        video.style.display = "block";
                        video.play();
                        var audio = document.getElementById("audio");
                        audio.pause();
                        car.vodeOver();
                    } else{
                        var audio = document.getElementById("audio");
                        audio.play();
                    }
                    break;
            }
        }

        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationChange, false);


    },
    vodeOver: function () {
        var video = document.getElementById("video");
        video.style.display = "block";
        video.addEventListener("timeupdate",function(){
            if(video.currentTime == video.duration && car.total==0){
                video.style.display = "none";
                $('.kj').fadeIn();
                $('.sec00').show();
                audio.play();
                $('.left_btn,.right_btn').show()
                $('.first-img').fadeIn(300,function(){
                    $(".first-txt").fadeIn(300);
                });
                $('.first-txt').bind("touchstart",function(){
//                   $('.first-img').fadeOut(300);
//                   $(".first-txt").fadeOut(300);
                    $(".check-star").fadeIn(300);

                    $('.sec00').fadeOut(300);
                    $('.sec01').fadeIn(300,function(){$('.left_btn,.right_btn').show()});
                    car.towSence();
                })

            }
        })
    },
    towSence:function(){
        $(".check-star").bind("touchstart",car.goToScend)
    },
    goTOthree:function(){
        $(".check-star").fadeOut(500);
        $(".one-img").fadeOut(500);
        $(".tow-img").fadeIn(500);
        setTimeout(function(){
            $('.tow-text').fadeIn(500,function(){
                car.threeSence();
            })
        },700)

    },
    threeSence:function(){
        $(".tow-text").bind("touchstart",function(){
            car.goToScend();
        })
    },
    goToScend:function(){
        $('.sec01').fadeOut();
        $('.tow-img,.tow-text').hide();
        $('.one-img,.check-star').show();
        $('.sec02').fadeIn();
        $('.left_btn,.right_btn').fadeIn();
        car.moveSun();
        car.total=2;
    },
    leftClick:function(){

        $('.music-icon').bind("touchstart",function(){
            $('.music-icon').hide();
            $('.music-icon2').show();
            var audio = document.getElementById("audio");
            audio.pause();
        });

        $('.music-icon2').bind("touchstart",function(){
            $('.music-icon2').hide();
            $('.music-icon').show();
            var audio = document.getElementById("audio");
            audio.play();
        });

        $('.share').bind("touchstart",function(){
            $('.black-layer').fadeIn();
        });
        $('.black-layer').bind("touchstart",function(){
            $('.black-layer').fadeOut();
        });
        $('.bm').bind("touchstart",function(){
            openForm();
        });
        $('.popclose').bind("touchstart",function(){
            $('.pop').hide();
        });


        $('.left_btn').bind("touchstart",function(){
            if(car.total == 0) {
                car.error();
                $('.left_btn,.right_btn,.kj').hide()
                var video = document.getElementById("video");
                video.src="images/00.mp4";
                video.style.display = "block";
                video.play();
            }else if(car.total == 1){
                $(".check-star").fadeIn(300);
                $('.sec00').fadeIn(300);
                $('.sec01').fadeOut(300);
                car.total = 0;

            }else if( car.total==2) {
                $('.sec02').fadeOut();
                $('.sec01').fadeIn();
                $('.left_btn,.right_btn').fadeIn();
                car.total=1;
            } else if(car.total==3){
                $('.sec03').fadeOut();
                $('.sec02').fadeIn();
                car.moveSun();
            } else if(car.total==4){
                car.total=3;
                $('.sec04').fadeOut();
                $('.sec03').fadeIn();
                $('.three-car').hide()
                $('.three-cartxt').hide()
            } else if(car.total==5){
                car.total=4;
                $('#video').fadeOut();
                $('.sec05').fadeOut();
                $('.sec03').hide();
                $('.sec02').hide();
                $('.sec01').hide();
                $('.sec04').fadeIn();
                $('.left_btn,.right_btn').fadeIn();
                audio.play();
//                    $('.three-car').hide()
//                    $('.three-cartxt').hide()
            }

        });

        $('.right_btn').bind("touchstart",function(){
            if(car.total == 0) {
                $(".check-star").fadeIn(300);
                $('.sec00').fadeOut(300);
                $('.sec01').fadeIn(300,function(){
                    car.total = 1;
                });
                car.towSence();
            } else if( car.total==1) {

                if ($('.tow-img').is(":visible")) {
                    car.goToScend();
                } else {
                    car.goTOthree();
                }
            } else if( car.total==2) {
                if ($('.three-txt').is(":visible")) {
                    $('.sec01').fadeOut();
                    $('.sec02').fadeOut();
                    $('.sec03').fadeIn();
                    $('.three-five').fadeIn(300);
                    $('.three-quxian').fadeIn(500,function(){
                        document.body.addEventListener('touchstart', function (e) {
                            var e = e.changedTouches[0];
                            car.touchPint._X =  e.pageX;
                            console.log( car.touchPint._X );
                        });
                        document.body.addEventListener('touchend', function (e) {
                            var e = e.changedTouches[0];
                            car.touchPint._X2 =  e.pageX;
                            console.log( car.touchPint._X2 )
                            if(car.touchPint._X2-car.touchPint._X>60){
                                $('.three-five1').fadeIn(300,function(){
                                    $('.three-five1').fadeOut(300);
                                    $('.three-quxian').fadeOut(500,function(){
                                        $('.three-car').fadeIn(300);
                                        $('.three-cartxt').fadeIn(600);
                                    })
                                });
                            }
                        });
                    })
                    $('.three-car').hide();
                    $('.three-cartxt').hide();
                    $('.three-five1').hide();
                    car.total = 3;
                    console.log(car.total)
                } else {
                    $('.sun-box').fadeOut();
                    $('.three-one').fadeOut(300);
                    $('.three-tow').fadeIn(300, function () {
                        $('.three-txt').fadeIn(400)
                    });
                }
            } else if(car.total==3){

                if ($('.three-car').is(":visible")) {
                    car.total = 4;
                    $('.sec03').fadeOut(300);
                    $('.sec04').fadeIn(300,function(){
                        $('.five-boy').fadeIn(500);
                        $('.five-txt').fadeIn(2000);
                    });

                    console.log(car.total)
                } else{
                    $('.three-quxian').fadeOut()
                    $('.three-car').fadeIn(300);
                    $('.three-cartxt').fadeIn(600);

                }

            } else if(car.total==4){
                audio.pause();
                car.total=5;
                $('#scene').hide();
                var video = document.getElementById("video");
                video.style.display = "block";
                video.src="images/06.mp4";
                video.play();
                video.addEventListener("timeupdate",function(){
                    if(video.currentTime == video.duration && car.total==5 ){
                        $('.kv').fadeIn();
                        $('.right_btn').hide();
                        $('#scene').show();
                        $('.sec01').hide();
                        $('.sec02').hide();
                        $('.sec03').hide();
                        $('.sec04').hide();
                        $('.sec05').show();
                        video.style.display = "none";
                        var audio = document.getElementById("audio");
                        audio.play();
                    }
                })
                console.log("over")

            }

        });

    },
    moveSun:function(){
        $('.three-one').show();
        $('.three-tow').hide();
        $('.three-txt').hide();
        $('.sun-box').show();
        $(".sun").css("left",0);

        car.total=2;
        var sun = document.getElementById("sun");
        $("#sun").bind("touchstart",function(){
            $(this).animate({left:($(window).width()*0.6)-($(window).width()*0.3)},500,function(){
                $('.sun-box').fadeOut();
                $('.three-one').fadeOut(300);
                $('.three-tow').fadeIn(300,function(){
                    $('.three-txt').fadeIn(400);
                });
            });
        })
        sun.addEventListener('touchmove', function (e) {
            var touch = event.targetTouches[0];
            var wleft = $(window).width()*0.3;
            var wleft2 = $(window).width()*0.7;
            var wleft3 = $(window).width()*0.5;
            var X = touch.pageX-29-wleft;
            if(touch.pageX < wleft2 && touch.pageX>wleft){
                $(".sun").css("left",X);
                console.log(wleft2,touch.pageX)
            }
            if(touch.pageX-29 > wleft3){
                $('.sun-box').fadeOut();
                $('.three-one').fadeOut(300);
                $('.three-tow').fadeIn(300,function(){
                    $('.three-txt').fadeIn(400);
                });
            }


        })

    }
}

$(function(){
    car.init();
})