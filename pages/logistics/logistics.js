import {
    post,
    get
} from "../../request/request.js";
Page({
    data: {
        orderId: ""
    },
    //复制订单号
    textPaste: function () {
        wx.showToast({
            title: "复制成功"
        }), wx.setClipboardData({
            data: "956957655965988987"
        });
    },
    //进入加载
    async logIstics() {
        let _that = this
        try {
            const res = await get({
                url: "/order/express/" + _that.data.orderId
            })
            console.log(res)
            if (res.data.status == 200) { //成功
                _that.setData({
                    steps: res.data.data.express.result.list,
                    delivery_name: res.data.data.order.delivery_name,
                    delivery_id: res.data.data.order.delivery_id
                })
            } else {
                wx.showToast({ //失败
                    title: res.data.msg,
                    icon: 'none',
                    duration: 3000
                })
            }

        } catch (error) { //这步操作防止用户断网的时候做提醒
            if (error.errMsg == "request:fail ") {
                wx.showToast({
                    title: "无网络链接",
                    icon: 'none',
                    duration: 1000
                })
            }
        }
    },
    onLoad: function (e) {
        this.setData({
            orderId: e.ordeid
        });
    },
    onReady: function () {},
    onShow: function () {
        this.logIstics();
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {}
});