import {
  post,
  get
} from "../../request/request.js";
Page({
  data: {
    orderId: ""
  },
  //到订单页
  goShop: function () {
    wx.redirectTo({
      url: "../order/index"
    });
  },
  //到首页
  goHome: function () {
    wx.switchTab({
      url: "../home/home"
    });
  },
  //进入加载
  async defeated() {
    let _that = this
    try {
      const res = await get({
        url: "/order/detail/" + _that.data.orderId
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        _that.setData({
          price: res.data.data.pay_price,
          coupon_price: res.data.data.coupon_price
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
  //热门推荐
  async hot() {
    let _that = this
    try {
      const res = await get({
        url: "/product/hot?page=1&limit=999"
      })
      if (res.data.status == 200) { //成功
        let call = res.data.data.filter(item => item.cate_id == 4)
        let vacuum = res.data.data.filter(item => item.cate_id == 5)
        let tShirt = res.data.data.filter(item => item.cate_id == 6)
        _that.setData({
          call,
          vacuum,
          tShirt,
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
  //查看详情
  goDetails: function (e) {
    let {
      id
    } = e.currentTarget.dataset;
    let {
      name
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/${name}/${name}?index=` + id
    });
  },
  onLoad: function (e) {
    console.log(e), this.setData({
      orderId: e.orderId,
      CouponPrc: e.CouponPrc,
      priceGroup: e.priceGroup
    });
  },
  onReady: function () {},
  onShow: function () {
    this.defeated(), this.hot();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});