Page({
    data: {
        bgBoxHeight: 400,
        bgBoxWidth: 320,
        moveImgLeft: 40,
        moveImgTop: 80,
        moveImgH: 100,
        moveImgW: 100,
        scaleIconFixWidth: 30,
        scaleLeft: 0,
        scaleTop: 0
    },
    onLoad: function(t) {
        var a = this.data.scaleIconFixWidth / 2;
        this.setData({
            scaleLeft: this.data.moveImgLeft + this.data.moveImgW - a,
            scaleTop: this.data.moveImgTop + this.data.moveImgH - a
        });
    },
    moveImgTouchmove: function(t) {
        console.log(t);
        var a = t.changedTouches[0].pageX, o = t.changedTouches[0].pageY, e = a - this.data.moveImgW / 2, s = o - this.data.moveImgH / 2, i = this.data.scaleIconFixWidth / 2;
        a - this.data.moveImgW / 2 <= 0 || a + this.data.moveImgW / 2 >= this.data.bgBoxWidth || o - this.data.moveImgH / 2 <= 1 || o + this.data.moveImgH / 2 >= this.data.bgBoxHeight || this.setData({
            moveImgLeft: e,
            moveImgTop: s,
            scaleLeft: e + this.data.moveImgW - i,
            scaleTop: s + this.data.moveImgH - i
        });
    },
    scaleTouchmove: function(t) {
        console.log(t);
        var a = t.changedTouches[0].pageX, o = t.changedTouches[0].pageY, e = this.data.scaleIconFixWidth / 2, s = a - e, i = o - e;
        this.data.moveImgLeft, this.data.moveImgTop;
        s <= this.data.moveImgLeft + e || i <= this.data.moveImgTop + e || a - this.data.moveImgLeft > 250 || o - this.data.moveImgTop > 250 || this.data.scaleLeft + this.data.scaleIconFixWidth >= this.data.bgBoxWidth || this.data.scaleTop + this.data.scaleIconFixWidth >= this.data.bgBoxHeight || this.setData({
            scaleLeft: s,
            scaleTop: i,
            moveImgW: a - this.data.moveImgLeft,
            moveImgH: o - this.data.moveImgTop
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});