
import {
    post,
    get
} from "../../request/request.js";
Page({
    data: {},
    onLoad: function (e) {},
    //进入订单页面
    order: function (e) {
        let t = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: "/pages/order/index?index=" + t
        });
    },
    //分销中心
    Distribution: function (e) {
        wx.navigateTo({
            url: "/pages/Distribution/index"
        });
    },
    //查看全部订单
    navto: function (e) {
        let t = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: "/pages/order/index?index=" + t
        });
    },
    //创作历史
    creation: function (e) {
        wx.navigateTo({
            url: "/pages/creation/creation"
        });
    },
    //地址管理
    navtos: function (e) {
        wx.navigateTo({
            url: "/pages/AddressGl/index"
        });
    },
    //在线客服
    handleContact: function (e) {
        console.log(e.detail.path), console.log(e.detail.query);
    },
    //优惠券
    discount: function () {
        wx.switchTab({
            url: "/pages/conList/index"
        });
    },
    //进入加载页面
    async user() {
        let _that = this
        try {
            const res = await get({
                url: "/user"
            })
            console.log(res)
            if (res.data.status == 200) { //成功
                let arr = []
                arr.push(res.data.data)
                _that.setData({
                    user: arr,
                    evaluated_count: res.data.data.orderStatusNum.evaluated_count,
                    received_count: res.data.data.orderStatusNum.received_count,
                    unpaid_count: res.data.data.orderStatusNum.unpaid_count,
                    unshipped_count: res.data.data.orderStatusNum.unshipped_count
                })
                console.log(res.data)
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
        this.user();
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {}
});