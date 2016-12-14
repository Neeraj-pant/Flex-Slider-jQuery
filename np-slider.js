! function(a) {
    "use strict";
    a.fn.npSlider = function(b) {
        function f(b) {
            var c = a(window).innerWidth();
            d.parent_width && (c = b.closest("#np-slider-wrapper").parent().width());
            var e = b.children("li"),
                f = 0,
                g = 0,
                h = 0,
                i = c - d.next_slide_space - d.slide_space,
                j = b.find(".sm-img");
            b.parent().width(c), d.single ? b.height(b.find("li.active").find("img").height()) : b.height(b.find("li.active").find(".bigger").find("img").height()), null != d.slider_max_height && b.height(d.slider_max_height);
            var k = 0;
            if (!d.single) {
                var l = b.find("li:first-child").find(".bigger img").innerHeight() / 2;
                b.find(".bigger").find("img").height(2 * l)
            }
            var m = 1,
                n = 0;
            d.single || 0 == d.grid_space || j.each(function() {
                switch (m) {
                    case 1:
                        n = "0 " + d.grid_space / 2 + "px " + d.grid_space / 2 + "px " + d.grid_space + "px", a(this).css("padding", n);
                        break;
                    case 2:
                        n = "0 " + d.grid_space + "px " + d.grid_space / 2 + "px " + d.grid_space / 2 + "px", a(this).css("padding", n);
                        break;
                    case 3:
                        n = d.grid_space / 2 + "px " + d.grid_space / 2 + "px 0 " + d.grid_space + "px", a(this).css("padding", n);
                        break;
                    case 4:
                        n = d.grid_space / 2 + "px " + d.grid_space + "px 0 " + d.grid_space / 2 + "px", a(this).css("padding", n), m = 0
                }
                m++
            }), e.each(function(b) {
                d.single || j.innerHeight(l), e.height(d.slider_height), e.width(i), f += i, h = f - e.width(), 0 == b ? (a(this).css("left", 0), a(this).attr("data-left", 0)) : (h += d.slide_space * k, a(this).css("left", h), a(this).attr("data-left", h)), k++
            });
            var o = b.find("li.active").find("img").height();
            d.single && b.height() >= o && b.height(o), null != d.slider_height ? (b.height(d.slider_height), g = d.slider_height) : g = b.height();
            var p = g / 2;
            a(".np-controlls").css("top", p)
        }

        function h() {
            if (d.autoplay) return setInterval(function() {
                i(d.slide_space, d.slide_time)
            }, d.play_duration)
        }

        function i(b, c) {
            var d = a(".np-slide").width() + b;
            a(".np-slide").each(function(b) {
                var e = a(this).attr("data-left");
                e = parseInt(e), d = parseInt(d);
                var f = e - d;
                a(this).attr("data-left", f), a(this).animate({
                    left: f
                }, c, function() {
                    if (b == a(".np-slide").length - 1) {
                        var c = a(".last-slide").attr("data-left");
                        c = parseInt(c);
                        var e = c + d;
                        a(".active").css("left", e), e = parseInt(e), a(".active").attr("data-left", e);
                        var f = a(".active").next(".np-slide");
                        a(".last-slide").removeClass("last-slide"), a(".active").addClass("last-slide"), a(".active").removeClass("active"), f.length ? f.addClass("active") : a(".np-slide:first-child").addClass("active"), a(".np-right").prop("disabled", !1)
                    }
                })
            })
        }

        function j(b, c) {
            var d = a(".np-slide").width();
            d * (a(".np-slide").length - 1);
            if (a(".np-slide:first-child").hasClass("active") && (a(".last-slide").attr("data-left", -b - d), a(".last-slide").css("left", -b - d)), a(".active").next(".np-slide").length) var g = parseInt("-" + a(".active").next(".np-slide").attr("data-left"));
            else var g = parseInt("-" + a(".np-slide:first-child").attr("data-left"));
            a(".active").prev(".np-slide").attr("data-left", g), a(".active").prev(".np-slide").css("left", g), a(".np-slide").each(function(e) {
                var f = a(this).attr("data-left");
                f = parseInt(f), d = parseInt(d);
                var g = f + d;
                a(this).animate({
                    left: g + b
                }, c, function() {
                    if (e == a(".np-slide").length - 1) {
                        if (a(".active").removeClass("active"), a(".last-slide").prev(".np-slide").length) var b = a(".last-slide").prev(".np-slide");
                        else var b = a(".np-slide:last-child");
                        a(".last-slide").addClass("active"), a(".last-slide").removeClass("last-slide"), b.addClass("last-slide"), a(".np-left").prop("disabled", !1)
                    }
                }), a(this).attr("data-left", g + b)
            })
        }
        var c = {
                autoplay: !0,
                play_duration: 3e3,
                single: !1,
                slide_space: 0,
                slide_time: 300,
                next_slide_space: 0,
                slider_max_height: null,
                full_width: !0,
                parent_width: !1,
                grid_space: 0
            },
            d = a.extend({}, c, b);
        this.find("li:first-child").addClass("active"), this.find("li:last-child").addClass("last-slide"), f(this);
        var e = this;
        a(window).resize(function() {
            f(e)
        });
        var g = h();
        a(".np-right").click(function(b) {
            a(this).prop("disabled", "true"), clearInterval(g), i(d.slide_space, d.slide_time), g = h()
        }), a(".np-left").click(function(b) {
            a(this).prop("disabled", "true"), clearInterval(g), j(d.slide_space, d.slide_time), g = h()
        })
    }
}(jQuery);