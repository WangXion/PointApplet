import {
    post,
    get
} from "../../request/request.js";
Page({
    data: {
        radio: ""
    },
    onLoad: function (t) {},
    recording: function (t) {
        wx.navigateTo({
            url: "/pages/recording/index"
        });
    },
    //选择默认银行   最后要修改逻辑 逻辑跟地址一样
    async onChang(e) {
        let _that = this
        let {
            id
        } = currentTarget.dataset
        try {
            const res = await post({
                url: "/bank/default/set",
                data: {
                    id
                }
            })
            console.log(res)
            if (res.data.status == 200) { //成功
                _that.setData({
                    radio: id
                })
                wx.showToast({
                    title: "已选中默认银行卡",
                    icon: "success",
                    duration: 1500
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
    async default () {
        let _that = this
        try {
            const res = await get({
                url: "/bank/default"
            })
            console.log(res)
            if (res.data.status == 200) { //成功
                console.log(res.data)
                let arr = []
                arr.push(res.data.data)
                _that.setData({
                    radio: res.data.data.id,
                    card: arr
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
    navto: function () {
        wx.navigateTo({
            url: "/pages/addbank/index"
        });
    },
    async bankList() {

        let _that = this
        try {
            const res = await get({
                url: "/bank/list"
            })
            console.log(res)
            if (res.data.status == 200) { //成功
                let bank = res.data.data
                for (let i = 0; i < bank.length; i++) {
                    bank[i].bank_card = bank[i].bank_card.replace(/(\d{4})\d{11}(\d{4})/, '$1********$2');
                }
                _that.setData({
                    bank
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
    //跳转选择银行卡
    sele: function (e) {
        let t = e.currentTarget.dataset.item
        let a = [];
        a.push(t);
        let pages = getCurrentPages(); //当前页面栈
        let prevPage = pages[pages.length - 2]; //上一页面
        if (prevPage.__route__ == "pages/withdraw/index") {
            prevPage.setData({
                site: a,
                dizhiId: t.id
            })
            wx.navigateBack({
                delta: 1
            })
        }
    },
    //跳转其他界面
    editbank: function (e) {
        let {
            id
        } = e.currentTarget.dataset;
        wx.navigateTo({
            url: "/pages/bank_detail/index?id=" + id
        });
    },
    //删除银行卡
    async del() {

        let _that = this
        let {
            id
        } = e.currentTarget.dataset;
        try {
            const res = await get({
                url: "/bank/del",
                data: {
                    id
                }
            })
            console.log(res)
            if (res.data.status == 200) { //成功
                wx.showToast({
                    title: "删除成功",
                    icon: "success",
                    duration: 1500
                })
                _that.bankList()
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
    onReady: function () {},
    onShow: function () {
        this.bankList()
        this.default();
    }
});