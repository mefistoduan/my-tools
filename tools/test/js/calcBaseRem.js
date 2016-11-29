/**
 * Copyright 2015 creditease Inc. All rights reserved.
 * @desc 根据设备独立像素计算rem基准值
 * @author aiweizhang(aiweizhang@creditease.cn)
 * @date 2015/11/04
 */

(function(){
    'use strict';

    var
        /**
         * 根节点
         * @type {Element}
         */
        el = document.documentElement,
        /**
         * 事件类型，如果不存在旋转事件，则以reisze代替
         * @type {String}
         */
        eventType = 'orientationchange' in window ? 'orientationchange' : 'resize',
        /**
         * font size基准参考值
         * @type {Number}
         */
        size = 16,
        /**
         * 设备独立像素基准参考值，以 iPhone 6s 为基准
         * @type {Number}
         */
        dpWidth = 320,
        /**
         * 计算rem基准值
         */
        calcHandle = function(){
            el.style.fontSize = el.clientWidth / dpWidth * size + 'px';
        };

    calcHandle();
    window.addEventListener(eventType, calcHandle, false);
})();
