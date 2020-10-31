import {
    post,
    get
} from "../../request/request.js";
    Page({
        data: {
            active: 0
        },
        //进入就加载页面
        async showEvaluate(e) {
            let _that = this
            try {
                const res = await get({
                    url: '/order/list?&page=1&limit=999',
                })
                // 0未付款 1待发货 2待收货 3待评价 4已完成
                let paymentAll = res.data.data
                let payment = res.data.data.filter(item => item._status._type == 0)
                let paymentOne = res.data.data.filter(item => item._status._type == 1)
                let paymentTwo = res.data.data.filter(item => item._status._type == 2)
                let paymentThree = res.data.data.filter(item => item._status._type == 3)
                let paymentFour = res.data.data.filter(item => item._status._type == 4)
                _that.setData({
                    paymentAll,
                    payment,
                    paymentOne,
                    paymentTwo,
                    paymentThree,
                    paymentFour,
                })

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
        //删除订单
        del(e) {
            let _that = this,
                {
                    orderid
                } = e.currentTarget.dataset;
            wx.showModal({
                title: '提示',
                content: '是否删除该商品',
                showCancel: true, //是否显示取消按钮
                cancelText: "取消", //默认是“取消”
                confirmText: "确定", //默认是“确定”
                async success(res) {
                    if (res.cancel) {
                        //点击取消,默认隐藏弹框
                    } else {
                        try {
                            const res = await post({
                                url: "/order/del",
                                data: {
                                    "uni": orderid
                                }
                            })
                            if (res.data.status == 200) { //成功
                                wx.showToast({
                                    title: '删除成功',
                                    icon: "none"
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
                        _that.showEvaluate()
                    }
                },
                fail: function (res) {}, //接口调用失败的回调函数
                complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
        },
        //提醒发货
        remind: function (t) {
            let {
                ordeid
            } = e.currentTarget.dataset
            wx.navigateTo({
                url: "/pages/amount/amount?ordeid=" + ordeid
            });
        },
        //取消订单
        cancel: function (e) {
            let {
                ordeid
            } = e.currentTarget.dataset;
            // t.currentTarget.dataset.item;
            wx.navigateTo({
                url: "/pages/amount/amount?ordeid=" + ordeid
            });
        },
        //查看物流
        logistics: function (e) {
            let {
                ordeid
            } = e.currentTarget.dataset;
            wx.navigateTo({
                url: "/pages/amount/amount?ordeid=" + ordeid
            });
        },
        //确认收货
        confirm: function (e) {
            let {
                ordeid
            } = e.currentTarget.dataset
            wx.navigateTo({
                url: "/pages/amount/amount?ordeid=" + ordeid
            });
        },
        //申请退款
        navtoAftersale: function (e) {
            let {
                ordeid
            } = e.currentTarget.dataset
            wx.navigateTo({
                url: "/pages/Aftersale/index?ordeid=" + ordeid
            });
        },
        //评价页面
        evaluate: function (e) {
            let {
                ordeid
            } = e.currentTarget.dataset
            wx.navigateTo({
                url: "/pages/userEvaluation/userEvaluation?ordeid=" + ordeid
            });
        },
        //订单详情页面
        goDetails: function (e) {
            let {
                ordeid
            } = e.currentTarget.dataset;

            wx.navigateTo({
                url: "/pages/orderDetails/orderDetails?ordeid=" + ordeid
            });
        },
        //再次购买
        async Another(e) {
            let _that = this
            try {
                const res = await post({
                    url: "/cart/add",
                    data: {
                        productId: e.currentTarget.dataset.id,
                        new: "1",
                        uniqueId: e.currentTarget.dataset.unique,
                        cartNum: 1,
                        img: e.currentTarget.dataset.image
                    }
                })
                if (res.data.status == 200) { //成功
                    // wx.redirectTo({
                    //     url: "/pages/orderSub/index?id=" + res.data.cartId
                    //  }) 
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
            let index = e.index;
            this.setData({
                active: index
            });
        },
        onReady: function () {},
        onLoad(e) {
            let index = e.index;
            this.setData({
                active: Number(index)
            });
        },
        onShow() {
            this.showEvaluate();
        }
    }, )
