import {
    post,
    get
} from "../../request/request.js";
Page({
    data: {
        show: false,
        active: 0,
        radio: 1,
        newtotalPrice: "",
        id: "",
        orderKey: "",
        orderId: "",
        dizhiId: "",
        isTrue: false
    },
    onLoad: function (t) {},
    onClose: function () {
        this.setData({
            show: false
        });
    },
    //选择地址
    changeaddress: function () {
        wx.navigateTo({
                url: "/pages/AddressGl/index"
            }),
            this.setData({
                idDr: "1"
            });
    },
    //留言
    leave: function (t) {
        console.log(t.detail.value), this.setData({
            remark: t.detail.value
        });
    },
    //提交订单
    async navto() {

        let _that = this
        console.log(_that.data.site)
        console.log(_that.data.sites)
        if (_that.data.site != null || _that.data.sites != null) {
            try {
                const res = await post({
                    url: "/order/create/" + _that.data.orderKey,
                    data: {
                        addressId: _that.data.dizhiId,
                        from: "routine",
                        payType: "weixin",
                        shipping_type: 1
                    }
                })
                console.log(res)
                if (res.data.status == 200) { //成功
                    _that.setData({
                        orderId: res.data.data.result.orderId
                    })
                    const respay = await post({
                        url: "/order/pay",
                        data: {
                            from: "routine",
                            paytype: "weixin",
                            uni: res.data.data.result.orderId
                        }
                    })
                    console.log(respay)
                    if (respay.data.status == 200) {
                        wx.requestPayment({
                            timeStamp: respay.data.data.result.jsConfig.timestamp,
                            nonceStr: respay.data.data.result.jsConfig.nonceStr,
                            package: respay.data.data.result.jsConfig.package,
                            signType: respay.data.data.result.jsConfig.signType,
                            paySign: respay.data.data.result.jsConfig.paySign,
                            appId: respay.data.data.result.jsConfig.appId,
                            success: function (t) {
                                wx.redirectTo({
                                    url: "../paysue/index?orderId=" + a.data.orderId
                                });
                            },
                            fail: function (t) {
                                wx.showModal({
                                    title: '是否取消本次支付？',
                                    content: '您的订单在0小时29分钟内未支付将被取消，请尽快完成支付',
                                    showCancel: true, //是否显示取消按钮
                                    cancelText: "取消支付", //默认是“取消”
                                    cancelColor: '#343434', //取消文字的颜色
                                    confirmText: "继续支付", //默认是“确定”
                                    confirmColor: '#C28E90', //确定文字的颜色
                                    success: function (res) {
                                        if (res.cancel) {
                                            wx.switchTab({
                                                url: "../shop/index"
                                            })
                                        } else {
                                            wx.redirectTo({
                                                url: "../order/index"
                                            })
                                        }
                                    },
                                    fail: function (res) {}, //接口调用失败的回调函数
                                    complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
                                })
                            }
                        });
                    }
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
        } else {
            wx.showToast({
                title: "请选择地址",
                icon: "none"
            });
        }



    },
    //提交订单优惠券
    async navtoPay() {
        let _that = this
        console.log(_that.data.site)
        console.log(_that.data.sites)
        if (_that.data.site != null || _that.data.sites != null) {
            try {
                const res = await post({
                    url: "/order/create/" + _that.data.orderKey,
                    data: {
                        addressId: _that.data.dizhiId,
                        from: "routine",
                        payType: "weixin",
                        shipping_type: 1,
                        couponId: _that.data.couponId
                    }
                })
                console.log(res)

                if (res.data.status == 200) { //成功
                    wx.requestPayment({
                        timeStamp: respay.data.data.result.jsConfig.timestamp,
                        nonceStr: res.data.data.result.jsConfig.nonceStr,
                        package: res.data.data.result.jsConfig.package,
                        signType: res.data.data.result.jsConfig.signType,
                        paySign: res.data.data.result.jsConfig.paySign,
                        appId: res.data.data.result.jsConfig.appId,
                        success: function (t) {
                            wx.redirectTo({
                                url: "../paysue/index?orderId=" + _that.data.orderId
                            });
                        },
                        fail: function (t) {
                            wx.showModal({
                                title: '是否取消本次支付？',
                                content: '您的订单在0小时29分钟内未支付将被取消，请尽快完成支付',
                                showCancel: true, //是否显示取消按钮
                                cancelText: "取消支付", //默认是“取消”
                                cancelColor: '#343434', //取消文字的颜色
                                confirmText: "继续支付", //默认是“确定”
                                confirmColor: '#C28E90', //确定文字的颜色
                                success: function (res) {
                                    if (res.cancel) {
                                        wx.switchTab({
                                            url: "../shop/index"
                                        })
                                    } else {
                                        wx.redirectTo({
                                            url: "../order/index"
                                        })
                                    }
                                },
                                fail: function (res) {}, //接口调用失败的回调函数
                                complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
                            })
                        }
                    });
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
        } else {
            wx.showToast({
                title: "请选择地址",
                icon: "none"
            });
        }
        // let t = (0, n.default)(r.default.mark(function t() {
        //     let a, e;
        //     return r.default.wrap(function(t) {
        //         for (;;) switch (t.prev = t.next) {
        //           case 0:
        //             if (null == (a = this).data.site && null == a.data.sites) {
        //                 t.next = 15;
        //                 break;
        //             }
        //             return t.prev = 2, t.next = 5, (0, o.post)({
        //                 url: "/order/create/" + a.data.orderKey,
        //                 data: {
        //                     addressId: a.data.dizhiId,
        //                     from: "routine",
        //                     payType: "weixin",
        //                     shipping_type: 1,
        //                     couponId: a.data.couponId
        //                 }
        //             });

        //           case 5:
        //             e = t.sent, console.log(e.data.data.result.orderId), 200 == e.data.status && wx.requestPayment({
        //                 timeStamp: e.data.data.result.jsConfig.timestamp,
        //                 nonceStr: e.data.data.result.jsConfig.nonceStr,
        //                 package: e.data.data.result.jsConfig.package,
        //                 signType: e.data.data.result.jsConfig.signType,
        //                 paySign: e.data.data.result.jsConfig.paySign,
        //                 appId: e.data.data.result.jsConfig.appId,
        //                 success: function(t) {
        //                     wx.redirectTo({
        //                         url: "../paysue/index?orderId=" + e.data.data.result.orderId + "&CouponPrc=" + a.data.CouponPrc + "&priceGroup=" + a.data.priceGroup
        //                     });
        //                 },
        //                 fail: function(t) {
        //                     wx.showModal({
        //                         title: "是否取消本次支付？",
        //                         content: "您的订单在0小时29分钟内未支付将被取消，请尽快完成支付。",
        //                         showCancel: !0,
        //                         cancelText: "取消支付",
        //                         cancelColor: "#343434",
        //                         confirmText: "继续支付",
        //                         confirmColor: "C28E90",
        //                         success: function(t) {
        //                             t.cancel ? (console.log("您点击了取消"), wx.redirectTo({
        //                                 url: "../order/index"
        //                             })) : t.confirm && (console.log("您点击了确定"), a.continue(a.data.orderId));
        //                         }
        //                     });
        //                 }
        //             }), t.next = 13;
        //             break;

        //           case 10:
        //             t.prev = 10, t.t0 = t.catch(2), "request:fail " == t.t0.errMsg && wx.showToast({
        //                 title: "无网络链接",
        //                 icon: "none",
        //                 duration: 1e3
        //             });

        //           case 13:
        //             t.next = 16;
        //             break;

        //           case 15:
        //             wx.showToast({
        //                 title: "请选择地址",
        //                 icon: "none"
        //             });

        //           case 16:
        //           case "end":
        //             return t.stop();
        //         }
        //     }, t, this, [ [ 2, 10 ] ]);
        // }));
        // return function() {
        //     return t.apply(this, arguments);
        // };
    },
    //优惠券
    //优惠券
    async discounts() {
        let _that = this
        console.log(_that.data.id)
        try {
            const res = await get({
                url: '/coupons/order/720.72?cartId=' + _that.data.id,
            })
            console.log(res)
            _that.setData({
                show: true,
                usableCoupon: res.data.data,
                usableCouponleng: res.data.data.length,
            })
            // console.log(nav)
        } catch (error) {
            if (error.errMsg == "request:fail ") {
                wx.showToast({
                    title: "无网络链接",
                    icon: 'none',
                    duration: 1000
                })
            }
        }
    },
    //使用优惠券
    async onChanges(e) {
        let _that = this
        let couponId = e.detail.value
        try {
            const res = await post({
                url: "/order/computed/" + _that.data.orderKey,
                data: {
                    addressId: _that.data.dizhiId,
                    couponId: couponId,
                    payType: "weixin",
                    shipping_type: 1,
                    from: "routine",
                    useIntegral: 0
                }
            })
            console.log(res)
            if (res.data.status == 200) { //成功
                _that.setData({
                    CouponPrc: res.data.data.result.coupon_price,
                    priceGroup: res.data.data.result.pay_postage,
                    newtotalPr: res.data.data.result.total_price,
                    newtotalPrice: res.data.data.result.pay_price,
                    isTrue: true,
                    couponId: couponId
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
    //进入页面加载
    async showNavtos() {

        let _that = this
        try {
            const res = await post({
                url: "/order/confirm",
                data: {
                    cartId: _that.data.id
                }
            })
            console.log(res)
            if (res.data.status == 200 && res.data.data.addressInfo == null) { //成功
                console.log(res.data)
                _that.setData({
                    totalNums: e.data.data.cartInfo,
                    orderKey: res.data.data.orderKey,
                    newtotalPrice: res.data.data.priceGroup.totalPrice,
                    totalnum: res.data.data.cartInfo[0].cart_num,
                    priceGroup: res.data.data.priceGroup.storePostage
                })
            } else {
                let sites = []
                sites.push(res.data.data.addressInfo),
                    console.log(res.data.data),
                    _that.setData({
                        totalNums: res.data.data.cartInfo,
                        sites: sites,
                        newtotalPrice: res.data.data.priceGroup.totalPrice,
                        totalnum: res.data.data.cartInfo[0].cart_num,
                        idDr: res.data.data.addressInfo.id,
                        dizhiId: res.data.data.addressInfo.id,
                        orderKey: res.data.data.orderKey,
                        priceGroup: res.data.data.priceGroup.storePostage
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
    onReady: function () {},

    /**
     * 
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options),
            this.setData({
                id: options.id
            });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.showNavtos();
    },


    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    // onPullDownRefresh: function () {
    //   console.log(11)
    // },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }


});