/**
 * @author: mefisto
 * @description:
 * @Date: 2016/10/17 14:13
 */
var can;
var ctx;

function init(){
    can = document.getElementById('canvas');
    ctx = can.getContext('2d');

    w = can.width;
    h = can.height;
};

$(function(){
    init();
});

function  gameloop(){
    drawBackground();
};

function  drawBackground(){
    ctx.fillStyle = '#393550';

}
