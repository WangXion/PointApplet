import {
    post,
    get
} from "../../request/request.js";
Page({
    data: {
        show: !1,
        detail_id: "",
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
    //选择银行信息
    onChange: function (e) {
        console.log(e)
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
    //获取姓名
    getName: function (e) {
        if (e.detail.length != 0) {
            this.setData({
                name: e.detail
            })
        } else {
            wx.showToast({
                title: "请输入用户名",
                icon: "none"
            });
        }

    },
    //获取身份证
    getIdentity: function (e) {
        if (e.detail.length == 18) {
            this.setData({
                idcard: e.detail
            })
        } else {
            wx.showToast({
                title: "请输入正确身份证",
                icon: "none"
            });
        }
    },
    //正确银行卡
    getCard: function (e) {
        if (e.detail.length == 16 || e.detail.value.length == 19) {
            this.setData({
                bank_card: e.detail
            })
        } else {
            wx.showToast({
                title: "请输入正确银行卡",
                icon: "none"
            })
        }

    },
    //电话
    getCall: function (e) {
        console.log(e)
        if (e.detail.length == 11) {
            this.setData({
                mobile: e.detail
            })
        } else {
            wx.showToast({
                title: "请输入正确手机号",
                icon: "none"
            });
        }
    },
    getVerification: function (a) {
        this.setData({
            fullName: a.detail,
            type: "0"
        });
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

    //显示银行卡数据
    async bankSelect() {
        let _that = this
        try {
            const res = await get({
                url: "/bank/select"
            })
            console.log(res)
            if (res.data.status == 200) { //成功
                _that.setData({
                    columns: res.data.data
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
    //提交
    async bank_detail() {


        let _that = this
        try {
            const res = await get({
                url: "/bank/detail/" + _that.data.detail_id
            })
            console.log(res)
            if (res.data.status == 200) { //成功
                _that.setData({
                    bank_name: res.data.data.bank_cate.bank_name,
                    name: res.data.data.name,
                    idcard: res.data.data.idcard,
                    bank_card: res.data.data.bank_card,
                    mobile: res.data.data.mobile,
                    bank_id: res.data.data.bank_id,
                    is_default: res.data.data.is_default
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
    //选择银行卡
    async bank_select() {
        let _that = this
        try {
            const res = await get({
                url: "/bank/select"
            })
            if (res.data.status == 200) { //成功
                _that.setData({
                    select_data: res.data.data
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
    //确认
    async handleEdit(e) {
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
    // 选择银行
    selectdz: function (a) {
        this.setData({
            show: !0
        });
    },
    //关闭模态框
    onClose: function () {
        this.setData({
            show: !1
        });
    },
    onLoad: function (a) {
        let t = JSON.parse(a.id);
        this.setData({
            detail_id: t
        });
    },
    onReady: function () {},
    onShow: function () {
        this.bankSelect(), this.bank_detail(), this.bank_select();
    }
});