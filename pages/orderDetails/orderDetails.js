import {
  post,
  get
} from "../../request/request.js";
Page({
  data: {
    unique: "",
    image: "",
    orderId: ""
  },
  //进入加载页面
  async defeated() {
    let _that = this
    try {
      const res = await get({
        url: "/order/detail/" + _that.data.orderId
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        let order = []
        order.push(res.data.data)
        _that.setData({
          order: order,
          unique: res.data.data.cartInfo[0].productInfo.attrInfo.unique,
          image: res.data.data.cartInfo[0].productInfo.attrInfo.image
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
  //继续支付
  async navtoPay() {

    let _that = this
    try {
      const res = await get({
        url: "/order/pay",
        data: {
          from: "routine",
          payType: "weixin",
          uni: _that.data.orderId
        }
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        wx.requestPayment({
          timeStamp: res.data.data.result.jsConfig.timestamp,
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
            wx.showToast({
                title: "支付失败",
                icon: "none",
                duration: 3e3
              }),
              wx.redirectTo({
                url: "/pages/order/index"
              });
          }
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
  //取消支付
  rePay() {
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单吗？',
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是“取消”
      confirmText: "确定", //默认是“确定”
      async success(res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          try {
            const res = await get({
              url: "/order/cancel",
              data: {
                id: _that.data.orderId
              }
            })
            console.log(res)
            if (res.data.status == 200) { //成功
              wx.showToast({
                  title: res.data.msg,
                  icon: "success",
                  duration: 2000
                }),
                wx.redirectTo({
                  url: "/pages/order/index"
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
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },
  //再次购买
  async purchase(e) {

    let _that = this
    let {
      id
    } = e.currentTarget.dataset
    try {
      const res = await post({
        url: "/cart/add",
        data: {
          productId: id,
          new: "1",
          uniqueId: _that.data.unique,
          cartNum: 1,
          img: _that.data.image
        }
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        wx.redirectTo({
          url: "/pages/orderSub/index?id=" + res.data.data.cartId
        })
        _that.setData({
          hindeshop: false
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
  //选择地址
  // changeAddress: function() {
  //     wx.navigateTo({
  //         url: "/pages/AddressGl/index"
  //     });
  // },
  //查看物流
  logIstics: function () {
    wx.navigateTo({
      url: "/pages/logistics/logistics"
    });
  },
  //提醒卖家
  remind: function () {
    wx.showToast({
      title: "已提醒卖家",
      icon: "success"
    });
  },
  onLoad: function (t) {
    this.setData({
      orderId: t.ordeid
    });
  },
  onReady: function () {},
  onShow: function () {
    this.defeated();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});