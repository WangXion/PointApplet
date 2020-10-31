var t = wx.getSystemInfoSync(), e = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
};

Component({
    properties: {
        ratio: {
            type: Number,
            observer: function(e, a) {
                this.setData({
                    width: .7 * t.windowWidth,
                    height: .7 * t.windowWidth / e
                });
            }
        },
        url: {
            type: String,
            observer: function(t, e) {
                this.initImg(t);
            }
        }
    },
    data: {
        width: .8 * t.windowWidth,
        height: .8 * t.windowWidth / (102 / 152),
        originImg: null,
        stv: {
            offsetX: 0,
            offsetY: 0,
            zoom: !1,
            distance: 0,
            scale: 1,
            rotate: 0
        }
    },
    methods: {
        uploadTap: function() {
            var t = this;
            wx.chooseImage({
                count: 1,
                sizeType: [ "original" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    t.initImg(e.tempFilePaths[0]);
                }
            });
        },
        rotate: function() {
            this.setData({
                "stv.rotate": this.data.stv.rotate % 90 == 0 ? this.data.stv.rotate = this.data.stv.rotate + 90 : this.data.stv.rotate = 0
            });
        },
        initImg: function(t) {
            var e = this;
            wx.getImageInfo({
                src: t,
                success: function(a) {
                    var s = a.width / a.height;
                    s < e.data.width / e.data.height ? e.setData({
                        originImg: {
                            url: t,
                            width: e.data.width,
                            height: e.data.width / s
                        },
                        stv: {
                            offsetX: 0,
                            offsetY: 0 - Math.abs((e.data.height - e.data.width / s) / 2),
                            zoom: !1,
                            distance: 0,
                            scale: 1,
                            rotate: 0
                        }
                    }) : e.setData({
                        originImg: {
                            url: t,
                            height: e.data.height,
                            width: e.data.height * s
                        },
                        stv: {
                            offsetX: 0 - Math.abs((e.data.width - e.data.height * s) / 2),
                            offsetY: 0,
                            zoom: !1,
                            distance: 0,
                            scale: 1,
                            rotate: 0
                        }
                    });
                }
            });
        },
        touchstartCallback: function(t) {
            if (1 === t.touches.length) {
                var a = t.touches[0], s = a.clientX, i = a.clientY;
                this.startX = s, this.startY = i, this.touchStartEvent = t.touches;
            } else {
                var o = t.touches[1].clientX - t.touches[0].clientX, h = t.touches[1].clientY - t.touches[0].clientY, n = Math.sqrt(o * o + h * h);
                e.x1 = 2 * t.touches[0].pageX, e.y1 = 2 * t.touches[0].pageY, e.x2 = 2 * t.touches[1].pageX, 
                e.y2 = 2 * t.touches[1].pageY, this.setData({
                    "stv.distance": n,
                    "stv.zoom": !0
                });
            }
        },
        touchmoveCallback: function(t) {
            a(this, t);
        },
        touchendCallback: function(t) {
            0 === t.touches.length && this.setData({
                "stv.zoom": !1
            });
        }
    }
});

var a = function(t, e, a) {
    var s = null, i = null;
    return function() {
        var o = +new Date(), h = this, n = arguments;
        i || (i = o), a && o - i >= a ? (t.apply(h, n), i = o) : (clearTimeout(s), s = setTimeout(function() {
            t.apply(h, n);
        }, e));
    };
}(function(t, a) {
    if (1 === a.touches.length) {
        if (t.data.stv.zoom) return;
        var s = a.touches[0], i = s.clientX, o = s.clientY, h = i - t.startX, n = o - t.startY;
        t.startX = i, t.startY = o;
        var c = t.data.stv;
        c.offsetX += h, c.offsetY += n, c.offsetLeftX = -c.offsetX, c.offsetLeftY = -c.offsetLeftY, 
        t.setData({
            stv: c
        });
    } else {
        if (2 !== a.touches.length) return;
        var r = function(t, e, a, s) {
            this.x = a - t, this.y = s - e;
        }, u = JSON.parse(JSON.stringify(e));
        e.x1 = 2 * a.touches[0].pageX, e.y1 = 2 * a.touches[0].pageY, e.x2 = 2 * a.touches[1].pageX;
        var f = new r(u.x1, u.y1, u.x2, u.y2), l = new r(e.x1, e.y1, e.x2, e.y2), d = function(t, e) {
            return (t.x * e.x + t.y * e.y) / (Math.sqrt(t.x * t.x + t.y * t.y) * Math.sqrt(e.x * e.x + e.y * e.y));
        }(f, l), v = 180 * Math.acos(d) / Math.PI, g = function(t, e) {
            return t.x * e.y - e.x * t.y > 0 ? 1 : -1;
        }(f, l) * v, y = a.touches[1].clientX - a.touches[0].clientX, m = a.touches[1].clientY - a.touches[0].clientY;
        Math.sqrt(y * y + m * m), t.data.stv.distance;
        if (t.data.stv.scale, Math.abs(g) > 1) t.setData({
            "stv.rotate": t.data.stv.rotate + g
        }); else {
            var w = a.touches[1].clientX - a.touches[0].clientX, p = a.touches[1].clientY - a.touches[0].clientY, x = Math.sqrt(w * w + p * p), X = x - t.data.stv.distance, Y = t.data.stv.scale + .005 * X;
            if (Y < .2 || Y > 2.5) return;
            t.setData({
                "stv.distance": x,
                "stv.scale": Y
            });
        }
    }
}, 10, 10);