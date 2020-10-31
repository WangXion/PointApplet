import {
    post,
    get
} from "../../request/request.js";
Page({
    data: {
        orderId: ""
    },
    //进入页面加载
    async defeated() {

        let _that = this
        try {
            const res = await get({
                url: "/order/detail/" + _that.data.orderId
            })
            console.log(res)
            if (res.data.status == 200) { //成功
                console.log(res.data)
                _that.setData({
                    address: res.data.data.user_address,
                    phone: res.data.data.user_phone,
                    name: res.data.data.real_name,
                    cartInfo: res.data.data.cartInfo,
                    addTime: res.data.data._add_time,
                    payTime: res.data.data._pay_time,
                    status: res.data.data._status,
                    price: res.data.data.pay_price
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
    //取消
    async cancel(e) {
        let _that = this
        wx.showModal({
            title: '提示',
            content: '是否取消该商品',
            showCancel: true, //是否显示取消按钮
            cancelText: "取消", //默认是“取消”
            confirmText: "确定", //默认是“确定”
            async success(res) {
                if (res.cancel) {
                    //点击取消,默认隐藏弹框
                } else {
                    try {
                        const res = await post({
                            url: "/order/cancel",
                            data: {
                                id: _that.data.orderId
                            }
                        })
                        console.log(res)
                        if (res.data.status == 200) { //成功
                            wx.showToast({
                                    title: res.data.msg,
                                    icon: "none"
                                }),
                                wx.switchTab({
                                    url: "/pages/shop/index"
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
                }
            },
            fail: function (res) {}, //接口调用失败的回调函数
            complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
        })


        // let r = this;
        // console.log(e), wx.showModal({
        //     title: "取消订单",
        //     content: "确定取消该订单吗?",
        //     success: function() {
        //         let e = (0, a.default)(t.default.mark(function e(a) {
        //             let o;
        //             return t.default.wrap(function(e) {
        //                 for (;;) switch (e.prev = e.next) {
        //                   case 0:
        //                     if (!a.confirm) {
        //                         e.next = 13;
        //                         break;
        //                     }
        //                     return e.prev = 1, e.next = 4, (0, n.post)({
        //                         url: "/order/cancel",
        //                         data: {
        //                             id: r.data.orderId
        //                         }
        //                     });

        //                   case 4:
        //                     200 == (o = e.sent).data.status ? (wx.showToast({
        //                         title: o.data.msg,
        //                         icon: "none"
        //                     }), wx.switchTab({
        //                         url: "/pages/shop/index"
        //                     })) : wx.showToast({
        //                         title: o.data.msg,
        //                         icon: "none"
        //                     }), e.next = 11;
        //                     break;

        //                   case 8:
        //                     e.prev = 8, e.t0 = e.catch(1), "request:fail " == e.t0.errMsg && wx.showToast({
        //                         title: "无网络链接",
        //                         icon: "none",
        //                         duration: 1e3
        //                     });

        //                   case 11:
        //                     e.next = 14;
        //                     break;

        //                   case 13:
        //                     a.cancel && console.log("用户点击取消");

        //                   case 14:
        //                   case "end":
        //                     return e.stop();
        //                 }
        //             }, e, null, [ [ 1, 8 ] ]);
        //         }));
        //         return function(t) {
        //             return e.apply(this, arguments);
        //         };
        //     }()
        // });
    },
    //继续支付
    async navto() {
        let _that = this
        try {
            const res = await get({
                url: "/order/pay",
                data: {
                    from: "routine",
                    paytype: "weixin",
                    uni: _that.data.orderId
                }
            })
            console.log(res)
            if (res.data.status == 200) { //成功
                wx.requestPayment({
                    timeStamp: res.data.data.result.jsConfig.timestamp,
                    nonceStr: res.data.data.result.jsConfig.nonceStr,
                    package: res.data.data.result.jsConfig.package,
                    signType: res.data.data.result.jsConfig.signType,
                    paySign: res.data.data.result.jsConfig.paySign,
                    appId: res.data.data.result.jsConfig.appId,
                    success: function (e) {
                        wx.redirectTo({
                            url: "../paysue/index?orderId=" + _that.data.orderId
                        });
                    },
                    fail: function (e) {
                        wx.showToast({
                            title: "支付失败",
                            icon: "none",
                            duration: 1500
                        }), wx.switchTab({
                            url: "/pages/shop/index"
                        });
                    }
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
    //选择地址
    changeAddress: function () {
        wx.navigateTo({
            url: "/pages/AddressGl/index"
        });
    },
    onLoad: function (e) {
        console.log(e.orderId),
            this.setData({
                orderId: e.orderId
            });
    },
    onReady: function () {},
    onShow: function () {
        this.defeated();
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {}
});