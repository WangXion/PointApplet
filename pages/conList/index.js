import {
  post,
  get
} from "../../request/request.js";
Page({
  data: {
    Change: !1
  },
  //显示优惠券
  async coupon() {
    let _that = this
    try {
      const res = await get({
        url: "/coupons/user/0"
      })
      let couponNew = res.data.data.filter(item => item._type == 1)
      let couponOld = res.data.data.filter(item => item._type == 0)
      if (res.data.status == 200) { //成功
        _that.setData({
          coupon: couponNew,
          noCoupon: couponOld,
          couponleng: couponNew.length,
          noCouponleng: couponOld.length,
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
  //去购物
  goShop: function (e) {
    let t = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/detail/detail?index=" + t
    });
  },
  onLoad: function (e) {},
  onChanges: function (e) {
    this.setData({
      result: e.detail
    });
    let t = this.data.Change;
    this.data.Change, this.setData({
      Change: t = !t
    });
  },
  onReady: function () {},
  onShow: function () {
    this.coupon();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});