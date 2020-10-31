import {
    post,
    get
} from "../../request/request.js";
Page({
    data: {
        show: !1,
        result: ["0", "1"],
        information: [],
        bank_name: "",
        bank_card: "",
        name: "",
        idcard: "",
        mobile: "",
        bank_id: "",
        isDefault: "0",
        columns: []
    },
    //选择银行
    onChange: function (e) {
        console.log(e);
        if (e.detail.value.id != '') {
            this.setData({
                bank_name: e.detail.value.bank_name,
                bank_id: e.detail.value.id
            })
        } else {
            wx.showToast({
                title: "请选择开户行",
                icon: "none"
            });
        }
    },

    //设为默认银行
    onChangebank: function (e) {
        this.data.information.push(e.detail),
            this.setData({
                result: e.detail
            });
    },
    //选中设为默认银行
    toogle: function (e) {
        let t = e.currentTarget.dataset.index;
        if (t == 1) {
            this.setData({
                isDefault: 0,
                index: 0
            })
        } else {
            this.setData({
                isDefault: 1,
                index: 1
            })
        }
    },

    //获取姓名
    getName: function (e) {

        if (e.detail.value.length != 0) {
            this.setData({
                name: e.detail.value
            })
        } else {
            wx.showToast({
                title: "请输入用户名",
                icon: "none"
            });
        }
    },
    //身份证
    getIdentity: function (e) {
        if (e.detail.value.length == 18) {
            this.setData({
                idcard: e.detail.value
            })
        } else {
            wx.showToast({
                title: "请输入身份证",
                icon: "none"
            });
        }
    },
    //银行卡
    getCard: function (e) {
        if (e.detail.value.length == 16 || e.detail.value.length == 19) {
            this.setData({
                bank_card: e.detail.value
            })
        } else {
            wx.showToast({
                title: "请输入正确银行卡",
                icon: "none"
            });
        }
    },
    //手机号
    getCall: function (e) {
        if (e.detail.value.length == 11) {
            this.setData({
                mobile: e.detail.value
            })
        } else {
            wx.showToast({
                title: "请输入正确手机号",
                icon: "none"
            });
        }

    },
    getVerification: function (t) {
        this.setData({
            fullName: t.detail.value,
            type: "0"
        });
    },
    //进入加载信息
    async bankSelect() {
        let _that = this
        try {
            const res = await get({
                url: "/bank/select"
            })
            console.log(res)
            let arr = []
            if (res.data.status == 200) { //成功
                for (let i = 0; i < res.data.data.length; i++) {
                    const element = res.data.data[i].bank_name;
                    console.log(element)
                    arr.push(element)

                }
                // console.log(res.data)
                _that.setData({
                    columns: arr
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

    //确认提交
    async infoBrnd(e) {
        let _that = this
        if (_that.data.name == '') {
            wx.showToast({
                title: ' 请填写姓名',
                icon: 'none'
            })
        } else if (_that.data.idcard == '' && _that.data.idcard.length != 18) {
            wx.showToast({
                title: '请填写正确身份证号码',
                icon: 'none'
            })
        } else if (_that.data.bank_name == '') {
            wx.showToast({
                title: '请选择银行',
                icon: 'none'
            })
        } else if (_that.data.bank_card == '' && _that.data.bank_card.length != 16) {
            wx.showToast({
                title: '请填写正确银行卡号',
                icon: 'none'
            })
        } else if (_that.data.mobile == '' && _that.data.mobile != 11) {
            wx.showToast({
                title: '请填写正确手机号',
                icon: 'none'
            })
        } else {
            try {
                const res = await post({
                    url: "/bank/edit",
                    data: {
                        bank_name: _that.data.bank_name,
                        bank_card: _that.data.bank_card,
                        name: _that.data.name,
                        idcard: _that.data.idcard,
                        mobile: _that.data.mobile,
                        bank_id: _that.data.bank_id,
                        is_default: _that.data.isDefault
                    }
                })
                console.log(res)
                if (res.data.status == 200) { //成功
                    wx.redirectTo({
                        url: "/pages/banklist/index"
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
    //选择银行卡
    selectdz: function () {
        this.setData({
            show: !0
        });
    },
    onClose: function () {
        this.setData({
            show: !1
        });
    },
    onLoad: function (t) {},
    onReady: function () {},
    onShow: function () {
        this.bankSelect()
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {}
});