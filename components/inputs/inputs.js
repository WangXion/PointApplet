var t;

Page({
    data: {
        buttonTop: 0,
        buttonLeft: 0,
        windowHeight: "",
        windowWidth: ""
    },
    onLoad: function(t) {
        var i = this;
        wx.getSystemInfo({
            success: function(t) {
                console.log("height=" + t.windowHeight), console.log("width=" + t.windowWidth), 
                i.setData({
                    windowHeight: t.windowHeight,
                    windowWidth: t.windowWidth
                });
            }
        });
    },
    buttonStart: function(i) {
        t = i.touches[0];
    },
    buttonMove: function(i) {
        var o = i.touches[i.touches.length - 1], n = o.clientX - t.clientX, d = o.clientY - t.clientY;
        t = o;
        var e = this.data.buttonTop + d, h = this.data.buttonLeft + n;
        h + 50 >= this.data.windowWidth && (h = this.data.windowWidth - 50), h <= 0 && (h = 0), 
        e <= 0 && (e = 0), e + 50 >= this.data.windowHeight && (e = this.data.windowHeight - 50), 
        this.setData({
            buttonTop: e,
            buttonLeft: h
        });
    },
    buttonEnd: function(t) {}
});