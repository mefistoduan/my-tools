/**
 * Created by mefisto on 2016/8/3.
 */
$(function(){
    $(document).on('click','.open-about', function () {
        $.popup('.popup-about');
        $('.modal-overlay-visible').hide();
    });

    $(document).on('click','.open-close-popup', function () {
        $.closeModal('.popup-about');
    });

    //选择
    $(".choice_popup ul li").click(function(){
        $(this).closest('ul').find('li').removeClass('curr');
        $(this).closest('ul').find('li input').removeAttr('checked','checked');
        $(this).addClass('curr');
        $(this).find('input').attr('checked','checked');
    });



});