import {
    post,
    get
} from "../../request/request.js";
Page({
    data: {
        active: 1,
        alipayMoney: "",
        bankMoney: "",
        site: '',
        banklen: false,
        alipay_code: ''
    },
    //用户数据
    async user() {
        let _that = this
        try {
            const res = await get({
                url: "/user"
            })
            if (res.data.status == 200) { //成功
                _that.setData({
                    userData: res.data.data
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
    //支付宝账号
    async Alipay() {
        let _that = this
        if (_that.data.alipay_code != '' && _that.data.alipayMoney != '' && _that.data.alipay_code == 11) {
            try {
                const res = await post({
                    url: "/extract/cash",
                    data: {
                        "money": _that.data.alipayMoney,
                        "name": _that.data.name,
                        "alipay_code": _that.data.alipay_code,
                        "extract_type": "alipay"
                    }
                })
                if (res.data.status == 200) { //成功
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
        if (_that.data.alipayMoney == '') {
            wx.showToast({ //失败
                title: "请输入提现金额",
                icon: 'none',
            })
        } else if (_that.data.alipay_code == '') {
            wx.showToast({ //失败
                title: "请输入支付宝账号",
                icon: 'none',
            })
        }


    },
    //立即提现
    async handleBank() {
        let _that = this
        if (_that.data.site == '') {
            if (_that.data.bankMoney != '') {
                try {
                    const res = await post({
                        url: "/extract/cash",
                        data: {
                            "user_bank_id": _that.data.bank[0].id,
                            "name": _that.data.bank[0].name,
                            "money": _that.data.bankMoney,
                            "extract_type": "bank"
                        }
                    })
                    if (res.data.status == 200) { //成功
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
                    title: '请输入金额',
                    icon: 'none'
                })
            }
        } else {
            if (_that.data.bankMoney != '') {
                try {
                    const res = await post({
                        url: "/extract/cash",
                        data: {
                            "user_bank_id": _that.data.site[0].id,
                            "name": _that.data.site[0].name,
                            "money": _that.data.bankMoney,
                            "extract_type": "bank"
                        }
                    })
                    if (res.data.status == 200) { //成功
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
                    title: '请输入金额',
                    icon: 'none'
                })
            }
        }
    },
    //默认信息
    async b_default() {
        let _that = this
        try {
            const res = await get({
                url: "/bank/default"
            })
            console.log(Object.keys(res.data.data).length == 0) //判断对象是否为空
            if (res.data.status == 200) { //成功
                if (Object.keys(res.data.data).length == 0) {

                    _that.setData({
                        banklen: 1
                    })
                } else {

                    let arr = []
                    arr.push(res.data.data)
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].bank_card = arr[i].bank_card.replace(/(\d{4})\d{8}(\d{4})/, '$1********$2');
                    }
                    _that.setData({
                        bank: arr,
                    })
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
    },
    //微信提交
    async WeChatPay() {
        let _that = this
        if (_that.data.money.length != 0) {
            try {
                const res = await get({
                    url: "/extract/cash",
                    data: {
                        bankname: _that.data.Pay[0].bankname,
                        cardnum: _that.data.Pay[0].cardnum,
                        extract_type: "weixin",
                        money: _that.data.money,
                        name: "wx",
                        weixin: "14786149914"
                    }
                })

                if (res.data.status == 200) { //成功
                    wx.showToast({
                        title: "提现成功，请稍后",
                        icon: "success"
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
        } else {
            wx.showToast({
                title: "请先输入提现金额",
                icon: "none"
            });
        }
    },
    onLoad: function (e) {},
    morelist: function () {
        wx.navigateTo({
            url: "/pages/banklist/index"
        });
    },
    //提现金额
    getMoney: function (e) {
        let t = e.detail;

        this.setData({
            alipayMoney: t,
            bankMoney: t
        });
    },
    //真实姓名
    getName: function (e) {

        this.setData({
            name: e.detail
        });
    },
    //请输入您的支付宝账号
    getAlipayCode: function (e) {

        this.setData({
            alipay_code: e.detail
        });
    },
    //提现到支付宝
    onChange: function (e) {

        this.setData({
            active: e.detail.name,
            money: e.detail
        });
    },
    onReady: function () {},
    onShow: function () {
        this.b_default(),
            this.user();
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {}
});