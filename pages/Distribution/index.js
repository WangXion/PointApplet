import {
    post,
    get
} from "../../request/request.js";
    Page({
        data: {
            show: false,
            motto: "Hello World",
            hidden: true,
            userInfo: {},
            hasUserInfo: false,
            windowWidth: "",
            posterHeight: ""
        },
        //进入页面加载用户信息
        async user() {
            let _that = this
            try {
                const res = await get({
                    url: "/user"
                })
                if (res.data.status == 200) { //成功
                    _that.setData({
                        user: res.data.data
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
        //进入页面加载推广用户
        async userPromotion() {
            let _that = this
            try {
                const res = await post({
                    url: "/spread/people"
                })
                if (res.data.status == 200) { //成功

                    _that.setData({
                        tg_peopl: res.data.data,
                        tg_peoplleng: res.data.data.list.length,
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
            // let e = (0, r.default)(t.default.mark(function e() {
            //     let r, a, s;
            //     return t.default.wrap(function (e) {
            //         for (;;) switch (e.prev = e.next) {
            //             case 0:
            //                 return r = this, e.prev = 1, e.next = 4, (0, n.post)({
            //                     url: "/spread/people"
            //                 });

            //             case 4:
            //                 a = e.sent, s = a.data.data, console.log(s), 200 == a.data.status && r.setData({
            //                     tg_peopl: s,
            //                     tg_peoplleng: s.list.length,
            //                 }), e.next = 12;
            //                 break;

            //             case 9:
            //                 e.prev = 9, e.t0 = e.catch(1), "request:fail " == e.t0.errMsg && wx.showToast({
            //                     title: "无网络链接",
            //                     icon: "none",
            //                     duration: 1e3
            //                 });

            //             case 12:
            //             case "end":
            //                 return e.stop();
            //         }
            //     }, e, this, [
            //         [1, 9]
            //     ]);
            // }));
            // return function () {
            //     return e.apply(this, arguments);
            // };
        },
        //进入页面加载订单
        async userOrder() {
            let _that = this
            try {
                const res = await post({
                    url: "/spread/people"
                })
                console.log(res)
                if (res.data.status == 200) { //成功
                    console.log(res.data)
                    _that.setData({
                        break: res.data.data.list
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
            // let e = (0, r.default)(t.default.mark(function e() {
            //     return t.default.wrap(function (e) {
            //         for (;;) switch (e.prev = e.next) {
            //             case 0:
            //                 return this, e.prev = 1, e.next = 4, (0, n.post)({
            //                     url: "/spread/people"
            //                 });

            //             case 4:
            //                 e.sent, e.next = 10;
            //                 break;

            //             case 7:
            //                 e.prev = 7, e.t0 = e.catch(1), "request:fail " == e.t0.errMsg && wx.showToast({
            //                     title: "无网络链接",
            //                     icon: "none",
            //                     duration: 1e3
            //                 });

            //             case 10:
            //             case "end":
            //                 return e.stop();
            //         }
            //     }, e, this, [
            //         [1, 7]
            //     ]);
            // }));
            // return function () {
            //     return e.apply(this, arguments);
            // };
        },
        onLoad: function (e) {},
        navto: function (e) {
            let t = e.currentTarget.dataset.name;
            wx.navigateTo({
                url: "/pages/".concat(t, "/index")
            });
        },
        onReady: function () {},
        //立即推广
        async clickTg() {
            let _that = this
            try {
                const res = await get({
                    url: "/spread/banner"
                })
                console.log(res)
                if (res.data.status == 200) { //成功
                    console.log(res.data)
                    _that.setData({
                        spread: res.data.data,
                        show: true

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
        onClickHide: function () {
            this.setData({
                show: false
            });
        },
        onShow: function () {
            this.user(), this.userPromotion(), this.userOrder();
        },
        onHide: function () {},
        onUnload: function () {},
        onload: function () {},
        onPullDownRefresh: function () {},
        onReachBottom: function () {},
        onShareAppMessage: function () {}
    });