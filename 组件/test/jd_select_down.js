/* jdf-1.0.0/ switchable.js Date:2015-09-15 18:39:14 */
!
    function(a, b) {
        a.ui.define("switchable", {
            options: {
                hasCssLink: !1,
                baseVersion: "1.0.0",
                cssLinkVersion: "1.0.0",
                type: "tab",
                direction: "left",
                hasSetup: !1,
                navClass: "ui-switchable-trigger",
                navItem: "ui-switchable-item",
                navSelectedClass: "ui-switchable-selected",
                navDisabledClass: "disabled",
                navIframe: "data-iframe",
                contentClass: "ui-switchable-panel-main",
                mainClass: "ui-switchable-panel",
                mainSelectedClass: "ui-switchable-panel-selected",
                bodyClass: "ui-switchable-panel-body",
                hasPage: !1,
                autoLock: !1,
                prevClass: "ui-switchable-prev",
                nextClass: "ui-switchable-next",
                pagCancelClass: "ui-switchable-page-cancel",
                hasArrow: !1,
                arrowClass: "ui-switchable-arrow",
                event: "mouseover",
                speed: 400,
                callback: null,
                onNext: null,
                onPrev: null,
                delay: 150,
                defaultPanel: 0,
                autoPlay: !1,
                playDirection: "next",
                stayTime: 5e3,
                mouseenterStopPlay: !0,
                includeMargin: !1,
                width: 0,
                height: 0,
                seamlessLoop: !1,
                hasHash: !1,
                imgscrollClass: "ui-switchable-imgscroll-img",
                imgscrollItemClass: "ui-switchable-imgscroll-item",
                imgscrollLazyload: !1,
                step: 1,
                visible: 1,
                easing: "swing",
                hasLoop: !1
            },
            init: function() {
                var b = this;
                var c = b.options;
                var d = !0;
                if (b.addClass(), c.visible < c.step && (c.visible = c.step), b.nav = b.el.find("." + c.navItem), b.main = b.el.find("." + c.mainClass), c.step = Math.max(c.step || 1, 1), b.size = b.main.size(), b.pageCount = Math.ceil(b.main.size() / c.step), b.content = b.el.find("." + c.contentClass), b.mainWidth = b.main.outerWidth(c.includeMargin), d = c.step < b.size, "tab" == c.type && c.navSelectedClass && b.nav.length > 0) {
                    var e = -1;
                    b.nav.each(function(b) {
                        var d = a(this);
                        d.hasClass(c.navSelectedClass) && ( - 1 == e ? e = b: d.removeClass(c.navSelectedClass))
                    }),
                    e > -1 && (c.defaultPanel = e)
                }
                if (c.width && (b.mainWidth = c.width), b.mainHeight = b.main.outerHeight(c.includeMargin), c.height && (b.mainHeight = c.height), b.cloneCount = Math.max(c.step, c.visible), c.seamlessLoop && d) {
                    var f = [];
                    var g = [];
                    var h = b.cloneCount;
                    for (var i = 0; h > i; i++) f.push(b.main.eq(i).clone().attr("data-switchable-clone", 1).data("switchable-clone-from", h + i)),
                        g.push(b.main.eq(b.size - (i + 1)).clone().attr("data-switchable-clone", 1).data("switchable-clone-from", b.size + i));
                    for (var j = 0; h > j; j++) b.content.prepend(g[j]).append(f[j]);
                    b.main = b.el.find("." + c.mainClass)
                }
                b.main.each(function(b) {
                    a(this).data("switchable-idx", b)
                });
                var k = c.defaultPanel;
                c.hasHash && (k = b.getHash(k)),
                    b.last = k,
                    b.current = k,
                    b.isInit = !0,
                    c.seamlessLoop && d ? b.switchTo(k, k + b.cloneCount) : b.switchTo(k, k),
                    b.autoInterval = null,
                    b.eventTimer = null,
                c.hasPage && (d && b.page(), c.autoLock && b.updatePageButState()),
                d && (b.autoPlay(), b.bind())
            },
            addClass: function() {},
            bind: function() {
                var b = this;
                var c = b.options;
                b.nav.each(function(d) {
                    var e = a(this);
                    e.bind(c.event,
                        function() {
                            clearInterval(b.autoInterval),
                            c.navDisabledClass && e.hasClass(c.navDisabledClass) || (0 === c.delay ? (b.current = d, b.switchTo(d, c.seamlessLoop ? d + b.cloneCount: d)) : (clearTimeout(b.eventTimer), b.eventTimer = setTimeout(function() {
                                    b.current = d,
                                        b.switchTo(d, c.seamlessLoop ? d + b.cloneCount: d)
                                },
                                c.delay)))
                        }).bind("mouseleave",
                        function() {
                            clearTimeout(b.eventTimer),
                            c.mouseenterStopPlay || b.autoPlay()
                        }),
                    "click" == c.event && e.bind("mouseover",
                        function() {
                            clearTimeout(b.eventTimer),
                                clearInterval(b.autoInterval)
                        })
                }),
                c.mouseenterStopPlay && b.el.each(function() {
                    a(this).bind("mouseenter",
                        function() {
                            clearInterval(b.autoInterval)
                        }).bind("mouseleave",
                        function() {
                            b.autoPlay()
                        })
                }),
                !a.browser.isMobile() || "focus" != c.type && "slider" != c.type || (b.main.swipeLeft(function() {
                    b.next()
                }), b.main.swipeRight(function() {
                    b.prev()
                }))
            },
            getHash: function(b) {
                var c = this;
                var d = window.location.hash;
                if ("" != d) {
                    var e = c.nav;
                    var f = null;
                    if (a.each(e,
                            function(b) {
                                a(this).attr("data-hash") == d && (f = b)
                            }), null != f) {
                        b = f;
                        var g = c.nav.eq(f).offset().top;
                        var h = a.browser.webkit ? 50 : 0;
                        setTimeout(function() {
                                a(window).scrollTop(g)
                            },
                            h)
                    }
                }
                return b
            },
            setHash: function(a) {
                var b = this;
                if (b.options.hasHash) {
                    if (b.isInit && !window.location.hash) return;
                    var c = b.nav.eq(a).attr("data-hash");
                    c = c.replace(/#/, ""),
                        window.location.hash = c
                }
            },
            switchTo: function(a, b) {
                var c = this;
                if ("undefined" == typeof b) var b = a;
                c.switchNavTo(a),
                    c.switchMainTo(b)
            },
            switchNavTo: function(a) {
                var b = this;
                var c = b.options;
                b.nav.removeClass(c.navSelectedClass),
                    b.nav.eq(a).addClass(c.navSelectedClass),
                    b.setHash(a)
            },
            switchMainTo: function(b) {
                var c = this;
                var d = c.options;
                if (c.iframe(b), "imgscroll" != d.type && (c.main.removeClass(d.mainSelectedClass), c.main.eq(b).addClass(d.mainSelectedClass)), c.isInit || c.last != b) {
                    if (c.switchType(b), null != d.callback) {
                        var e = b;
                        var f = !1;
                        var g = this.main.eq(e);
                        e + 1 == c.pageCount && (f = !0),
                        d.seamlessLoop && this.main.each(function() {
                            return e == a(this).data("switchable-clone-from") ? (g = g.add(a(this)), !1) : void 0
                        }),
                            d.callback.call(c, e, f, g)
                    }
                    c.last = b
                }
            },
            switchType: function(a) {
                var b = this;
                var c = b.options;
                switch (c.type) {
                    case "tab":
                        b.tab(a);
                        break;
                    case "focus":
                        b.focus(a);
                        break;
                    case "slider":
                        b.slider(a);
                        break;
                    case "carousel":
                        b.carousel(a);
                        break;
                    case "imgscroll":
                        b.imgscroll(a)
                }
            },
            switchDefault: function(a) {
                var b = this;
                b.main.hide(),
                    b.main.eq(a).show()
            },
            tab: function(a) {
                var b = this;
                var c = b.options;
                if (c.hasSetup || b.switchDefault(a), c.hasArrow) {
                    var d = c.arrowClass;
                    var e = b.nav.eq(a).outerWidth(!0) * a;
                    if (b.isInit) {
                        var f = b.nav.parent();
                        f.prepend('<div class="' + d + '"><b></b></div>').css({
                            position: "relative"
                        }),
                            b.el.find("." + d).css({
                                left: e
                            }),
                            b.isPlayLock = !1
                    } else setTimeout(function() {
                            b.isPlayLock = !1
                        },
                        c.speed),
                        b.el.find("." + d).stop(!0).animate({
                                left: e
                            },
                            c.speed, c.easing)
                }
                b.isInit = !1
            },
            focus: function(b) {
                var c = this;
                var d = c.options;
                c.isInit ? (c.main.parent().css({
                    position: "relative"
                }), c.main.css({
                    position: "absolute",
                    zIndex: 0,
                    opacity: 0
                }).show(), c.main.eq(b).css({
                    zIndex: 1,
                    opacity: 1
                }), c.isPlayLock = !1) : (setTimeout(function() {
                        c.isPlayLock = !1
                    },
                    d.speed), c.main.eq(c.last).css({
                    zIndex: 0
                }).stop(!0).animate({
                        opacity: 1
                    },
                    d.speed, d.easing,
                    function() {
                        a(this).css("opacity", 0)
                    })),
                    c.main.eq(b).css({
                        zIndex: 1
                    }).stop(!0).animate({
                            opacity: 1
                        },
                        d.speed, d.easing),
                    c.isInit = !1
            },
            slider: function(a) {
                var b = this;
                var c = b.options;
                var d = b.content;
                var e = b.mainHeight;
                var f = e * a;
                var g = b.mainWidth;
                var h = g * a;
                b.isInit ? ("left" == c.direction ? (b.main.css({
                    "float": "left"
                }), d.css(c.seamlessLoop ? {
                    width: g * (b.size + 2 * b.cloneCount)
                }: {
                    width: g * b.size
                }), d.css({
                    left: -h
                })) : "top" == c.direction && d.css({
                    top: -f
                }), d.parent().css({
                    position: "relative"
                }), d.css({
                    position: "absolute"
                }), b.switchDefault(a), b.isInit = !1, b.isPlayLock = !1) : (setTimeout(function() {
                        b.isPlayLock = !1
                    },
                    c.speed), "left" == c.direction ? d.stop(!0).animate({
                        left: -h
                    },
                    c.speed, c.easing) : "top" == c.direction && d.stop(!0).animate({
                        top: -f
                    },
                    c.speed, c.easing)),
                    b.main.show()
            },
            carousel: function(a) {
                var b = this;
                b.slider(a)
            },
            imgscroll: function(b) {
                var c = this;
                var d = c.options;
                var e = c.mainWidth;
                var f = c.el.find("." + d.imgscrollClass);
                if (c.isInit) {
                    c.el.find("." + d.bodyClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: e * d.visible
                    }),
                        c.content.css({
                            position: "absolute",
                            width: e * c.size
                        }),
                        c.main.css({
                            "float": "left"
                        });
                    var g = d.mainSelectedClass;
                    if (c.main.eq(0).addClass(g), !f.attr("src")) {
                        var h = c.el.find("." + d.imgscrollItemClass).eq(0).attr("data-url");
                        f.attr("src", h)
                    }
                    if (d.imgscrollLazyload) for (var b = c.current; b < d.visible + 1; b++) {
                        var i = c.main.eq(b).find("." + d.imgscrollItemClass);
                        var h = i.attr("data-src");
                        i.attr("src", h)
                    }
                    c.main.bind(d.event,
                        function() {
                            var b = a(this);
                            var e = b.find("." + d.imgscrollItemClass).attr("data-url");
                            c.main.removeClass(g),
                                b.addClass(g),
                                f.attr("src", e)
                        }),
                        c.isInit = !1,
                        c.isPlayLock = !1
                } else {
                    setTimeout(function() {
                            c.isPlayLock = !1
                        },
                        d.speed);
                    var j = c.current * e;
                    if (d.imgscrollLazyload) {
                        var i = c.main.eq(d.visible + c.current).find("." + d.imgscrollItemClass);
                        var h = i.attr("data-src");
                        i.attr("src", h)
                    }
                    c.content.stop(!0).animate({
                            left: -j
                        },
                        d.speed)
                }
            },
            page: function() {
                var a = this;
                var b = a.options;
                var c = a.el.find("." + b.nextClass);
                var d = a.el.find("." + b.prevClass);
                d.bind("click",
                    function(c) {
                        a.isPlayLock && a.content && a.content.length > 0 || b.autoLock && 0 == a.current || (a.isPlayLock = !0, a.prev(), c.stopPropagation())
                    }),
                    c.bind("click",
                        function(c) {
                            a.isPlayLock && a.content && a.content.length > 0 || b.autoLock && a.current >= a.size - b.visible || (a.isPlayLock = !0, a.next(), c.stopPropagation())
                        })
            },
            next: function() {
                var b = this;
                var c = b.options;
                b.current = b.current + c.step,
                    b.offsetIndex();
                var d = 0; ! c.seamlessLoop && c.hasLoop && (d = -c.visible + c.step),
                b.current >= b.size + d && (b.current = 0);
                var e = c.visible > c.step ? c.visible: c.step; ! c.seamlessLoop && b.current + e > b.size && (b.current = b.size > e ? b.size - e: 0);
                var f = c.seamlessLoop ? b.current + b.cloneCount: b.current;
                b.switchTo(b.current, f),
                    b.updatePageButState(),
                a.isFunction(c.onNext) && c.onNext.call(b)
            },
            prev: function() {
                var b = this;
                var c = b.options;
                c.seamlessLoop ? b.offsetIndex(!0) : (b.current -= c.step, b.current < 0 && (b.current = b.current > -c.step ? 0 : b.size - c.step));
                var d = c.seamlessLoop ? b.current + b.cloneCount: b.current;
                b.switchTo(b.current, d),
                    b.updatePageButState(),
                a.isFunction(c.onPrev) && c.onPrev.call(b)
            },
            updatePageButState: function() {
                var a = this;
                var b = a.options;
                if (b.hasPage && b.autoLock) {
                    var c = a.el.find("." + b.nextClass);
                    var d = a.el.find("." + b.prevClass);
                    var e = b.pagCancelClass;
                    a.current >= a.size - Math.max(b.visible, b.step) ? c.addClass(e) : c.removeClass(e),
                        a.current <= 0 ? d.addClass(e) : d.removeClass(e)
                }
            },
            offsetIndex: function(a) {
                var b = this;
                var c = b.content;
                var d = b.options;
                var e = b.mainWidth;
                var f = b.mainHeight;
                var g = null;
                var h = null;
                var i = null;
                a && d.seamlessLoop ? (i = b.current, b.current <= 0 ? (i = b.size - d.step + b.current, g = -((b.size + (b.cloneCount + b.current)) * e), h = -((b.size + (b.cloneCount + b.current)) * f)) : i -= d.step, b.current = i) : b.current >= b.size && d.seamlessLoop && (i = b.current - b.size, g = -((i + b.cloneCount - d.step) * e), h = -((i + b.cloneCount - d.step) * f), b.current = i),
                    null != g && "left" == d.direction ? c.css({
                        left: g
                    }) : null != h && "top" == d.direction && c.css({
                        top: h
                    })
            },
            autoPlay: function() {
                var a = this;
                a.options.autoPlay && a.startPlay()
            },
            startPlay: function() {
                var a = this;
                var b = a.options;
                a.stopPlay(),
                    a.autoInterval = setInterval(function() {
                            a.main.length <= b.step ? a.stopPlay() : "prev" == b.playDirection ? a.prev() : a.next()
                        },
                        b.stayTime)
            },
            stopPlay: function() {
                var a = this;
                clearInterval(a.autoInterval)
            },
            iframe: function(a) {
                var b = this;
                var c = b.main.eq(a);
                var d = b.nav.eq(a);
                var e = d.attr(b.options.navIframe);
                if (e) {
                    var f = document.createElement("iframe");
                    f.src = e,
                        f.border = 0,
                        f.frameborder = "no",
                        f.marginwidth = 0,
                        f.marginheight = 0,
                        c.html(f),
                        d.removeAttr(b.options.navIframe)
                }
            },
            update: function(c, d) {
                var e = this;
                var f = e.options;
                var g = e.main.length;
                var h = -1;
                var i = -1;
                var j = !1;
                if (a.isFunction(c) && (d = c, c = 0), isNaN(parseInt(c)) ? (c.hasClass(f.mainClass) || (c = c.closest("." + f.mainClass)), c.hasClass(f.mainClass) && (i = c.data("switchable-idx"))) : i = c, h = i, f.autoPlay && (e.stopPlay(), f.autoPlay = !1, j = !0), f.seamlessLoop && g > f.step) {
                    var k = e.main.length - 2 * f.step;
                    var l = !1;
                    e.main.each(function() {
                        var c = a(this);
                        "1" == c.data("switchable-clone") && (l = !0, a(this).remove())
                    }),
                    l && (h = i < f.step || i >= k + f.step ? i >= k + f.step ? i - k - f.step: k - f.step + i: i - f.step)
                }
                if (f.hasPage) {
                    var m = e.el.find("." + f.nextClass);
                    var n = e.el.find("." + f.prevClass);
                    m.unbind("click"),
                        n.unbind("click")
                }
                e.main = e.el.find("." + f.mainClass),
                    g = e.main.length;
                var o = function(a) {
                    if (a == b || null == a) {
                        var c = e.el.find("." + f.mainClass).length;
                        g > c ? h -= g - c: h = c > g ? c > f.visible ? c - f.visible: 0 : e.current,
                        0 > h && (h = 0),
                        j && (f.autoPlay = !0),
                        f.autoLock && !f.seamlessLoop && h + f.visible >= c && (h = c - f.visible, 0 > h && (h = 0))
                    } else h = a;
                    f.defaultPanel = h,
                        e.init()
                };
                d.call(e.main.eq(h), e.content, h, o) ? e.el.find("." + f.mainClass).each(function(b) {
                    a(this).data("switchable-idx", b)
                }) : o()
            }
        })
    } (jQuery);
/* jdf-1.0.0/ lazyload.js Date:2015-09-15 18:39:14 */
!
    function(a) {
        function c(b, c, d) { ! b.attr("src") && c && (b.attr("src", d.blankImgUrl), b.addClass(d.placeholderClass)),
            b.attr("src", c),
            b.attr(d.source, "done"),
        c || b.attr("src") || b.attr("src", d.blankImgUrl),
        c && (b[0].onerror = function() {
            b.attr("src", d.blankImgUrl).removeClass(d.placeholderClass).addClass(d.errorClass)
        },
            b[0].onload = function() {
                b.removeClass(d.placeholderClass)
            }),
        a.isFunction(d.onchange) && d.onchange.call(b)
        }
        function d(b, c, d) {
            "function" == typeof define && define.cmd ? seajs.use(b,
                function(a) {
                    a.init(c),
                        d()
                }) : (a.ajax({
                url: b,
                dataType: "script",
                cache: !0
            }), d())
        }
        function e(a, b, c) {
            "0" == a.attr("data-lazyload-fn") && (a.attr("data-lazyload-fn", "done"), c(), b.onchange && b.onchange(a))
        }
        a.ui.define("lazyload", {
            options: {
                type: "img",
                source: "data-lazy-path",
                init: "data-lazy-init",
                delay: 100,
                space: 100,
                onchange: null,
                placeholderClass: "loading-style2",
                errorClass: "err-poster",
                blankImgUrl: "//misc.360buyimg.com/lib/img/e/blank.gif"
            },
            init: function() {
                var b = this;
                var f = this.options;
                var g = null;
                var h = null;
                var i = null;
                "img" == f.type && ("data-lazy-path" == f.source && (f.source = "data-lazy-img"), i = f.source + "-install");
                var j = "div";
                if ("img" == f.type) {
                    if (j = "IMG", g = a("img[" + f.source + "][" + f.source + "!=done]", b.el), h = g.size(), !h) return ! 1
                } else "fn" == f.type && (j = f.source);
                var k = function() {
                    g = "img" == f.type ? a("img[" + f.source + "][" + f.source + "!=done]", b.el) : a(j, b.el),
                        h = g.size();
                    var k = a(document).scrollTop();
                    var l = k + a.page.clientHeight() + f.space;
                    a.each(g,
                        function() {
                            var g = a(this);
                            var i = null;
                            if (("js" == f.type || "img" == f.type) && (i = g.attr(f.source)), i || "fn" == f.type || "img" == f.type) {
                                var j = b.getTop(g[0]);
                                if (j > 0 && h > 0 && j > k - g.outerHeight() && l > j) {
                                    var m = g.attr(f.init);
                                    "img" == f.type ? (m = g.attr(f.source), "done" != m ? (c(g, m, f), h -= 1) : "done" == m && (h -= 1)) : "js" == f.type ? d(i, m,
                                        function() {
                                            h -= 1,
                                                g.attr(f.init, "done")
                                        }) : "fn" == f.type && e(g, f,
                                        function() {
                                            h -= 1
                                        })
                                }
                            }
                        }),
                    h || ("img" == f.type && i && b.el.removeAttr(i), a(window).unbind("scroll", m), a(window).unbind("resize", m))
                };
                var l = setTimeout(k, 0);
                var m = function() {
                    l && clearTimeout(l),
                        l = setTimeout(k, f.delay)
                };
                "1" != b.el.attr(i) && (b.el.attr(i, 1), a(window).bind("scroll", m), a(window).bind("resize", m)),
                "fn" == f.type && f.source.attr("data-lazyload-fn", "0")
            },
            getTop: function(a) {
                var b = a.offsetTop;
                if (null != a.parentNode) {
                    var c = a.offsetParent;
                    for (; null != c;) b += c.offsetTop,
                        c = c.offsetParent
                }
                return b
            }
        })
    } (jQuery);
/* jdf-1.0.0/ notif.js Date:2015-12-01 13:54:55 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/notif/1.0.0/notif.js", ["//misc.360buyimg.com/jdf/1.0.0/unit/login/1.0.0/login.js", "//misc.360buyimg.com/jdf/1.0.0/ui/dialog/1.0.0/dialog.js"],
    function(require) {
        var c = require("//misc.360buyimg.com/jdf/1.0.0/unit/login/1.0.0/login.js");
        require("//misc.360buyimg.com/jdf/1.0.0/ui/dialog/1.0.0/dialog.js");
        function e(a) {
            a = $.extend({
                    el: null,
                    autoIframe: !0,
                    saleNotify: "//skunotify.jd.com/pricenotify.html?",
                    stockNotify: "//skunotify.jd.com/storenotify.html?"
                },
                a || {});
            var f, d = g(location.href),
                e = /from=weibo/.test(location.href) ? location.search.replace(/\?/, "") : "";
            /from=weibo/.test(location.href) && (f = d.param.type, h(f, e)),
            a.el && a.el.live("click",
                function() {
                    var d = ($(this).attr("id"), $(this).attr("data-type") || 2),
                        f = $(this).attr("data-sku");
                    return c({
                        modal: !0,
                        complete: function(a) {
                            h(f, d, e, a.Identity.Name)
                        }
                    }),
                        !1
                }).attr("href", "#none").removeAttr("target");
            function g(a) {
                var g, i, j, k, b = a.indexOf("?"),
                    c = a.substr(0, b),
                    d = a.substr(b + 1),
                    e = d.split("&"),
                    f = e.length,
                    h = {};
                for (g = 0; f > g; g++) i = e[g].split("="),
                    j = i[0],
                    k = i[1],
                    h[j] = k;
                return {
                    url: c,
                    param: h
                }
            }
            function h(b, c, d, e) {
                var f, h, j, k = {
                        skuId: b,
                        pin: encodeURI(e),
                        webSite: 1,
                        origin: 1,
                        source: 1
                    },
                    l = g(location.href);
                /blogPin/.test(location.href) && (k.blogPin = l.param.blogPin),
                1 == c && (f = "\u964d\u4ef7\u901a\u77e5", h = a.saleNotify, j = /.jd.hk$/.test(location.host) ? 360 : 490),
                2 == c && (f = "\u5230\u8d27\u901a\u77e5", h = a.stockNotify, j = /.jd.hk$/.test(location.host) ? 315 : 445, k.storeAddressId = readCookie("ipLoc-djd") || "0-0-0"),
                    h += d ? d: $.param(k),
                    $("body").dialog({
                        title: f,
                        width: 500,
                        height: j,
                        type: "iframe",
                        fixed: !0,
                        source: decodeURIComponent(h) + "&nocache=" + +new Date,
                        mainId: "notify_box",
                        contentId: "notify_con",
                        titleId: "notify_title",
                        autoIframe: a.autoIframe
                    })
            }
        }
        return e
    });
/*
 JDModules Compressed by uglify
 Author:keelii
 Date: 2016-05-23
 */
define("product/module/footprint-v2",
    function(require, a, b) {
        function c() {
            var a = 20,
                b = "book" == document.body.id || 1 == pageConfig.searchType,
                c = pageConfig.product && pageConfig.product.skuid ? pageConfig.product.skuid: "",
                e = '            <div class="mt">                <h2 class="title">\u6211\u7684\u8db3\u8ff9</h2>                <div class="extra"><a clstag="personal|keycount|myhistory|gdll407" href="//my.jd.com/history/list.html" target="_blank">\u66f4\u591a\u6d4f\u89c8\u8bb0\u5f55</a></div>            </div>            <div class="mc">                <ul class="recent-view-list clearfix">                    {for item in data}                    <li ${pageConfig.getFootPrintClk(item, item_index).recent} data-push="${pageConfig.footmarkSkus.push(item.sku)}" data-clk="${item.clk}">                        <div class="p-img">                            <a href="//item.jd.com/${item.sku}.html" title="${item.t}" target="_blank">                                <img src="${pageConfig.FN_GetImageDomain(item.sku)}n1/s70x70_${item.img}" alt="${item.t}" width="70px" height="70px" />                            </a>                        </div>                        <div class="p-price J-p-${item.sku}">&yen;</div>                    </li>                    {/for}                </ul>            </div>',
                f = '            <div class="mt clearfix">                <h2 class="title">\u731c\u4f60\u559c\u6b22</h2>                <div class="extra"><a clstag="personal|keycount|myhistory|hyp407" href="#none" class="change"><i class="ico"></i><span class="txt">\u6362\u4e00\u6279</span></a></div>            </div>            <div class="mc">                <ul class="may-like-list clearfix">                    {for item in data}                    <li ${pageConfig.getFootPrintClk(item, item_index).guess} data-push="${pageConfig.footmarkSkus.push(item.sku)}" data-clk="${item.clk}">                        <div class="p-img">                            <a href="//item.jd.com/${item.sku}.html" title="${item.t}" target="_blank">                                <img src="${pageConfig.FN_GetImageDomain(item.sku)}n3/${item.img}" alt="${item.t}" width="130" height="130" />                            </a>                        </div>                        <div class="p-name"><a href="//item.jd.com/${item.sku}.html" target="_blank" title="${item.t}">${item.t}</a></div>                        <div class="p-review"><a class="p-comm-${item.sku}" href="//club.jd.com/review/${item.sku}-1-1.html" target="_blank">(\u5df2\u6709\u4eba\u8bc4\u4ef7)</a></div>                        <div class="p-price J-p-${item.sku}">&yen;</div>                    </li>                    {/for}                </ul>            </div>'; !
                function() {
                    var a = $("#footprint").parent(),
                        b = '                <div class="m hide may-like">                    <div class="loading-style1"><b></b>\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u5019...</div>                </div>                <div class="m hide recent-view">                    <div class="loading-style1"><b></b>\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u5019...</div>                </div>';
                    a.after('<div id="footmark" class="w footmark"></div>'),
                        $(".footmark").html(b),
                        a.remove()
                } (),
                b ? (new d({
                    $el: $(".recent-view"),
                    template: e,
                    param: {
                        p: 202001,
                        sku: c,
                        ck: "pinId,lighting,pin,bview",
                        lim: a
                    },
                    onLoad: function(a, b) {
                        log("BOOK&HomeHis", "Show")
                    }
                }), new d({
                    $el: $(".may-like"),
                    template: f,
                    param: {
                        p: 202e3,
                        sku: c,
                        ck: "pinId,lighting,pin,ipLocation,btw,bview",
                        lim: a
                    },
                    onLoad: function(a, b) {
                        log("BOOK&HomeTrack", "Show")
                    },
                    type: "mixer"
                })) : (new d({
                    $el: $(".may-like"),
                    template: f,
                    param: {
                        p: 202002,
                        sku: c,
                        ck: "pinId,lighting,pin,ipLocation,atw,aview",
                        lim: a
                    },
                    onLoad: function(a, b) {
                        clsPVAndShowLog("", "", 2, "s")
                    },
                    type: "mixer"
                }), new d({
                    $el: $(".recent-view"),
                    template: e,
                    param: {
                        p: 202001,
                        sku: c,
                        ck: "pinId,lighting,pin,aview",
                        lim: a
                    },
                    onLoad: function(a, b) {
                        clsPVAndShowLog("", "", 3, "s")
                    }
                }))
        }
        require("jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js"),
            require("jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js"),
            require("product/module/clslog"),
            $("#footprint");
        pageConfig.getFootPrintClk = function(a, b) {
            var c = "book" == document.body.id || 1 == pageConfig.searchType,
                d = {
                    item: a,
                    ind: b
                };
            return c ? {
                recent: " onclick=\"clsLog('${item.sku}&HomeHis', '', '${item.sku}#${item.jp}', ${ind}, 'reWidsBookHis');\"".process(d),
                guess: " onclick=\"clsLog('${item.sku}&HomeTrack', '', '${item.sku}#${item.jp}', ${ind}, 'reWidsBookTrack');\"".process(d)
            }: {
                recent: " onclick=\"clsClickLog('', '', '${item.sku}', 3, ${ind}, 'rodGlobalHis');\"".process(d),
                guess: " onclick=\"clsClickLog('', '', '${item.sku}', 2, ${ind}, 'rodGlobalTrack');\"".process(d)
            }
        };
        var d = function(a) {
            if (this.param = $.extend({
                        lid: "1",
                        lim: 10,
                        ec: "utf-8",
                        uuid: -1,
                        pin: readCookie("pin") || ""
                    },
                    a.param), this.$el = a.$el, this.template = a.template, this.onLoad = a.onLoad ||
                    function() {},
                    this.debug = a.debug, this.type = a.type, !this.param.p) throw new Error("The param [p] is not Specificed");
            this.init()
        };
        d.prototype = {
            init: function() {
                var a = readCookie("__jda");
                this.param.lid.indexOf("-") > 0 ? this.param.lid = this.param.lid.split("-")[0] : this.param.lid = this.param.lid,
                    a ? "-" == a.split(".")[1] ? this.param.uuid = -1 : this.param.uuid = a.split(".")[1] : this.param.uuid = -1,
                    this.get(this.rid)
            },
            get: function(a, b) {
                var c, d, e = this,
                    f = pageConfig.queryParam,
                    g = [],
                    h = "//diviner.jd.com/diviner?";
                if ("mixer" == this.type && (h = "//mixer.jd.com/mixer?"), pageConfig.product) for (c = 0; c < pageConfig.product.cat.length; c++) this.param["c" + (c + 1)] = pageConfig.product.cat[c];
                if (f) {
                    for (var d in f) f.hasOwnProperty(d) && ("c1" == d || "c2" == d || "c3" == d ? e.param[d] = f[d] || "": g.push(d + ":" + f[d]));
                    e.param.hi = g.join(",")
                }
                this.debug,
                    $.ajax({
                        url: h + decodeURIComponent($.param(this.param)),
                        dataType: "jsonp",
                        scriptCharset: this.param.ec,
                        success: function(a) {
                            this.debug,
                                e.set(a)
                        }
                    })
            },
            set: function(a) {
                this.$el,
                this.tpl || "";
                pageConfig.footmarkSkus = [],
                a.success && a.data && a.data.length > 0 && (this.$el.html(this.template.process(a)).show(), this.getPriceNum(pageConfig.footmarkSkus, this.param.lid, this.$el), this.getCommentData(pageConfig.footmarkSkus, this.$el), this.setTrackCode(a.impr), this.bindChange(), this.onLoad(this, a))
            },
            bindChange: function() {
                function a(a, b, c) {
                    var d = 0,
                        e = a.length,
                        f = 1;
                    a.each(function(a) {
                        a % c === 0 && d++,
                            $(this).attr("data-gid", d)
                    }),
                        b.unbind("click").bind("click",
                            function() {
                                f >= e / c && (f = 0);
                                var b = a.filter('[data-gid="' + ++f + '"]');
                                a.hide(),
                                    b.show(),
                                    b.lazyload({
                                        type: "img"
                                    })
                            })
                }
                var b = this.$el.find(".mc").outerWidth(),
                    c = this.$el.find("li").outerWidth(),
                    d = parseInt(b / c, 10);
                a(this.$el.find(".mc ul li"), this.$el.find(".mt .change"), d)
            },
            getCommentData: function(a, b, c) {
                a = a || [],
                    b = b || $("body").eq(0),
                    c = c || "p-comm-",
                    $.ajax({
                        url: "//club.jd.com/clubservice.aspx?method=GetCommentsCount&referenceIds=" + a,
                        dataType: "jsonp",
                        success: function(a) {
                            var b;
                            if (a && a.CommentsCount.length) {
                                b = a.CommentsCount.length;
                                for (var d = 0; b > d; d++) $("." + c + a.CommentsCount[d].SkuId).html("(\u5df2\u6709" + a.CommentsCount[d].CommentCount + "\u4eba\u8bc4\u4ef7)")
                            }
                        }
                    })
            },
            setTrackCode: function(a) {
                var b = this.$el.find("li"),
                    c = this,
                    d = "&m=UA-J2011-1&ref=" + encodeURIComponent(document.referrer);
                b.each(function() {
                    var a = $(this).attr("data-clk");
                    $(this).bind("click",
                        function(b) {
                            var e = $(b.target); (e.is("a") || e.is("img") || e.is("span")) && c.newImage(a + d, !0),
                            e.is("input") && 1 == e.attr("checked") && c.newImage(a + d, !0)
                        })
                }),
                    this.newImage(a + d, !0)
            },
            newImage: function(a, b, c) {
                var d = new Image;
                a = b ? a + "&random=" + Math.random() + (new Date).getTime() : a,
                    d.onload = function() {
                        "undefined" != typeof c && c(a)
                    },
                    d.setAttribute("src", a)
            },
            getPriceNum: function(a, b, c, d, e) {
                a = "string" == typeof a ? [a] : a,
                    c = c || $("body"),
                    d = d || "J-p-";
                var f = "";
                if (null !== b && (f = readCookie("ipLoc-djd") ? "&area=" + readCookie("ipLoc-djd").replace(/-/g, "_") : "&area=1"), "undefined" != typeof a) {
                    var g = readCookie("__jda"),
                        h = g && g.indexOf(".") > -1 ? g.split(".")[1] : "",
                        i = readCookie("pin") || "",
                        j = readCookie("pdtk") || "",
                        k = "//p.3.cn/prices/mgets?type=1&skuIds=J_" + a.join(",J_") + f + "&pduid=" + h + "&pdpin=" + i + "&pdbp=0&pdtk=" + j;
                    $.ajax({
                        url: k,
                        dataType: "jsonp",
                        success: function(a) {
                            if (!a && !a.length) return ! 1;
                            for (var b = 0; b < a.length; b++) {
                                if (!a[b].id) return ! 1;
                                var f = a[b].id.replace("J_", ""),
                                    g = parseFloat(a[b].p);
                                parseFloat(a[b].m);
                                g > 0 ? c.find("." + d + f).html("\uffe5" + a[b].p) : c.find("." + d + f).html("\u6682\u65e0\u62a5\u4ef7"),
                                "function" == typeof e && e(f, a[b], k)
                            }
                        }
                    })
                }
            }
        },
            a.init = c
    });
/*
 JD_Modules Compressed by uglify
 Author:keelii
 Date: 2015-07-27
 */
function log(a, b) {
    var c = Array.prototype.slice.call(arguments),
        d = window.JA;
    c = c && c.slice(2),
    d && d.tracker.aloading(a, b, c),
    d && d.tracker.ngloader("other.000000", {
        t1: a,
        t2: b,
        p0: d.util.join(c)
    })
}
function clsPVAndShowLog(a, b, c, d) {
    var e = a + "." + c + "." + skutype(b) + "." + d;
    log("d", "o", e)
}
function clsClickLog(a, b, c, d, e, f) {
    var g = a + "." + d + "." + skutype(b);
    appendCookie(f, c, g),
        log("d", "o", g + ".c")
}
function appendCookie(reCookieName, sku, key) {
    var reWidsCookies = eval("(" + getCookie(reCookieName) + ")"); (null == reWidsCookies || "" == reWidsCookies) && (reWidsCookies = new Object),
    null == reWidsCookies[key] && (reWidsCookies[key] = "");
    var pos = reWidsCookies[key].indexOf(sku);
    0 > pos && (reWidsCookies[key] = reWidsCookies[key] + "," + sku),
        setCookie(reCookieName, $.toJSON(reWidsCookies), 15)
}
function skutype(a) {
    if (a) {
        var b = a.toString().length;
        return 10 == b ? 1 : 0
    }
    return 0
}
function setCookie(a, b, c) {
    var d = c,
        e = new Date;
    e.setTime(e.getTime() + 24 * d * 60 * 60 * 1e3),
        document.cookie = a + "=" + escape(b) + ";expires=" + e.toGMTString() + ";path=/;domain=." + pageConfig.FN_getDomain()
}
function getCookie(a) {
    var b = document.cookie.match(new RegExp("(^| )" + a + "=([^;]*)(;|$)"));
    return null != b ? unescape(b[2]) : null
}
function clsLog(a, b, c, d, e) {
    appendCookie(e, c, a),
        c = c.split("#")[0],
        log(3, a, c)
}
/* product-list/1.0.4 responsive.js Date:2015-09-24 20:29:15 */
define("//misc.360buyimg.com/product/list/1.0.4/js/responsive.js", [],
    function(require, a, b) {
        var c = {};
        c.init = function() {
            var a = this;
            this.mediaQueriesSupport() || (this.setResponsiveLevel(), this.bindEvent(function() {
                a.setResponsiveLevel()
            }))
        },
            c.mediaQueriesSupport = function() {
                var a = $.browser.msie && $.browser.version < 9;
                return ! a
            },
            c.bindEvent = function(a, b) {
                var a = a ||
                    function() {};
                var b = b || 20;
                var d = null;
                $(window).resize(function() {
                    clearTimeout(d),
                        d = setTimeout(function() {
                                a()
                            },
                            b)
                })
            },
            c.setResponsiveLevel = function() {
                var a = $(window).width();
                1210 > a ? $("html").removeClass() : $("html").removeClass().addClass(a >= 1210 && 1390 > a ? "resp01": "resp02")
            },
            b.exports = c
    });
/* product-list/1.0.4 recommend.js Date:2016-03-29 20:02:57 */
define("//misc.360buyimg.com/product/list/1.0.4/js/recommend.js", ["//misc.360buyimg.com/product/list/1.0.4/js/tools.js"],
    function(require, exports, module) {
        var tools = require("//misc.360buyimg.com/product/list/1.0.4/js/tools.js");
        function Recommend(a, b, c, d, e, f, g) {
            this.renderEle = $(a),
                this.rName = b,
                this.rId = c,
                this.skus = d ? d: "",
                this.lim = e ? e: 10;
            var h = decodeURIComponent(readCookie("pin") || "");
            this.pin = h ? h: "";
            var i = readCookie("ipLoc-djd");
            this.lid = i ? i.split("-")[0] : "1";
            var j = readCookie("__jda");
            this.uuid = j ? j.split(".")[1] : "-1",
                this.url = "mixer" == g ? "//mixer.jd.com/mixer": "//diviner.jd.com/diviner",
                this.callback = f ||
                    function() {},
                this.init()
        }
        Recommend.prototype.init = function() {
            var a = this.rName;
            this.renderRecommend(a)
        },
            Recommend.prototype.renderRecommend = function(a) {
                var b = this;
                this.getRecommendDate(function(c) {
                    var d = [];
                    for (var e in c.data) c.data.hasOwnProperty(e) && c.data[e].sku && d.push(c.data[e].sku);
                    var f = b.getRecommendTpl(a);
                    b.resSku = d,
                        b.renderEle.html(f.process(c)),
                        b.callback(b.renderEle, b),
                        b.setTrackCode(c.impr),
                        tools.priceNum({
                            skus: d,
                            $el: b.renderEle,
                            selector: ".J-rec-p-",
                            text: "{NUM}"
                        }),
                        tools.commentMeta({
                            skus: d,
                            $el: b.renderEle,
                            selector: ".p-rec-comm-",
                            text: "{NUM}"
                        })
                })
            },
            Recommend.prototype.getRecommendDate = function(a) {
                var a = a ||
                    function() {};
                var c = {
                    p: this.rId,
                    pin: this.pin,
                    uuid: this.uuid,
                    lid: this.lid,
                    lim: this.lim,
                    skus: this.skus,
                    ck: "ipLoction",
                    ec: "utf-8"
                };
                var d = pageConfig.queryParam;
                var e = [];
                var f;
                if (d) {
                    for (var f in d) d.hasOwnProperty(f) && ("c1" == f || "c2" == f || "c3" == f ? c[f] = d[f] : e.push(f + ":" + d[f]));
                    c.hi = e.join(",")
                }
                $.ajax({
                    url: this.url,
                    data: c,
                    dataType: "jsonp",
                    jsonpCallback: "call" + parseInt(1e5 * Math.random(), 10),
                    success: function(b) {
                        b.success && b.data && b.data.length > 0 && a(b)
                    }
                })
            },
            Recommend.prototype.getRecommendTpl = function(recommendName) {
                var recommendName = recommendName || "default";
                var tpl = "";
                switch (window.verifyPrice = function(a) {
                    if (!a || "" == a) return a;
                    var b;
                    var c = a.toString().split(".");
                    return 1 == c.length ? b = c[0] + ".00": 2 == c.length && (1 == c[1].length ? b = c[0] + "." + c[1] + "0": 2 == c[1].length ? b = a: c[1].length > 2 && (b = c[0] + "." + c[1].substring(0, 2))),
                        b
                },
                    window.reClick2 = function(type2, pwid, sku, num) {
                        var reWidsClubCookies = eval("(" + getCookie(reCookieName) + ")"); (null == reWidsClubCookies || "" == reWidsClubCookies) && (reWidsClubCookies = new Object),
                        null == reWidsClubCookies[type2] && (reWidsClubCookies[type2] = "");
                        var pos = reWidsClubCookies[type2].indexOf(sku);
                        0 > pos && (reWidsClubCookies[type2] = reWidsClubCookies[type2] + "," + sku),
                            setCookie(reCookieName, $.toJSON(reWidsClubCookies), 15),
                            sku = sku.split("#"),
                            log(3, type2, sku[0])
                    },
                    window.reCookieName = "reWidsTs", window.newImage = function(a, b, c) {
                    var d = new Image;
                    a = b ? a + "&random=" + Math.random() + new Date: a,
                        d.setAttribute("src", a),
                        d.onload = function() {
                            "undefined" != typeof c && c(a)
                        }
                },
                    recommendName) {
                    case "rec-noResult":
                        return tpl = '<ul class="clearfix">{for item in data}{if item_index < 5}<li data-clk="${item.clk}">    <div class="rg-wrap">        <div class="p-img">            <a target="_blank" href="//item.jd.com/${item.sku}.html" title="${item.t}">                <img width="220" height="220" data-img="1" src="//img13.360buyimg.com/cms/s190x190_${item.img}" class="err-product">            </a>        </div>        <div class="p-price">            <strong><em>\xa5</em><i class="J-rec-p-${item.sku}"></i></strong>            <span class="p-commit">                <a target="_blank" class="p-rec-comm-${item.sku}" href="//item.jd.com/${item.sku}.html#comment"></a>\u4e2a\u8bc4\u8bba            </span>        </div>        <div class="p-name">            <a target="_blank" href="//item.jd.com/${item.sku}.html" title="${item.t}">                <em>${item.t}</em>            </a>        </div>    </div></li>{/if}{/for}</ul>';
                    case "ab-goods":
                        return tpl = '<ul class="clearfix">{for item in data}{if item_index < 8}<li data-clk="${item.clk}" onclick="searchlog(1, ${item.sku}, ${item_index}, 83)">  <div class="p-img">      <a target="_blank" href="//item.jd.com/${item.sku}.html" title="${item.t}">          <img width="160" height="160" data-img="1" src="${pageConfig.FN_GetImageDomain(item.sku)}n2/${item.img}" class="err-product">      </a>  </div>  <div class="p-price">      <span>\u7279\u4ef7\uff1a</span><strong><em>\xa5</em><i class="J-rec-p-${item.sku}"></i></strong>  </div>  <div class="p-name">      <a target="_blank" href="//item.jd.com/${item.sku}.html" title="${item.t}">          <em>${item.t}</em>      </a>  </div></li>{/if}{/for}</ul>';
                    case "finalbuy":
                        return tpl = '<div class="mt"><h2>\u8fbe\u4eba\u9009\u8d2d</h2></div><div class="mc"><ul>{for item in data}{if item_index==0}<li class=\'fore\' sku_c=\'${item.sku}\' onclick = \'reClick2("${item.c3}&ThirdRec","","${item.sku}","${item_index}");newImage("${item.clk}&m=UA-J2011-1&ref=${encodeURIComponent(document.referrer)}", true);\'>{else}<li sku_c=\'${item.sku}\' onclick = \'reClick2("${item.c3}&ThirdRec","","${item.sku}",${item_index});newImage("${item.clk}&m=UA-J2011-1&ref=${encodeURIComponent(document.referrer)}", true);\'>{/if}<div class=\'p-img\'>' + "<a href='//item.jd.com/${item.sku}.html' title='${item.t}' target=\"_blank\"><img width='190' height='190' src='//img13.360buyimg.com/cms/s190x190_${item.img}' alt='${item.t}'></a></div><div class=\"p-price\"><strong>{if parseInt(item.jp) <= 0 || item.jp == \"\"}\u6682\u65e0\u62a5\u4ef7{else}\uffe5${verifyPrice(item.jp)}{/if}</strong></div><div class='p-name'><a href='//item.jd.com/${item.sku}.html' title='${item.t}' target=\"_blank\">${item.t}</a></div></li>{/for}</ul></div>";
                    case "alsobuy":
                        return tpl = '<div class="mt"><h2>\u6d4f\u89c8\u4e86\u8fd8\u8d2d\u4e70\u4e86</h2></div><div class="mc"><ul>{for item in data}{if item_index==0}<li class=\'fore\' sku_c=\'${item.sku}\' onclick = \'reClick2("${item.c3}&ThirdBuy","","${item.sku}","${item_index}");newImage("${item.clk}&m=UA-J2011-1&ref=${encodeURIComponent(document.referrer)}", true);\'>{else}<li sku_c=\'${item.sku}\' onclick=\'reClick2("${item.c3}&ThirdBuy","","${item.sku}","${item_index}");newImage("${item.clk}&m=UA-J2011-1&ref=${encodeURIComponent(document.referrer)}", true);\'>{/if}<div class=\'p-img\'><a href=\'//item.jd.com/${item.sku}.html\' title=\'${item.t}\' target="_blank">' + "<img width='190' height='190' src='//img13.360buyimg.com/cms/s190x190_${item.img}' alt='${item.t}'></a></div><div class=\"p-price\"><span>\u7279\u4ef7\uff1a</span><strong>{if parseInt(item.jp) <= 0 || item.jp == \"\"}\u6682\u65e0\u62a5\u4ef7{else}\uffe5${verifyPrice(item.jp)}{/if}</strong></div><div class='p-name'><a href='//item.jd.com/${item.sku}.html' title='${item.t}' target=\"_blank\">${item.t}</font></a></div></li>{/for}</ul></div>";
                    default:
                        return "not found"
                }
            },
            Recommend.prototype.setTrackCode = function(a) {
                var b = this.renderEle.find("li");
                var c = this;
                var d = "&m=UA-J2011-1&ref=" + encodeURIComponent(document.referrer);
                b.each(function() {
                    var a = $(this).attr("data-clk");
                    $(this).bind("click",
                        function(b) {
                            var e = $(b.target); (e.is("a") || e.is("img") || e.is("span") || e.is("em")) && c.newImage(a + d, !0)
                        })
                }),
                    this.newImage(a + d, !0)
            },
            Recommend.prototype.newImage = function(a, b, c) {
                var d = new Image;
                a = b ? a + "&random=" + Math.random() + new Date: a,
                    d.setAttribute("src", a),
                    d.onload = function() {
                        "undefined" != typeof c && c(a)
                    }
            },
            module.exports = Recommend
    });
/* product-list/1.0.4 bookmvd.js Date:2016-03-29 20:02:58 */
define("//misc.360buyimg.com/product/list/1.0.4/js/bookmvd.js", ["//misc.360buyimg.com/product/list/1.0.4/js/reco.js", "//misc.360buyimg.com/product/list/1.0.4/js/tools.js"],
    function(require, a) {
        var c = require("//misc.360buyimg.com/product/list/1.0.4/js/reco.js");
        var d = require("//misc.360buyimg.com/product/list/1.0.4/js/tools.js");
        var e = '    <div class="mt">        <h2>${ext.title}</h2>    </div>    <div class="mc">        <ul>            {for item in data}            <li class="fore${pageConfig[skuHooks].push(item.sku)}" data-clk="${item.clk}"             onclick=\'log("search", "list", "${encodeURI(location.href)}", "{if pageConfig.queryParam.c3 == ""}${pageConfig.queryParam.c2}{else}${pageConfig.queryParam.c3}{/if}", "12", "${ext.id}", "${item.sku}", "2", "${Number(item_index)+1}", "")\'>                <div class="p-img">                    <a href="//item.jd.com/${item.sku}.html" title="${item.t}" target="_blank">                        <img width="160" height="160" src="${pageConfig.FN_GetImageDomain(item.sku)}n1/s160x160_${item.img}" alt="${item.t}">                    </a>                </div>                <div class="p-price"><strong class="J-p-${item.sku}">\uffe5${item.jp}</strong>                </div>                <div class="p-name"><a href="//item.jd.com/${item.sku}.html" title="${item.t}" target="_blank">${item.t}</a>                </div>            </li>            {/for}        </ul>    </div>';
        var f = '    <div class="hd">\u70ed\u5356\u63a8\u8350</div>    <div class="bd mc">        <ul class="mc list-h clearfix">        {for item in data}        <li data-sku="${pageConfig["SKUS_hotsale"].push(item.SkuId)}"         onclick=\'log("search", "list", "${encodeURI(location.href)}", "${pageConfig.queryParam.c3}", "8", "1", "${item.SkuId}", "2", "${Number(item_index)+1}", "${params.abTestFlag}")\'>              <a class="p-img" target="_blank" href="//item.jd.com/${item.SkuId}.html" title="${item.Name}">                  <img width="100" height="100" data-img="1" src="//img12.360buyimg.com/n4/${item.Img}" class="err-product">              </a>              <a class="p-name" target="_blank" href="//item.jd.com/${item.SkuId}.html" title="${item.Name}">                  <em>${item.Name}</em>              </a>              <div class="p-price">                   <strong><em class="number J-p-${item.SkuId}">${item.JdPrc}</em></strong>              </div>              <div class="p-btnbox">                  <a class="btn btn-default" target="_blank" href="//gate.jd.com/InitCart.aspx?pid=${item.SkuId}&pcount=1&ptype=1">\u7acb\u5373\u62a2\u8d2d</a>              </div>        </li>        {/for}        </ul>    </div>';
        function g() {
            var a = $("#J-book-new");
            var b = $("#J-book-sale");
            $("#plist li").eq(0).attr("data-sku");
            new c({
                $el: a,
                skuHooks: "SKUS_610011",
                template: e,
                ext: {
                    title: "\u4e03\u65e5\u7545\u9500\u699c",
                    id: 1
                },
                param: {
                    p: 610011,
                    sku: params.thirdCatId,
                    lim: 6,
                    ck: "pin,ipLocation,atw"
                }
            });
            new c({
                $el: b,
                skuHooks: "SKUS_610012",
                template: e,
                ext: {
                    title: "\u65b0\u54c1\u70ed\u5356\u699c",
                    id: 2
                },
                param: {
                    p: 610012,
                    lim: 6,
                    c2: params.secondCatId,
                    c3: params.thirdCatId,
                    sku: params.thirdCatId,
                    ck: "pin,ipLocation,atw"
                }
            })
        }
        function h() {
            var a = readCookie("ipLoc-djd") ? readCookie("ipLoc-djd").split("-")[0] : 1;
            var b = "undefined" != typeof params && (params.thirdCatId || params.secondCatId);
            pageConfig.SKUS_hotsale = [];
            function c(a) {
                var b = $("#hotsale");
                b.html(f.process(a)),
                    d.priceNum({
                        skus: pageConfig.SKUS_hotsale,
                        $el: b
                    })
            }
            b && $.ajax({
                url: "//d.jd.com/hotbook/get?",
                data: {
                    cid3: b,
                    areaid: a
                },
                dataType: "jsonp",
                success: function(a) {
                    a && a.length && c({
                        data: a
                    })
                }
            })
        }
        a.reco = g,
            a.getHotsale = h
    });
/* product-list/1.0.4 selector.js Date:2016-05-12 16:42:00 */
define("//misc.360buyimg.com/product/list/1.0.4/js/selector.js", ["//misc.360buyimg.com/product/list/js/responsive.js"],
    function(require, a, b) {
        var c = require("//misc.360buyimg.com/product/list/js/responsive.js");
        var d = {};
        d.selectedEv = "",
            d.selectedAttr = [],
            d.getAttrValue = function(a, b) {
                var c = new RegExp("(^|\\?|&)" + a + "=([^&#]*)(\\s|&|$)", "i");
                var d = "";
                return c.test(b) && (d = c.exec(b), d = d[2]),
                    d
            },
            d.addAttr = function(a) {
                var a = a || "";
                var b = this.getAttrValue("ev", a);
                var c = d(b, /\%40|\@/);
                function d(a, b) {
                    b = b || "";
                    var c = a.split(b);
                    var d = [];
                    for (var e = 0; e < c.length; e++)"" !== c[e] && d.push(c[e]);
                    return d
                }
                b = c.splice(c.length - 1, 1).join("");
                var e = d(b, /\%5F|\_/);
                return this.selectedEv = e[0],
                    this.selectedAttr.push(e[1]),
                    this.selectedAttr.length
            },
            d.removeAttr = function(a) {
                var b = this.getAttrValue("ev", a);
                var c = b.split(/\%40|\@/);
                var d = "";
                for (var e in c) if (c.hasOwnProperty(e)) {
                    var f = c[e];
                    var g = f.split(/\%5F|\_/);
                    if (this.selectedEv == g[0]) {
                        d = g[1];
                        break
                    }
                }
                for (var h in this.selectedAttr) this.selectedAttr[h] === d && this.selectedAttr.splice(h, 1);
                return this.selectedAttr.length
            },
            d.getAttrUrl = function() {
                var a = window.location.href || "";
                var b = null;
                var c = a.replace(/(^|\\?|&)ev=([^&#]*)/g, "").replace(/#[a-zA-Z\d\-\.\_\~]*$/, "");
                var d = this.getAttrValue("ev", window.location.href);
                return a.match(/#([a-zA-Z\d\-\.\_\~]*)$/) && (b = a.match(/#([a-zA-Z\d\-\.\_\~]*)$/)[1]),
                d.indexOf("@") != d.length - 1 && d.indexOf("%40") != d.length - 1 && (d += "@"),
                c + "&ev=" + d + this.selectedEv + "_" + this.selectedAttr.join("%7C%7C") + (b ? "#" + b: "")
            },
            d.clean = function() {
                this.selectedEv = "",
                    this.selectedAttr = []
            };
        var e = {};
        e.init = function() {
            var a = this;
            this.wrap = $("#J_selector"),
                this.setMoreVisable(),
                this.fixSelectorStruct(),
                this.setMoreToggle(),
                this.setMultipleToggle(),
                this.setMultipleSelect(),
                this.setSelectorMoreToggle(),
                this.setBrandWordsTab(),
                this.setPriceBtnOnclick(),
                this.setResultSearchBtnOnclick(),
                c.bindEvent(function() {
                        a.setMoreVisable()
                    },
                    100)
        },
            e.removeSelected = function() {
                var a = $(".crumbs-nav-item a");
                var b = $("#J_selector .J_selectorLine[data-id]");
                a.each(function() {
                    var a = $(this).attr("data-id");
                    b.filter('[data-id="' + a + '"]').remove()
                })
            },
            e.resetBrandArea = function() {
                this.wrap.find(".J_valueList").scrollTop(0).find("li").show(),
                    this.wrap.find(".J_brandLetter").find("li:first").addClass("curr").siblings().removeClass("curr")
            },
            e.setMoreToggle = function() {
                var a = this;
                var b = this.wrap.find(".J_extMore");
                b.bind("click",
                    function() {
                        var c = $(this).parents(".J_selectorLine");
                        var d = c.find(".J_valueList");
                        $(this).hasClass("opened") ? (c.find(".sl-wrap").removeClass("extend"), $(this).html("\u66f4\u591a<i></i>").removeClass("opened"), $(this).parents(".J_selectorLine").hasClass("s-brand") && a.resetBrandArea(), d.scrollTop(0)) : (c.find(".sl-wrap").addClass("extend"), $(this).html("\u6536\u8d77<i></i>").addClass("opened"))
                    })
            },
            e.setMultipleToggle = function() {
                var a = this;
                var b = this.wrap.find(".J_extMultiple");
                var c = this.wrap.find(".J_btnsConfirm");
                var e = this.wrap.find(".J_btnsCancel");
                b.bind("click",
                    function() {
                        var c = $(this).parents(".J_selectorLine");
                        c.hasClass("s-brand") || 0 === $(".s-brand").find(".multiple").length || a.resetBrandArea(),
                            c.find(".sl-wrap").removeClass("extend").addClass("multiple"),
                            c.siblings().find(".multiple .J_btnsCancel").trigger("click")
                    }),
                    c.bind("click",
                        function(a) {
                            $(this).parents(".J_selectorLine");
                            $(this).hasClass("disabled") || (window.location = d.getAttrUrl()),
                                a.preventDefault(),
                                a.stopPropagation()
                        }),
                    e.bind("click",
                        function() {
                            var c = $(this).parents(".J_selectorLine");
                            var e = c.find(".J_valueList");
                            c.hasClass("s-brand") && a.resetBrandArea(),
                                c.find(".sl-wrap").removeClass("extend").removeClass("multiple").find(".J_extMore").html("\u66f4\u591a<i></i>").removeClass("opened"),
                                c.find(".J_btnsConfirm").addClass("disabled"),
                                c.find(".sl-ext").show(),
                                c.find(".J_brandSelected").hide().find(".sl-v-list").html(""),
                                d.clean(),
                                e.scrollTop(0).find(".selected").removeClass("selected")
                        })
            },
            e.setMultipleSelect = function() {
                var b = this.wrap.find(".J_valueList");
                var c = this.wrap.find(".J_brandSelected li a");
                var e = function(a, b, c) {
                    0 >= a ? (b.addClass("disabled"), c.hide()) : (b.removeClass("disabled"), c.show())
                };
                b.delegate("li a", "click",
                    function(a) {
                        var b = $(this).parents(".J_selectorLine");
                        var c = $(this).parent("li");
                        var f = b.find(".J_brandSelected");
                        var g = b.find(".J_btnsConfirm");
                        if (b.find(".sl-wrap").hasClass("multiple")) {
                            a.preventDefault(),
                                a.stopPropagation();
                            var h = $(this).attr("href");
                            var i = d.selectedAttr.length;
                            if (c.hasClass("selected")) i = d.removeAttr(h),
                                c.removeClass("selected"),
                            f.length && f.find('li[data-brand-id="' + c.attr("id") + '"]').remove();
                            else if (5 > i) {
                                if (i = d.addAttr(h), c.addClass("selected"), f.length) {
                                    var j = c.clone(!1);
                                    j.attr("data-brand-id", j.attr("id")).removeAttr("id").find("img").remove(),
                                        f.find(".sl-v-list").append(j)
                                }
                            } else alert("\u5df2\u9009\u6761\u4ef6\u4e0d\u80fd\u5927\u4e8e5\u4e2a");
                            e(i, g, f)
                        }
                    }),
                    c.live("click",
                        function(a) {
                            var b = $(this).parents(".J_selectorLine");
                            var c = $(this).parent("li");
                            var f = b.find(".J_valueList");
                            var g = b.find(".J_btnsConfirm");
                            var h = b.find(".J_brandSelected");
                            var i = $(this).attr("href");
                            a.preventDefault(),
                                a.stopPropagation(),
                                attrLength = d.removeAttr(i),
                                c.removeClass("selected"),
                                f.find("#" + c.attr("data-brand-id")).removeClass("selected"),
                                c.remove(),
                                e(attrLength, g, h)
                        })
            },
            e.fixSelectorStruct = function() {
                var a = this.wrap.find(".J_selectorLine");
                this.wrap.find(".J_selectorLine.s-brand");
                $.browser.msie && 6 == $.browser.version && a.after('<span class="clr"></span>')
            },
            e.regroupSelectorLine = function() {
                var a = this.wrap.find(".J_selectorLine");
                var b = this.wrap.find(".J_selectorLine.s-brand");
                var c = $("#J_selectorMore");
                var d = [];
                var e = $("#J_selectorSay");
                var f = $("#J_selectorSize");
                a.length > 4 && (f.length && (3 !== a.index(f) && a.eq(3).after(f), a = this.wrap.find(".J_selectorLine")), e.length && (a.eq(2).after(e), a = this.wrap.find(".J_selectorLine"))),
                    a.each(function(a) {
                        3 >= a ? $(this).show() : a > 3 && 8 > a ? ($(this).hide().addClass("J_selectorFold"), d.push($(this).find(".sl-key").find("span").text().replace("\uff1a", ""))) : $(this).hide().addClass("J_selectorFold"),
                        $.browser.msie && 6 == $.browser.version && $(this).after('<span class="clr"></span>')
                    }),
                    c.find(".sm-wrap").html("\u66f4\u591a\u9009\u9879\uff08" + d.join("\uff0c") + "\u7b49\uff09<i></i>"),
                b.find(".J_valueList").hasClass("v-fixed") || (b.find(".J_brandLetter").remove(), b.find(".J_brandSearch").remove(), b.find(".J_brandSelected").remove())
            },
            e.setSelectorMoreToggle = function() {
                var a = this;
                var b = this.wrap.find(".J_selectorLine");
                var c = this.wrap.find(".J_selectorFold");
                var d = $("#J_selectorMore");
                d.find(".sm-wrap").html();
                b.length <= 4 ? d.hide() : (d.show(), d.find(".sm-wrap").bind("click",
                    function() {
                        $(this).hasClass("opened") ? (b.each(function(a) {
                            3 >= a ? $(this).show() : $(this).hide().addClass(a > 3 && 8 > a ? "J_selectorFold": "J_selectorFold"),
                            $.browser.msie && 6 == $.browser.version && $(this).after('<span class="clr"></span>')
                        }), $(this).removeClass("opened").html("\u66f4\u591a\u9009\u9879\uff08" + $(this).attr("data-more") + "\uff09<i></i>")) : (c.show(), $(this).addClass("opened").html("\u6536\u8d77<i></i>"), a.setMoreVisable())
                    }))
            },
            e.setMoreVisable = function() {
                var a = this.wrap.find(".J_selectorLine");
                a.each(function() {
                    var b = $(this).find(".J_valueList");
                    var c = b.find("li");
                    var d = b.width();
                    var e = 0;
                    $(this).hasClass("s-brand") ? b.find("li").each(function(a) {
                        20 > a && (e += $(this).outerWidth(!0))
                    }) : c.each(function() {
                        e += $(this).outerWidth(!0)
                    }),
                        d >= e ? $(this).find(".J_extMore").css("visibility", "hidden") : $(this).find(".J_extMore").css("visibility", "visible"),
                    (c.length <= 5 || "J_selectorPrice" === $(this).attr("id") || "J_selectorCategory" === $(this).attr("id")) && $(this).find(".J_extMultiple").css("visibility", "hidden")
                })
            },
            e.setResultSearchBtnOnclick = function() {
                var a = "\u5728\u7ed3\u679c\u4e2d\u641c\u7d22";
                var b = function(b) {
                    var c = $.trim(b.val());
                    "" != c && c != a && (window.location.href = window.location.href.replace(/(^|\\?|&)sir_key=([^&#]*)/g, "") + "&sir_key=" + encodeURIComponent(c))
                };
                $("#resultSearchBtn").click(function() {
                    b($(this).prev())
                }).prev().focus(function() {
                    $.trim($(this).val()) == a && $(this).val("")
                }).blur(function() {
                    "" == $.trim($(this).val()) && $(this).val(a)
                }).keydown(function(a) {
                    13 == a.keyCode && b($(this))
                }),
                    $("#colseResultSearchBtn").click(function() {
                        window.location = window.location.href.replace(/(^|\\?|&)sir_key=([^&#]*)/g, "")
                    })
            },
            e.setPriceBtnOnclick = function() {
                $("#priceBtn").bind("click",
                    function() {
                        var b = $("#priceMin").val();
                        var c = $("#priceMax").val(); ("" != b || "" != c) && (("" == b || 0 >= b) && (b = "0"), b = "M" + parseInt(b), c = "" == c || 0 >= c ? "": "L" + parseInt(c), d.selectedAttr = [], d.selectedEv = "exprice", d.selectedAttr.push(b + c), window.location = d.getAttrUrl())
                    })
            },
            e.setBrandWordsTab = function() {
                var a = this.wrap || $("#J_selector");
                var b = a.find(".J_brandLetter");
                var c = a.find(".s-brand .J_valueList li");
                b.delegate("li", "mouseover",
                    function() {
                        var a = $(this).attr("data-initial");
                        "0" === a ? c.show() : c.each(function() {
                            $(this).attr("data-initial") === a ? $(this).show() : $(this).hide()
                        }),
                            $(this).addClass("curr").siblings().removeClass("curr")
                    })
            },
            e.setBrandWordsSearch = function() {
                var a = this.wrap.find(".s-brand");
                var b = a.find(".J_brandSearch");
                var c = a.find(".J_valueList");
                var d = a.find(".J_brandLetter");
                var e = b.find(".input-txt");
                var f = {
                    className: "placehoder",
                    text: e.attr("data-placehoder"),
                    enable: function() {
                        e.addClass(this.className).val(this.text)
                    },
                    disable: function() {
                        e.removeClass(this.className).val("")
                    }
                };
                f.enable(),
                    e.bind("focus",
                        function() {
                            var b = $.trim($(this).val());
                            b === f.text && f.disable()
                        }),
                    e.bind("blur",
                        function() {
                            var b = $.trim($(this).val());
                            0 === b.length && f.enable()
                        }),
                    e.bind("keyup",
                        function() {
                            var b = $.trim($(this).val());
                            var e = SEARCH.brand_ids ? SEARCH.brand_ids: "";
                            var f = {
                                key: b,
                                ids: e
                            };
                            d.find("li:first").addClass("curr").siblings().removeClass("curr"),
                                0 !== b.length ? $.ajax({
                                    url: "//bsearch.jd.com/",
                                    data: f,
                                    dataType: "jsonp",
                                    jsonpCallback: "call" + parseInt(1e5 * Math.random(), 10),
                                    success: function(a) {
                                        if ("undefined" != typeof a && a.length > 0) {
                                            c.find("li").css("display", "none");
                                            for (var b in a) c.find("#brand-" + a[b].id).css("display", "block")
                                        } else c.find("li").css("display", "none")
                                    }
                                }) : c.find("li").css("display", "block")
                        })
            },
            pageConfig.setBrandWordsTab = e.setBrandWordsTab,
            b.exports = e
    });
/* product-list/1.0.4 promotion.js Date:2015-10-13 13:54:00 */
define("//misc.360buyimg.com/product/list/1.0.4/js/promotion.js", [],
    function(require, a, b) {
        function c(a, b, c) {
            this.ids = a || !1,
                this.prefix = b || "#prom-wrap-",
                this.adType = c || "8",
                this.init()
        }
        c.prototype.init = function() {
            this.ids && this.renderPromotion()
        },
            c.prototype.renderPromotion = function() {
                var a = this;
                var b = this.ids.split(",");
                this.getPromotionDate(function(c) {
                    for (var d = 0; d < b.length; d++) {
                        var e = b[d].replace(/:\S*/g, "");
                        var f = a.getPromotionTpl(e);
                        var g = a.prefix + e;
                        if (c[e] && c[e].length > 0) {
                            var h = {
                                data: c[e],
                                id: e
                            };
                            var i = f.process(h);
                            $(g).html(i),
                                $(c[e]).each(function(b) {
                                    a.newImage(c[e][b].exposal_url, !1)
                                }),
                                a.setClick(g)
                        }
                    }
                })
            },
            c.prototype.getPromotionDate = function(a) {
                var a = a ||
                    function() {};
                var c = {
                    ad_ids: this.ids,
                    template: 0,
                    urlcid3: SEARCH.adv_param && SEARCH.adv_param.cid3 ? SEARCH.adv_param.cid3: "",
                    ad_type: this.adType,
                    spread_type: 1
                };
                $.ajax({
                    url: "//x.jd.com/ShowInterface",
                    data: c,
                    dataType: "jsonp",
                    jsonpCallback: "call" + parseInt(1e5 * Math.random(), 10),
                    success: function(b) {
                        a(b)
                    }
                })
            },
            c.prototype.setClick = function(a) {
                var b = this;
                $(a).find("a").bind("click",
                    function() {
                        var c = $(this).attr("data-charge");
                        c && b.newImage(c, !1)
                    })
            },
            c.prototype.getPromotionTpl = function(a) {
                pageConfig["SKUS_HOOK" + a] = [];
                var b = "";
                return b = "94" == a ? '{for item in data}{if item_index < 20}<a target="_blank" href="${item.click_url}" data-sku="${pageConfig["SKUS_HOOK"+id].push(item.sku_id)}" onclick=\'log("search", "list", "${encodeURI(location.href)}", "${pageConfig.queryParam.c3}", "9", "4", "${params.abTestFlag}")\'><img width="${item.width}" src="//img30.360buyimg.com/pop/${item.image_url}"></a>{/if}{/for}': "60" == a ? '{for item in data}{if item_index < 20}<div class="ab-pic" data-sku="${pageConfig["SKUS_HOOK"+id].push(item.sku_id)}"  onclick=\'log("search", "list", "${encodeURI(location.href)}", "${pageConfig.queryParam.c3}", "9", "${Number(item_index)+1}", "${params.abTestFlag}")\'><a  target="_blank" href="${item.click_url}"><img width="${item.width}" src="//img12.360buyimg.com/n7/${item.image_url}"></a></div>{/if}{/for}': '{for item in data}{if item_index < 20}<a  target="_blank" href="${item.click_url}"><img width="${item.width}" src="//img12.360buyimg.com/n2/${item.image_url}"></a>{/if}{/for}'
            },
            c.prototype.newImage = function(a, b, c) {
                var d = new Image;
                a = b ? a + "&random=" + Math.random() + new Date: a,
                    d.setAttribute("src", a),
                    d.onload = function() {
                        "undefined" != typeof c && c(a)
                    }
            },
            b.exports = c
    });
/* product-list/1.0.4 goodsList.js Date:2016-05-17 21:41:48 */
define("//misc.360buyimg.com/product/list/1.0.4/js/goodsList.js", ["//misc.360buyimg.com/jdf/1.0.0/ui/switchable/1.0.0/switchable.js", "//misc.360buyimg.com/jdf/1.0.0/unit/follow/1.0.0/follow.js"],
    function(require, a, b) {
        require("//misc.360buyimg.com/jdf/1.0.0/ui/switchable/1.0.0/switchable.js");
        var d = require("//misc.360buyimg.com/jdf/1.0.0/unit/follow/1.0.0/follow.js");
        var e = {};
        e.init = function() {
            this.wrap = $("#J_main").find(".J-goods-list"),
                this.setItemHover(),
                this.setTabHover(),
                this.setImgTab(),
                this.setImgSlider(),
                this.setSkuFocus(),
                this.setSkuNotification()
        },
            e.setItemHover = function() {
                var a = this;
                this.wrap.find(".gl-item").bind("mouseenter",
                    function() {
                        a.wrap.hasClass("gl-type-5") || $(this).addClass("hover")
                    }).bind("mouseleave",
                    function() {
                        $(this).removeClass("hover")
                    })
            },
            e.setTabHover = function() {
                this.wrap.find(".gl-i-tab-trigger .item").bind("mouseenter",
                    function() {
                        var b = $(this).index();
                        var c = $(this).parents(".gl-i-tab-trigger").siblings(".gl-i-tab-content").find(".tab-content-item").eq(b);
                        $(this).addClass("selected").siblings().removeClass("selected"),
                            c.addClass("tab-cnt-i-selected").siblings().removeClass("tab-cnt-i-selected"),
                            c.lazyload()
                    })
            },
            e.setImgTab = function() {
                var a = this.wrap.find(".p-scroll");
                if (a.length > 0) {
                    var b = $("#plist").hasClass("gl-type-3") ? "/n7/": "/n8/";
                    a.find("li").bind("mouseenter",
                        function() {
                            var c = $(this).parents(".gl-item");
                            var d = $(this);
                            var e = d.find("img");
                            var f = c.find(".p-img");
                            var g = c.find(".p-name");
                            var h = c.find(".p-focus");
                            var i = c.find(".p-commit");
                            var j = $(this).find("img").attr("src").replace("/n9/", b);
                            var k = $(this).find("img").attr("data-sku");
                            var l = f.find("a").attr("href").replace(/\/\d{6,}/, "/" + k);
                            e.data("url") && (l = e.data("url")),
                                f.find("a").attr("href", l),
                                f.find("img").attr("src", j),
                                g.children("a").attr("href", l),
                                h.find("a").attr("data-sku", k),
                                i.find("a").attr("href", l + "#comment"),
                                $(this).find("a").addClass("curr").end().siblings().find("a").removeClass("curr")
                        })
                }
            },
            e.setImgSlider = function() {
                var a = this.wrap.find(".p-scroll");
                a.length > 0 && a.each(function() {
                    $(this).find(".ps-item").length > 6 && ($(this).addClass("scrolled"), $(this).switchable({
                        bodyClass: "ps-wrap",
                        contentClass: "ps-main",
                        mainClass: "ps-item",
                        mainSelectedClass: "curr",
                        prevClass: "ps-prev",
                        nextClass: "ps-next",
                        pagCancelClass: "disabled",
                        type: "imgscroll",
                        step: 1,
                        autoLock: !0,
                        hasPage: !0,
                        visible: 5,
                        speed: 200,
                        event: "mouseover",
                        width: 34
                    }))
                })
            },
            e.setSkuFocus = function() {
                return "undefined" != typeof window.searchUnit.followInited ? !1 : ($("body").delegate(".J_focus", "click",
                    function(a) {
                        var b = $(this);
                        var c = b.attr("data-sku");
                        d.add(c,
                            function() {
                                b.hasClass("focus") ? b.html("<i></i>\u5df2\u5173\u6ce8").addClass("focused") : b.html("<i></i>\u5df2\u5173\u6ce8").parent().addClass("p-focused")
                            },
                            {
                                isShowInfo: !1
                            }),
                            a.preventDefault()
                    }), void(window.searchUnit.followInited = !0))
            },
            e.setSkuNotification = function() {
                return searchUnit.notifyInited ? !1 : void seajs.use("//misc.360buyimg.com/jdf/1.0.0/unit/notif/1.0.0/notif.js",
                    function(a) {
                        a({
                            el: $(".J_notification")
                        }),
                            searchUnit.notifyInited = !0
                    })
            },
            b.exports = e
    });
/* product-list/1.0.4 backtop.js Date:2015-09-24 20:29:17 */
define("//misc.360buyimg.com/product/list/1.0.4/js/backtop.js", ["//misc.360buyimg.com/jdf/1.0.0/ui/fixable/1.0.0/fixable.js"],
    function(require, a, b) {
        require("//misc.360buyimg.com/jdf/1.0.0/ui/fixable/1.0.0/fixable.js");
        function d(a, b, c) {
            this.id = a ? a: "backtop",
                this.top = b ? b: 500,
                this.speed = c ? c: 300,
                this.wrap = $('<div id="' + this.id + '"></div>'),
            $("#J-global-toolbar").length < 1 && this.init()
        }
        d.prototype.init = function() {
            var a = this;
            $(document).ready(function() {
                a.randerHtml(),
                    a.hide(),
                    a.fixPostion(),
                    a.bindEvent()
            })
        },
            d.prototype.randerHtml = function() {
                var a = '<div class="b-item"><a class="b-i-survey" href="//surveys.jd.com/index.php?r=survey/index/sid/73453/lang/zh-Hans" target="_blank" class="survey">\u610f\u89c1\u53cd\u9988</a></div><div class="b-item"><a class="b-i-back" href="#none">\u8fd4\u56de\u9876\u90e8</a></div>';
                this.wrap.html(a),
                    $("body").append(this.wrap)
            },
            d.prototype.fixPostion = function() {
                this.wrap.fixable({
                    x: "right",
                    y: "bottom",
                    xValue: 20,
                    yValue: 70
                })
            },
            d.prototype.show = function() {
                this.wrap.show()
            },
            d.prototype.hide = function() {
                this.wrap.hide()
            },
            d.prototype.bindEvent = function() {
                var a = this;
                $(window).bind("scroll",
                    function() {
                        $(this).scrollTop() <= a.top ? a.hide() : a.show()
                    }),
                    this.wrap.find(".b-i-back").bind("click",
                        function() {
                            $("body, html").animate({
                                    scrollTop: 0
                                },
                                a.speed)
                        })
            },
            b.exports = d
    });
/* product-list/1.0.4 promotionGoods.js Date:2016-03-29 20:02:57 */
define("//misc.360buyimg.com/product/list/1.0.4/js/promotionGoods.js", ["//misc.360buyimg.com/product/list/1.0.4/js/tools.js", "//misc.360buyimg.com/product/list/1.0.4/js/recommend.js"],
    function(require, a, b) {
        var c = require("//misc.360buyimg.com/product/list/1.0.4/js/tools.js");
        var d = require("//misc.360buyimg.com/product/list/1.0.4/js/recommend.js");
        function e(a, b, c, d) {
            this.ids = a || !1,
                this.prefix = b || "#prom-wrap-",
                this.tplType = c || "ab-goods",
                this.keyWord = d || "";
            var e = readCookie("ipLoc-djd");
            this.areaId = e ? e.split("-")[0] : "1",
                this.init()
        }
        e.prototype.init = function() {
            this.ids && this.renderPromotion()
        },
            e.prototype.renderPromotion = function() {
                var a = this;
                var b = this.ids.split(",");
                pageConfig.prom = {},
                    this.getPromotionDate(function(e) {
                        if ("undefined" != typeof e) for (var f = 0; f < b.length; f++) {
                            var g = b[f].replace(/:\S*/g, "");
                            var h = a.prefix + g;
                            var i = g;
                            if (a.promId = g, e[i]) {
                                var j = a.getPromotionTpl(g);
                                var k = {
                                    data: e[i],
                                    id: g
                                };
                                var l = j.process(k);
                                $(h).find(".mc").html(l),
                                    $(h).show();
                                var m = [];
                                for (var n in k.data) k.data.hasOwnProperty(n) && (m.push(k.data[n].sku_id), a.newImage(k.data[n].exposal_url, !1));
                                c.priceNum({
                                    skus: m,
                                    $el: $(h),
                                    selector: ".J-prom-p-",
                                    text: "{NUM}"
                                }),
                                    c.promTag({
                                        skus: m
                                    }),
                                    a.setClick(h),
                                    a.triggerLog(g)
                            } else if (0 === $(".J_abGoodsRecProcess").length) {
                                var o = $("#J_goodsList").find("li");
                                var p = [];
                                for (var q = 0; q < o.length && 3 >= q; q++) {
                                    var r = o.eq(q).attr("data-sku");
                                    r && p.push(r)
                                } {
                                    new d(h + " .mc", "ab-goods", 902022, p.join(","), 8,
                                        function(a) {
                                            var b = a.parents(".ab-goods");
                                            b.find(".mt").find("h3").html("\u7cbe\u54c1\u63a8\u8350"),
                                                b.show()
                                        })
                                }
                                $(h).addClass("J_abGoodsRecProcess")
                            }
                            a.newImage(e[g][0].exposal_url, !1)
                        }
                    })
            },
            e.prototype.getPromotionDate = function(a) {
                var a = a ||
                    function() {};
                var c = {
                    ad_ids: this.ids,
                    ad_type: 7,
                    template: 0,
                    spread_type: 1,
                    urlcid3: SEARCH.adv_param.cid3
                };
                if (window.SEARCH && window.SEARCH.adv_param) {
                    var d = window.SEARCH.adv_param;
                    for (var e in d) d.hasOwnProperty(e) && d[e] && (c[e] = d[e])
                }
                $.ajax({
                    url: "//x.jd.com/ShowInterface",
                    data: c,
                    dataType: "jsonp",
                    jsonpCallback: "call" + parseInt(1e5 * Math.random(), 10),
                    success: function(b) {
                        a(b)
                    }
                })
            },
            e.prototype.triggerLog = function(a) {
                log("search", "list", location.href, pageConfig.queryParam.c3, "8", "1", pageConfig["SKUS_HOOK" + a].join("_"), params.abTestFlag)
            },
            e.prototype.getPromotionTpl = function(a) {
                a = a || "47";
                var b = "";
                switch (pageConfig["SKUS_HOOK" + a] = [], a) {
                    case "46":
                        return b = '<ul data=type="46" class="clearfix">{for item in data}{if item_index < 20}<li data-sku="${pageConfig["SKUS_HOOK"+id].push(item.sku_id)}" data-charge="${item.exposal_url}" onclick=\'log("search", "list", "${encodeURI(location.href)}", "${pageConfig.queryParam.c3}", "8", "1", "${item.sku_id}", "2", "${Number(item_index)+1}", "${params.abTestFlag}")\'>      <a class="p-img" target="_blank" href="${item.click_url}" title="${item.ad_title}">          <img width="100" height="100" data-img="1" src="//img12.360buyimg.com/n4/${item.image_url}" class="err-product">      </a>      <a class="p-name" target="_blank" href="${item.click_url}" title="${item.ad_title}">          <em>${item.ad_title}</em>      </a>      <div class="p-price">           <span>\u7279\u4ef7\uff1a</span><strong><em>\xa5</em><em class="number J-prom-p-${item.sku_id}"></em></strong>      </div>      <div class="p-btnbox">      <a class="btn btn-default" target="_blank" href="//gate.jd.com/InitCart.aspx?pid=${item.sku_id}&pcount=1&ptype=1">\u7acb\u5373\u62a2\u8d2d</a>      </div></li>{/if}{/for}</ul>';
                    case "47":
                        return b = '                <ul data=type="47" class="clearfix">                {for item in data}                {if item_index < 20}                <li data-sku="${pageConfig["SKUS_HOOK"+id].push(item.sku_id)}" data-charge="${item.exposal_url}" onclick=\'log("search", "list", "${encodeURI(location.href)}", "${pageConfig.queryParam.c3}", "8", "2", "${item.sku_id}", "2", "${Number(item_index)+1}", "${params.abTestFlag}")\'>                  <div class="p-img">                      <a target="_blank" href="${item.click_url}" title="${item.ad_title}">                          <img width="190" height="190" data-img="1" src="//img13.360buyimg.com/cms/s190x190_${item.image_url}" class="err-product">                      </a>                  </div>                  <div class="p-name">                      <a target="_blank" href="${item.click_url}" title="${item.ad_title}">                          <em>${item.ad_title}</em>                      </a>                  </div>                  <div class="p-price">                      <strong class="price"><em>\xa5</em><span class="J-prom-p-${item.sku_id}"></span></strong>                      <span class="p-ico J-pt-${item.sku_id}"></span>                      {if item.ad_send_type=="1"}<i class="goods-icons goods-icons-s7" title="\u8d27\u5230\u4ed8\u6b3e">\u8d27\u5230\u4ed8\u6b3e</i>{/if}                  </div>                  <div class="p-review">                      <a href="//item.jd.com/${item.sku_id}.html#comment" target="_blank" class="number">${item.good_comments}</a>\u4eba\u597d\u8bc4                  </div>                </li>                {/if}                {/for}                </ul>';
                    case "48":
                        return b = '                <ul data-type="48" class="goods-chosen-list clearfix">                {for item in data}                {if item_index < 20}                <li data-sku="${pageConfig["SKUS_HOOK"+id].push(item.sku_id)}" data-charge="${item.exposal_url}" onclick=\'log("search", "list", "${encodeURI(location.href)}", "${pageConfig.queryParam.c3}", "8", "8", "${item.sku_id}", "2", "${Number(item_index)+1}", "${params.abTestFlag}")\'>                  <div class="p-img">                      <a target="_blank" href="${item.click_url}" title="${item.ad_title}">                          <img width="190" height="190" data-img="1" src="//img13.360buyimg.com/cms/s190x190_${item.image_url}" class="err-product">                      </a>                  </div>                  <div class="p-name">                      <a target="_blank" href="${item.click_url}" title="${item.ad_title}">                          <em>${item.ad_title}</em>                      </a>                  </div>                  <div class="p-price">                      <strong class="price"><em>\xa5</em><span class="J-prom-p-${item.sku_id}"></span></strong>                      <span class="p-ico J-pt-${item.sku_id}"></span>                      {if item.ad_send_type=="1"}<i class="goods-icons goods-icons-s7" title="\u8d27\u5230\u4ed8\u6b3e">\u8d27\u5230\u4ed8\u6b3e</i>{/if}                  </div>                  <div class="p-review">                      <a href="//item.jd.com/${item.sku_id}.html#comment" target="_blank" class="number">${item.good_comments}</a>\u4eba\u597d\u8bc4                  </div>                </li>                {/if}                {/for}                </ul>';
                    default:
                        return "not found"
                }
            },
            e.prototype.newImage = function(a, b, c) {
                var d = new Image;
                a = b ? a + "&random=" + Math.random() + new Date: a,
                    d.setAttribute("src", a),
                    d.onload = function() {
                        "undefined" != typeof c && c(a)
                    }
            },
            e.prototype.setClick = function(a) {
                var b = this;
                $(a).find(".mc").find("li").bind("click",
                    function() {
                        b.newImage($(this).attr("data-charge"), !1)
                    })
            },
            pageConfig.getSearchID = function(a) {
                return "2" == a ? "82": "6" == a ? "81": void 0
            },
            b.exports = e
    });
/* product-list/1.0.4 dsp.js Date:2016-05-27 00:01:32 */
define("//misc.360buyimg.com/product/list/1.0.4/js/dsp.js", ["//misc.360buyimg.com/jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js", "//misc.360buyimg.com/product/list/1.0.4/js/tools.js"],
    function(require, a, b) {
        require("//misc.360buyimg.com/jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js");
        var d = require("//misc.360buyimg.com/product/list/1.0.4/js/tools.js");
        function e(a, b) {
            return Object.prototype.toString.call(b) === "[object " + a + "]"
        }
        var f = function(a) {
            if (this.url = a.url || "//x.jd.com/ShowInterface", this.ids = a.ids, this.adType = a.adType || 7, this.sType = a.sType || 1, this.vType = a.vType || 1, this.newList = a.newList || 1, this.urlcid3 = a.urlcid3 || "", this.param = a.param || {},
                    this.callback = a.callback ||
                        function() {},
                    this.selector = a.selector || "#J_promGoodsWrap_{aid}", this.currentAid, this.count = 1, !this.ids) throw new Error("No ad_ids.");
            this.init()
        };
        f.prototype = {
            init: function() {
                this.get()
            },
            get: function() {
                var a = this;
                var b = $.extend({
                        ad_ids: this.ids.join(","),
                        ad_type: this.adType,
                        spread_type: this.sType,
                        cai_type: this.vType,
                        cid: "",
                        new_list: this.newList
                    },
                    this.param);
                if (window.SEARCH && window.SEARCH.adv_param) {
                    var c = window.SEARCH.adv_param;
                    var d = [];
                    for (var e in c) c.hasOwnProperty(e) && c[e] && ("cid1" === e || "cid2" === e || "cid3" === e ? d.push(c[e]) : b[e] = c[e]);
                    b.cid = d.join("-")
                }
                $.ajax({
                    url: this.url,
                    data: b,
                    cache: !0,
                    dataType: "jsonp",
                    success: function(b) {
                        b && a.handleData(b)
                    }
                })
            },
            handleData: function(a) {
                for (var b in a) a.hasOwnProperty(b) && this.set(a, b)
            },
            set: function(a, b) {
                this.currentAid = Number(b),
                    this.$el = $(this.selector.replace("{aid}", b)),
                    pageConfig["SKUS_dsp_" + b] = [],
                    pageConfig["SKUS_dsp_log" + b] = [];
                var c = e("Array", a[this.currentAid]) && a[this.currentAid].length > 0;
                var f = this.getTemplate(this.currentAid);
                var g = {
                    aid: this.currentAid,
                    data: a[this.currentAid]
                };
                if (c) {
                    try {
                        this.$el.html(f.process(g))
                    } catch(h) {
                        console.log("[Aid: " + b + "] render error." + h)
                    }
                    this.$el.show()
                }
                d.priceNum({
                    skus: pageConfig["SKUS_dsp_" + b],
                    $el: this.$el
                }),
                    d.promTag({
                        skus: pageConfig["SKUS_dsp_" + b]
                    }),
                    this.dspLog(),
                    this.log(),
                    this.setLog(pageConfig["SKUS_dsp_log" + b]),
                    this.callback.apply(this, [b, c])
            },
            setLog: function(a) {
                for (var b = 0; b < a.length; b++) a[b] && this.newImage(a[b])
            },
            log: function() {
                log("search", "list", location.href, pageConfig.queryParam.c3, "8", "1", pageConfig["SKUS_dsp_" + this.currentAid].join("_"), params.abTestFlag)
            },
            newImage: function(a) {
                var b = new Image;
                b.setAttribute("src", a),
                    b = null
            },
            dspLog: function() {
                this.$el.delegate("[data-charge]", "click",
                    function() {
                        var a = $(this).attr("data-charge");
                        var b = new Image;
                        b.setAttribute("src", a)
                    })
            },
            getTemplate: function(a) {
                var b = "";
                return pageConfig.pushToArray = function(a, b) {
                    return "undefined" != typeof a && a && b.push(a),
                        a
                },
                743 == a && (b = '                {for item in data}                {var itemUrl = item.click_url||"//item.jd.com/"+item.sku_id+".html"}                <a  target="_blank" href="${itemUrl}"                     data-sku="${pageConfig.pushToArray(item.sku_id, pageConfig["SKUS_dsp_"+aid])}${pageConfig.pushToArray(item.exposal_url, pageConfig["SKUS_dsp_log"+aid])}"                     onclick=\'log("search", "list", "${encodeURI(location.href)}", "${pageConfig.queryParam.c3}", "9", "4", "${params.abTestFlag}")\'>                    <img width="${item.width}" src="//img30.360buyimg.com/pop/${item.image_url}">                </a>                {/for}'),
                (650 == a || 742 == a) && (b = '                <div class="mt"> <h3>\u63a8\u5e7f\u5546\u54c1</h3> </div>                <div class="mc">                    <ul data=type="${aid}" class="clearfix">                    {for item in data}                    {var itemUrl = item.click_url||"//item.jd.com/"+item.sku_id+".html"}                    {if item_index < 20}                    <li data-sku="${pageConfig.pushToArray(item.sku_id, pageConfig["SKUS_dsp_"+aid])}${pageConfig.pushToArray(item.exposal_url, pageConfig["SKUS_dsp_log"+aid])}" onclick=\'log("search", "list", "${encodeURI(location.href)}", "${pageConfig.queryParam.c3}", "8", "2", "${item.sku_id}", "2", "${Number(item_index)+1}", "${params.abTestFlag}")\'>                      <div class="p-img">                          <a target="_blank" href="${itemUrl}" title="${item.ad_title}">                              <img width="190" height="190" data-img="1" src="//img13.360buyimg.com/cms/s190x190_${item.image_url}" class="err-product">                          </a>                          {if item.icon_url}                          <div style="background:url(&quot;${item.icon_url}&quot;) no-repeat 0 0;_background-image:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=&quot;${item.icon_url}&quot;,sizingMethod=&quot;noscale&quot;);" shop_id="0" class="picon"></div>                          {/if}                      </div>                      <div class="p-name">                          <a target="_blank" href="${itemUrl}" title="${item.ad_title}">                              {if item.worldwide=="2"}                              <i title="\u5168\u7403\u8d2d" class="goods-icons-s6">\u5168\u7403\u8d2d</i>                               {/if}                              <em>${item.ad_title}</em>                          </a>                      </div>                      <div class="p-price">                          <strong class="price"><span class="J-p-${item.sku_id}"></span></strong>                          <span class="p-ico J-pt-${item.sku_id}"></span>                          {if item.ad_send_type=="1"}<i class="goods-icons goods-icons-s7" title="\u8d27\u5230\u4ed8\u6b3e">\u8d27\u5230\u4ed8\u6b3e</i>{/if}                      </div>                      <div class="p-review">                          {if item.good_comments!=""}                          <a href="//item.jd.com/${item.sku_id}.html#comment" target="_blank" class="number">${item.good_comments}</a>\u4eba\u597d\u8bc4                          {/if}                      </div>                    </li>                    {/if}                    {/for}                    </ul>                </div>'),
                47 === a && (b = '                <div class="mt"> <h3>\u63a8\u5e7f\u5546\u54c1</h3> </div>                <div class="mc">                    <ul data=type="${aid}" class="clearfix">                    {for item in data}                    {var itemUrl = item.click_url||"//item.jd.com/"+item.sku_id+".html"}                    {if item_index < 20}                    <li data-sku="${pageConfig["SKUS_dsp_"+aid].push(item.sku_id)}${pageConfig["SKUS_dsp_log"+aid].push(item.exposal_url)}" onclick=\'log("search", "list", "${encodeURI(location.href)}", "${pageConfig.queryParam.c3}", "8", "2", "${item.sku_id}", "2", "${Number(item_index)+1}", "${params.abTestFlag}")\'>                      <div class="p-img">                          <a target="_blank" href="${itemUrl}" title="${item.ad_title}">                              <img width="190" height="190" data-img="1" src="//img13.360buyimg.com/cms/s190x190_${item.image_url}" class="err-product">                          </a>                          {if item.icon_url}                          <div style="background:url(&quot;${item.icon_url}&quot;) no-repeat 0 0;_background-image:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=&quot;${item.icon_url}&quot;,sizingMethod=&quot;noscale&quot;);" shop_id="0" class="picon"></div>                          {/if}                      </div>                      <div class="p-name">                          <a target="_blank" href="${itemUrl}" title="${item.ad_title}">                              {if item.worldwide=="2"}                              <i title="\u5168\u7403\u8d2d" class="goods-icons-s6">\u5168\u7403\u8d2d</i>                               {/if}                              <em>${item.ad_title}</em>                          </a>                      </div>                      <div class="p-price">                          <strong class="price"><span class="J-p-${item.sku_id}"></span></strong>                          <span class="p-ico J-pt-${item.sku_id}"></span>                          {if item.ad_send_type=="1"}<i class="goods-icons goods-icons-s7" title="\u8d27\u5230\u4ed8\u6b3e">\u8d27\u5230\u4ed8\u6b3e</i>{/if}                      </div>                      <div class="p-review">                          {if item.good_comments!=""}                          \u5df2\u6709<a href="//item.jd.com/${item.sku_id}.html#comment" target="_blank" class="number">${item.good_comments}</a>\u4eba\u8bc4\u4ef7                          {/if}                      </div>                    </li>                    {/if}                    {/for}                    </ul>                </div>'),
                (48 === a || 743 === a) && (b = '                <div class="mt"><strong class="mt-title">\u5546\u54c1\u7cbe\u9009</strong></div>                <div class="mc">                    <ul data-type="${aid}" class="goods-chosen-list clearfix">                    {for item in data}                    {var itemUrl = item.click_url||"//item.jd.com/"+item.sku_id+".html"}                    {if item_index < 20}                    <li data-sku="${pageConfig["SKUS_dsp_" + aid].push(item.sku_id)}${pageConfig.pushToArray(item.exposal_url, pageConfig["SKUS_dsp_log" + aid])}"                         onclick=\'log("search", "list", "${encodeURI(location.href)}", "${pageConfig.queryParam.c3}", "8", "8", "${item.sku_id}", "2", "${Number(item_index)+1}", "${params.abTestFlag}")\'>                      <div class="p-img">                          <a target="_blank" href="${itemUrl}" title="${item.ad_title}">                              <img width="190" height="190" data-img="1" src="//img13.360buyimg.com/cms/s190x190_${item.image_url}" class="err-product">                          </a>                      </div>                      <div class="p-name">                          <a target="_blank" href="${itemUrl}" title="${item.ad_title}">                              <em>${item.ad_title}</em>                          </a>                      </div>                      <div class="p-price">                          <strong class="price"><span class="J-p-${item.sku_id}"></span></strong>                          <span class="p-ico J-pt-${item.sku_id}"></span>                          {if item.ad_send_type=="1"}<i class="goods-icons goods-icons-s7" title="\u8d27\u5230\u4ed8\u6b3e">\u8d27\u5230\u4ed8\u6b3e</i>{/if}                      </div>                      <div class="p-review">                          {if item.good_comments!=""}                          <a href="//item.jd.com/${item.sku_id}.html#comment" target="_blank" class="number">${item.good_comments}</a>\u4eba\u597d\u8bc4                          {/if}                      </div>                    </li>                    {/if}                    {/for}                    </ul>                </div>'),
                46 === a && (b = '                <div class="hd">\u70ed\u5356\u63a8\u8350</div>                <div class="bd mc">                    <ul data-type="${aid}" class="mc list-h clearfix">                    {for item in data}                    {var itemUrl = item.click_url||"//item.jd.com/"+item.sku_id+".html"}                    {if item_index < 20}                    <li data-sku="${pageConfig["SKUS_dsp_" + aid].push(item.sku_id)}${pageConfig.pushToArray(item.exposal_url, pageConfig["SKUS_dsp_log" + aid])}" onclick=\'log("search", "list", "${encodeURI(location.href)}", "${pageConfig.queryParam.c3}", "8", "1", "${item.sku_id}", "2", "${Number(item_index)+1}", "${params.abTestFlag}")\'>                          <a class="p-img" target="_blank" href="${itemUrl}" title="${item.ad_title}">                              <img width="100" height="100" data-img="1" src="//img12.360buyimg.com/n4/${item.image_url}" class="err-product">                          </a>                          <a class="p-name" target="_blank" href="${itemUrl}" title="${item.ad_title}">                              <em>${item.ad_title}</em>                          </a>                          <div class="p-price">                               <strong><em class="number J-p-${item.sku_id}"></em></strong>                          </div>                          <div class="p-btnbox">                              <a class="btn btn-default" target="_blank" href="//gate.jd.com/InitCart.aspx?pid=${item.sku_id}&pcount=1&ptype=1">\u7acb\u5373\u62a2\u8d2d</a>                          </div>                    </li>                    {/if}                    {/for}                    </ul>                </div>'),
                547 === a && (b = '                {for item in data}                    <div class="ab-pic"                         data-sku="${pageConfig.pushToArray(item.sku_id, pageConfig["SKUS_dsp_"+aid])}${pageConfig.pushToArray(item.exposal_url, pageConfig["SKUS_dsp_log" + aid])}"                         onclick=\'log("search", "list", "${encodeURI(location.href)}", "${pageConfig.queryParam.c3}", "9", "${Number(item_index)+1}", "${params.abTestFlag}")\'>                        <a target="_blank" href="${item.click_url}">                           <img width="${item.width}" src="//img12.360buyimg.com/n7/${item.image_url}">                        </a>                    </div>                {/for}'),
                    b
            }
        },
            b.exports = f
    });
/* product-list/1.0.4 carButler.js Date:2016-04-19 15:02:06 */
define("//misc.360buyimg.com/product/list/1.0.4/widget/carButler/carButler.js", ["//misc.360buyimg.com/jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js"],
    function(require, a, b) {
        require("//misc.360buyimg.com/jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js");
        var d = {
            9248 : "6",
            9971 : "11",
            11849 : "1",
            11850 : "1",
            11852 : "2",
            6767 : "5",
            6766 : "13",
            11859 : "8",
            13244 : "9",
            6756 : "10",
            6768 : "12"
        };
        var e = {};
        var f = {
            brand: "//autobeta.jd.com/queryBrands",
            series: "//autobeta.jd.com/querySeries",
            year: "//autobeta.jd.com/querySeriesYear",
            model: "//autobeta.jd.com/queryModel"
        };
        var g = '{for brand in brandList}<li class="hide" data-initial="${brand.initial}" data-id="${brand.brandId}"> <img src="${pageConfig.FN_GetImageDomain(brand_index)}n1/s48x48_${brand.logoUrl}"> <a href="javascript:void(0)">${brand.brandName}</a></li>{/for}{for brand in hotBrands}<li class="J-hot" data-id="${brand.brandId}"> <img src="${pageConfig.FN_GetImageDomain(brand_index)}n1/s48x48_${brand.logoUrl}"> <a href="javascript:void(0)">${brand.brandName}</a></li>{/for}';
        var h = '{for seriesList in data}<div class="menu-brand-title"><i></i>${seriesList_index}</div><ul class="menu-drop-list">   {for series in seriesList}   <li data-id="${series.seriesId}"><a href="javascript:void(0)">${series.seriesName}</a></li>   {/for}</ul>{/for}';
        var i = '{for series in data}<li data-id="${series.seriesYearId}"> <a href="javascript:void(0)">${series.seriesYear}</a></li>{/for}';
        var j = '{for model in data}<li data-id="${model.modelId}"> <a href="javascript:void(0)">${model.modelName}</a></li>{/for}';
        function k() {
            this.$el = $(".car-filter"),
                this.$carBrand = this.$el.find(".car-filter-item1"),
                this.$carSeries = this.$el.find(".car-filter-item2"),
                this.$carYear = this.$el.find(".car-filter-item3"),
                this.$carModel = this.$el.find(".car-filter-item4"),
                this.$searchButton = this.$el.find(".car-filter-btn"),
                this.loadBrandList(),
                this.bindEvent(),
                this.carModelId = null,
                this.$searchButton.html("\u67e5\u627e" + window.params.thirdCatName)
        }
        $.extend(k.prototype, {
            loadBrandList: function() {
                var a = this;
                a._get(f.brand,
                    function(b) {
                        var c = m(b.data);
                        a.$carBrand.find(".menu-drop-list").html(g.process({
                            brandList: b.data,
                            hotBrands: c
                        }))
                    })
            },
            loadSeriesList: function() {
                var a = this;
                e.brand && a._get(f.series, e,
                    function(b) {
                        var c = l(b);
                        a.$carSeries.find(".menu-drop-list-container").html(h.process({
                            data: c
                        }))
                    })
            },
            loadYearList: function() {
                var a = this;
                e.series && a._get(f.year, e,
                    function(b) {
                        a.$carYear.find(".menu-drop-list").html(i.process({
                            data: b.data
                        }))
                    })
            },
            loadModelList: function() {
                var a = this;
                a._get(f.model, e,
                    function(b) {
                        a.$carModel.find(".menu-drop-list").html(j.process({
                            data: b.data
                        }))
                    })
            },
            bindEvent: function() {
                var a = this;
                var b = this.$carBrand.find(".menu-drop-list");
                var c = this.$carBrand.find(".menu-drop-letter-list");
                var d = this.$carSeries.find(".menu-drop-list-container");
                var f = this.$carSeries.find(".trigger");
                var g = this.$carYear.find(".menu-drop-list");
                var h = this.$carYear.find(".trigger");
                var i = this.$carModel.find(".menu-drop-list");
                var j = this.$carModel.find(".trigger");
                var k;
                this.$searchButton.bind("click",
                    function(b) {
                        return a.carModelId ? void 0 : (b.preventDefault(), !1)
                    }),
                    b.delegate("li", "click",
                        function(b) {
                            b.preventDefault();
                            var c = $(this);
                            c.hasClass("curr") || (c.siblings().removeClass("curr").end().addClass("curr"), a._setCurrentBrand($.trim(c.text()), c.data("id")), a._setCurrentSeries(), a.loadSeriesList(), a.$carBrand.removeClass("z-menu-drop-open"))
                        }),
                    c.delegate("a", "mouseenter",
                        function(a) {
                            a.preventDefault();
                            var c = $(this);
                            var d = c.parent();
                            var e = c.text();
                            d.hasClass("curr") || (d.siblings().removeClass("curr").end().addClass("curr"), k = b.find("li"), d.hasClass("fore0") ? k.hide().filter(".J-hot").show() : k.each(function() {
                                var a = $(this);
                                a.data("initial") === e ? a.show() : a.hide()
                            }))
                        }),
                    d.delegate("li", "click",
                        function(b) {
                            b.preventDefault();
                            var c = $(this);
                            c.hasClass("curr") || (c.siblings().removeClass("curr").end().addClass("curr"), a._setCurrentSeries(c.text(), c.data("id")), a._setCurrentYear(), a.loadYearList(), a.$carSeries.removeClass("z-menu-drop-open"))
                        }),
                    f.bind("mouseenter",
                        function() {
                            e.brand ? d.parent().removeClass("z-menu-drop-hint") : d.parent().addClass("z-menu-drop-hint")
                        }),
                    g.delegate("li", "click",
                        function(b) {
                            b.preventDefault();
                            var c = $(this);
                            c.hasClass("curr") || (c.siblings().removeClass("curr").end().addClass("curr"), a._setCurrentYear(c.text(), c.data("id")), a._setCurrentModel(), a.loadModelList(), a.$carYear.removeClass("z-menu-drop-open"))
                        }),
                    h.bind("mouseenter",
                        function() {
                            e.series ? g.parent().removeClass("z-menu-drop-hint") : g.parent().addClass("z-menu-drop-hint")
                        }),
                    i.delegate("li", "click",
                        function(b) {
                            b.preventDefault();
                            var c = $(this);
                            c.hasClass("curr") || (c.siblings().removeClass("curr").end().addClass("curr"), a._setCurrentModel(c.text()), a.carModelId = c.data("id"), a.updateLink(), a.$carModel.removeClass("z-menu-drop-open"))
                        }),
                    j.bind("mouseenter",
                        function() {
                            currentYear && 0 != currentYear.length ? i.parent().removeClass("z-menu-drop-hint") : i.parent().addClass("z-menu-drop-hint")
                        })
            },
            updateLink: function() {
                var a = "//autobeta.jd.com/maintain?";
                this.carModelId && (a += "catIndex=" + d[window.params.thirdCatId] + "&modelId=" + this.carModelId, this.$searchButton.attr("href", a))
            },
            _get: function(a, b, c) {
                $.isFunction(b) && (c = b, b = {}),
                    $.ajax({
                        url: a,
                        data: b,
                        dataType: "jsonp",
                        success: function(a) { (c || $.noop)(a)
                        }
                    })
            },
            _setCurrentBrand: function(a, b) {
                e.brand = b,
                    delete e.series,
                    this.$carBrand.find(".trigger span").text(a || "\u54c1\u724c")
            },
            _setCurrentSeries: function(a, b) {
                e.series = b,
                    this.$carSeries.find(".trigger span").text(a || "\u8f66\u7cfb"),
                a || this._setCurrentYear()
            },
            _setCurrentYear: function(a, b) {
                e.seriesYear = b,
                    currentYear = $.trim(a),
                    this.$carYear.find(".trigger span").text(a || "\u5e74\u6b3e"),
                a || this._setCurrentModel()
            },
            _setCurrentModel: function(a) {
                this.$carModel.find(".trigger span").text(a || "\u8f66\u578b"),
                a || (this.carModelId = null)
            }
        });
        function l(a) {
            var b = {};
            return $.each(a.data,
                function(a, c) { (b[c.factory] = b[c.factory] || []).push(c)
                }),
                b
        }
        function m(a) {
            var b = [];
            return $.each(a,
                function(a, c) {
                    c.hot > 0 && b.push(c)
                }),
                b.sort(function(a, b) {
                    return a.hot - b.hot
                }),
                b.slice(0, 20)
        }
        b.exports = k
    });
/* product-m/1.0.0 p-contrast.js Date:2015-11-26 09:40:49 */
define("product/m/1.0.0/widget/p-contrast/p-contrast.js", ["jdf/1.0.0/ui/switchable/1.0.0/switchable.js", "jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js"],
    function(require, a, b) {
        require("jdf/1.0.0/ui/switchable/1.0.0/switchable.js");
        require("jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js");
        var e = function() {
            var a, b = 3,
                c = document.createElement("div"),
                d = c.getElementsByTagName("i");
            for (; c.innerHTML = "<!--[if gt IE " + ++b + "]><i></i><![endif]-->", d[0];);
            return b > 4 ? b: a
        } ();
        var f = {
            getPriceNum: function(a, b, c, d) {
                a = "string" == typeof a ? [a] : a,
                    b = b || $("body"),
                    c = c || "J-p-",
                    $.ajax({
                        url: "//p.3.cn/prices/mgets?skuIds=J_" + a.join(",J_") + "&type=1",
                        dataType: "jsonp",
                        success: function(a) {
                            if (!a && !a.length) return ! 1;
                            for (var e = 0; e < a.length; e++) {
                                var f = a[e].id.replace("J_", "");
                                var g = parseFloat(a[e].p, 10);
                                b.find("." + c + f).html(g > 0 ? "\uffe5" + a[e].p: "\u6682\u65e0\u62a5\u4ef7"),
                                "function" == typeof d && d(f, g, a)
                            }
                        }
                    })
            },
            TPL: {
                contrast: '<div id="pop-compare" data-load="false" class="pop-compare' + (pageConfig.wideVersion && pageConfig.compatible ? "": " pop-compare-narrow") + '"><div class="pop-wrap"><p class="pop-compare-tips"></p><div class="pop-inner"><div class="diff-hd"><ul class="tab-btns clearfix"><li class="current ui-switchable-item"><a href="javascript:;">\u5bf9\u6bd4\u680f</a></li><li class="ui-switchable-item"><a href="javascript:;">\u6700\u8fd1\u6d4f\u89c8</a></li></ul><div class="operate"><a href="javascript:;" class="hide-me">\u9690\u85cf</a></div></div><div class="diff-bd tab-cons"><div class="tab-con ui-switchable-panel"><div id="diff-items" class="diff-items clearfix"><dl class="item-empty"><dt>1</dt><dd>\u60a8\u8fd8\u53ef\u4ee5\u7ee7\u7eed\u6dfb\u52a0</dd></dl><dl class="item-empty"><dt>2</dt><dd>\u60a8\u8fd8\u53ef\u4ee5\u7ee7\u7eed\u6dfb\u52a0</dd></dl><dl class="item-empty"><dt>3</dt><dd>\u60a8\u8fd8\u53ef\u4ee5\u7ee7\u7eed\u6dfb\u52a0</dd></dl><dl class="item-empty"><dt>4</dt><dd>\u60a8\u8fd8\u53ef\u4ee5\u7ee7\u7eed\u6dfb\u52a0</dd></dl></div><div class="diff-operate"><a target="_blank" id="goto-contrast" href="#none" class="btn-compare-b">\u5bf9\u6bd4</a><a class="del-items">\u6e05\u7a7a\u5bf9\u6bd4\u680f</a></div></div><div class="tab-con ui-switchable-panel tab-scroll" style="display:none;"><div class="scroll-item ui-switchable-panel-body clearfix"><span id="sc-prev" class="scroll-btn sb-prev">&lt;</span><span id="sc-next" class="scroll-btn sb-next">&gt;</span><div class="scroll-con clearfix"><ul id="scroll-con-inner" class="ui-switchable-panel-main"><p class="scroll-loading ac">\u8f7d\u5165\u4e2d...</p></ul></div></div></div></div></div></div></div>',
                item: '<dl class="hasItem" id="cmp_item_${sku}" fore="${ind}">  <dt>      <a target="_blank" href="http://item.jd.com/${data[sku].skuId}.html"><img src="${pageConfig.FN_GetImageDomain(data[sku].skuId)}n5/${data[sku].imagePath}" width="50" height="50"></a>  </dt>  <dd>      <a target="_blank" class="diff-item-name" href="http://item.jd.com/${data[sku].skuId}.html">${data[sku].name}</a>      <span class="p-price"><strong class="J-p-${data[sku].skuId}"></strong><a class="del-comp-item" skuid="${data[sku].skuId}">\u5220\u9664</a></span>  </dd></dl>',
                recentItem: '{for item in data}<li id="rec_item_${item.sku}" class="ui-switchable-panel" data-push="${pageConfig._contrast.push(item.sku)}"><div class="rec_item_wrap">  <div class="dt">      <a target="_blank" href="http://item.jd.com/${item.sku}.html"><img src="${pageConfig.FN_GetImageDomain(item.sku)}n5/${item.img}" width="50" height="50"></a>  </div>  <div class="dd">      <a target="_blank" href="http://item.jd.com/${item.sku}.html" class="diff-item-name">${item.t}</a>      <div class="btns clb">          <span class="p-price"><strong class="J-p-${item.sku}"></strong></span>          <a id="recent_${item.sku}" data-recent="true" data-sku="${item.sku}" skuid="${item.sku}" class="J_contrast btn-compare btn-compare-s"><span>\u5bf9\u6bd4</span></a>      </div>  </div></div></li>{/for}'
            },
            init: function(a, b, c) {
                return this.cookieName = b || "_contrast",
                    this.recentCharset = c || "utf-8",
                    this.bindEvent("cmpBtn").btnStyle(null, "set"),
                    "side" == readCookie(this.cookieName + "_status") && $("#side-cmp").length < 1 ? $("#sidepanel").prepend('<span id="side-cmp"><a class="compareHolder" href="javascript:;"><b></b>\u5bf9\u6bd4\u680f</a></span>') : readCookie(this.cookieName) && this.showPopWin(null),
                    this.bindEvent("showWin"),
                    this.domain = pageConfig.FN_getDomain(),
                "1" == $("#J_goodsList").find("ul.gl-warp").attr("data-tpl") && $("#backtop").prepend('<div class="b-item"><a class="b-i-contrast" href="#none">\u5546\u54c1\u5bf9\u6bd4</a></div>'),
                    this
            },
            bindEvent: function(a) {
                var d = ($(".J_contrast"), $(".del-items"), this);
                return "cmpBtn" == a && $("body").undelegate(".J_contrast", "click").delegate(".J_contrast", "click",
                    function() {
                        var a = $(this).attr("data-sku"),
                            b = readCookie(d.cookieName) || "",
                            c = b.split(".").length;
                        4 > c ? (d.showPopWin(a), "true" == $(this).attr("data-recent") && d.switchTab(0)) : d.hasCookie(a) ? ("true" == $(this).attr("data-recent") && d.switchTab(0), d.showPopWin(a)) : (d.showPopWin(null), d.setMessage("\u5bf9\u6bd4\u680f\u5df2\u6ee1\uff0c\u60a8\u53ef\u4ee5\u5220\u9664\u4e0d\u9700\u8981\u7684\u680f\u5185\u5546\u54c1\u518d\u7ee7\u7eed\u6dfb\u52a0\u54e6\uff01"))
                    }),
                "delAll" == a && $("body").undelegate(".del-items", "click").delegate(".del-items", "click",
                    function() {
                        d.delContrastItem(null, !0),
                            $("#goto-contrast").attr("href", "#none")
                    }),
                "delHover" == a && ($(".hasItem").hover(function() {
                        $(this).find(".del-comp-item").css("visibility", "visible")
                    },
                    function() {
                        $(this).find(".del-comp-item").css("visibility", "hidden")
                    }), $(".hasItem .del-comp-item").bind("click",
                    function() {
                        var a = $(this).attr("skuid");
                        d.delContrastItem(a)
                    }), $("#goto-contrast").click(function() {
                    var a = readCookie(d.cookieName) || "",
                        b = a.split(".");
                    if (b.length < 2) return d.setMessage("\u81f3\u5c11\u6709\u4e24\u4ef6\u5546\u54c1\u624d\u80fd\u5bf9\u6bd4\u54e6\uff01"),
                        !1;
                    var c = [0, 0, 0, 0];
                    for (var e = 0; e < b.length; e++) c[e] = b[e];
                    $("#goto-contrast").attr("href", "http://www.jd.com/compare/" + c.join("-") + ".html")
                })),
                "hide" == a && $("body").undelegate(".diff-hd .hide-me", "click").delegate(".diff-hd .hide-me", "click",
                    function() {
                        d.hidePopWin()
                    }),
                "showWin" == a && $("body").delegate(".b-i-contrast", "click",
                    function() {
                        d.showPopWin(null, !0)
                    }),
                    this
            },
            switchTab: function(a) {
                $(".diff-hd li").eq(a).trigger("click")
            },
            btnStyle: function(a, b) {
                if (a)"set" == b && ($(".J_contrast").filter('[data-sku="' + a + '"]').addClass("selected"), $("#comp_" + a + ",#recent_" + a).addClass("btn-compare-s-active"), $("#cmp_" + a).text("\u53d6\u6d88\u5bf9\u6bd4")),
                "del" == b && ($(".J_contrast").filter('[data-sku="' + a + '"]').removeClass("selected"), $("#comp_" + a + ",#recent_" + a).removeClass("btn-compare-s-active"), $("#cmp_" + a).text("\u52a0\u5165\u5bf9\u6bd4"));
                else {
                    var c = readCookie(this.cookieName) || "";
                    if (c = c.split("."), c.length < 5) for (var d = 0; d < c.length; d++)"set" == b && ($(".J_contrast").filter('[data-sku="' + c[d] + '"]').addClass("selected"), $("#comp_" + c[d] + ",#recent_" + c[d]).addClass("btn-compare-s-active"), $("#cmp_" + c[d]).text("\u53d6\u6d88\u5bf9\u6bd4")),
                    "del" == b && ($(".J_contrast").filter('[data-sku="' + c[d] + '"]').removeClass("selected"), $("#comp_" + c[d] + ",#recent_" + c[d]).removeClass("btn-compare-s-active"), $("#cmp_" + c[d]).text("\u52a0\u5165\u5bf9\u6bd4"))
                }
                return this
            },
            loadExistList: function(a) {
                var b = readCookie(this.cookieName) || "";
                b = b.split(".");
                for (var c = 0; c < b.length; c++) this.setContrastItem(b[c]),
                    c + 1 == b.length ? this.setContrastItem(b[c], a) : this.setContrastItem(b[c])
            },
            showPopWin: function(a) {
                var c = $("#pop-compare"),
                    d = this;
                a = a || null,
                $("#pop-compare").length < 1 && $("body").append(this.TPL.contrast),
                $("#diff-items .hasItem").length < 1 && (readCookie(this.cookieName) ? this.loadExistList(function() {
                    d.hasCookie(a) ? d.delContrastItem(a) : d.setContrastItem(a)
                }) : d.setContrastItem(a)),
                    "false" == $("#pop-compare").attr("data-load") ? ($("#pop-compare").show(), c.attr("data-load", "true"), $("#pop-compare").switchable({
                        delay: 0,
                        navSelectedClass: "current",
                        event: "click",
                        callback: function(a) {
                            1 == a && $(".scroll-loading").length > 0 && d.getRecent(function(a) {
                                d.setRecentScroll(),
                                    d.getPriceNum(a, $("#pop-compare"), null,
                                        function() {})
                            })
                        }
                    }), 6 !== e && $("#pop-compare").animate({
                            bottom: 0
                        },
                        100)) : ("side" == readCookie(d.cookieName + "_status") && ($("#pop-compare").show().attr("data-load", "true"), 6 !== e && $("#pop-compare").show().animate({
                        bottom: 0
                    }), createCookie(d.cookieName + "_status", "show", 30, "/;domain=" + this.domain)), d.hasCookie(a) ? d.delContrastItem(a) : d.setContrastItem(a)),
                    d.bindEvent("delAll").bindEvent("hide")
            },
            hidePopWin: function() {
                var a = this;
                if ($("#side-cmp").length < 1 && $("#sidepanel").prepend('<span id="side-cmp"><a class="compareHolder" href="javascript:;"><b></b>\u5bf9\u6bd4\u680f</a></span>'), 6 == e) $("#pop-compare").hide();
                else {
                    if ($(".pop-wrap").is(":animated")) return ! 1;
                    $("#pop-compare").css("overflow", "hidden").find(".pop-wrap").animate({
                            left: "990px"
                        },
                        100,
                        function() {
                            $("#pop-compare").removeAttr("style").css({
                                overflow: "visible",
                                bottom: "-200px"
                            }).hide().find(".pop-wrap").removeAttr("style").css("left", 0)
                        })
                }
                a.bindEvent("showWin"),
                    createCookie(a.cookieName + "_status", "side", 30, "/;domain=" + this.domain)
            },
            setContrastItem: function(a, b) {
                var c = $("#pop-compare"),
                    d = readCookie(this.cookieName) || "",
                    f = (d.split(".").length, this);
                if (f.hasCookie(a) && "true" == c.attr("data-load")) f.delContrastItem(a);
                else {
                    if (!a) return ! 1;
                    $.ajax({
                        url: "//d.jd.com/ware/history?ids=" + a,
                        dataType: "jsonp",
                        success: function(d) {
                            var e = $("#diff-items dl").index($("#diff-items").find(".item-empty").eq(0));
                            var g = {
                                data: d,
                                sku: a,
                                ind: e
                            }; ($("#cmp_item_" + a).length < 1 || !f.hasCookie(a)) && (c.find(".item-empty").eq(0).replaceWith(f.TPL.item.process(g)), f.getPriceNum(a, $("#pop-compare"), null,
                                function() {})),
                                f.bindEvent("delHover").setCookie(a).btnStyle(a, "set"),
                                createCookie(f.cookieName + "_status", "show", 30, "/;domain=" + f.domain),
                            "function" == typeof b && b(),
                                f.setContrastBtn("add"),
                                $("#pop-compare").attr("data-load", "true")
                        }
                    })
                }
                return this
            },
            setContrastBtn: function(a) {
                var b = readCookie(this.cookieName) || "",
                    c = b.split(".").length;
                "add" == a && c > 1 && $("#goto-contrast").addClass("compare-active"),
                "reduce" == a && 2 > c && $("#goto-contrast").removeClass("compare-active")
            },
            sortList: function() {
                var a = $("#diff-items"),
                    b = [];
                a.find(".hasItem").each(function() {
                    b.push($(this))
                }),
                    a.html("");
                for (var c = 0; 4 > c; c++) $("#diff-items").append(c > b.length - 1 ? '<dl class="item-empty"><dt>' + (c + 1) + "</dt><dd>\u60a8\u8fd8\u53ef\u4ee5\u7ee7\u7eed\u6dfb\u52a0</dd></dl>": b[c]);
                return this.bindEvent("delHover"),
                    this
            },
            delContrastItem: function(a, b) {
                if (b) {
                    $("#diff-items").html("");
                    for (var c = 1; 5 > c; c++) $("#diff-items").append('<dl class="item-empty"><dt>' + c + "</dt><dd>\u60a8\u8fd8\u53ef\u4ee5\u7ee7\u7eed\u6dfb\u52a0</dd></dl>");
                    this.btnStyle(null, "del"),
                        $("#goto-contrast").removeClass("compare-active"),
                        $(".btn-compare").removeClass("btn-compare-s-active"),
                        $("#goto-contrast").unbind("click"),
                        createCookie(this.cookieName, "", -1, "/;domain=" + this.domain)
                } else $("#cmp_item_" + a).replaceWith('<dl class="item-empty"><dt>' + (parseInt($("#cmp_item_" + a).attr("fore"), 10) + 1) + "</dt><dd>\u60a8\u8fd8\u53ef\u4ee5\u7ee7\u7eed\u6dfb\u52a0</dd></dl>"),
                    this.sortList().delCookie(a).btnStyle(a, "del"),
                    this.setContrastBtn("reduce");
                return this
            },
            delCookie: function(a) {
                if (this.hasCookie(a) && null !== a) {
                    var b = readCookie(this.cookieName);
                    var c = b.replace(new RegExp(a + ".|." + a + "|" + a), "");
                    createCookie(this.cookieName, c, 0, "/;domain=" + this.domain)
                }
                return this
            },
            setCookie: function(a) {
                var b = readCookie(this.cookieName) || "";
                return skuArr = b.split("."),
                !this.hasCookie(a) && skuArr.length < 4 && (b ? (skuArr.push(a), createCookie(this.cookieName, skuArr.join("."), 1, "/;domain=" + this.domain)) : createCookie(this.cookieName, a, 1, "/;domain=" + this.domain)),
                    this
            },
            hasCookie: function(a) {
                return a ? new RegExp(a).test(readCookie(this.cookieName)) : void 0
            },
            setRecentScroll: function() {
                var a = this;
                $(".tab-scroll").switchable({
                    type: "carousel",
                    hasPage: !0,
                    prevClass: "sb-prev",
                    nextClass: "sb-next",
                    autoPlay: !1,
                    visible: 4,
                    step: 4
                }),
                    a.bindEvent("cmpBtn")
            },
            getRecent: function(a) {
                var b = this;
                var c = readCookie("ipLoc-djd");
                $.ajax({
                    url: "//diviner.jd.com/diviner",
                    data: {
                        p: 202001,
                        lid: c ? c.split("-")[0] : 1,
                        ck: "pin,aview",
                        lim: 23,
                        ec: this.recentCharset
                    },
                    dataType: "jsonp",
                    success: function(c) {
                        $("#scroll-con-inner p").length > 0 && $("#scroll-con-inner p").remove(),
                            pageConfig._contrast = [],
                            $("#scroll-con-inner").append(b.TPL.recentItem.process(c));
                        var d = readCookie(b.cookieName);
                        if (d) {
                            var e = d.split(".");
                            var f = e.length;
                            for (var g = 0; f > g; g++) $("#rec_item_" + e[g]).length > 0 && b.btnStyle(e[g], "set")
                        }
                        "function" == typeof a && a(pageConfig._contrast)
                    }
                })
            },
            setMessage: function(a) {
                $(".pop-compare-tips").text(a).fadeIn(),
                    setTimeout(function() {
                            $(".pop-compare-tips").fadeOut()
                        },
                        8e3)
            }
        };
        b.exports = f
    });