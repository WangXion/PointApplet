import {
  post,
  get
} from "../../request/request.js";
Page({
  data: {
    orderId: ""
  },
  //进入加载显示页面
  async defeated() {
    let _that = this
    try {
      const res = await get({
        url: "/order/detail/" + _that.data.orderId
      })
      if (res.data.status == 200) { //成功
        let arr = []
        arr.push(res.data.data)
        _that.setData({
          order: arr
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
    // let e = this;
    // wx.showModal({
    //     title: "取消订单",
    //     content: "确定取消该订单吗？",
    //     success: function() {
    //         let n = (0, a.default)(t.default.mark(function a(n) {
    //             let o;
    //             return t.default.wrap(function(t) {
    //                 for (;;) switch (t.prev = t.next) {
    //                   case 0:
    //                     if (!n.confirm) {
    //                         t.next = 13;
    //                         break;
    //                     }
    //                     return t.prev = 1, t.next = 4, (0, r.post)({
    //                         url: "/order/cancel",
    //                         data: {
    //                             id: e.data.orderId
    //                         }
    //                     });

    //                   case 4:
    //                     (o = t.sent).data.status && (wx.showToast({
    //                         title: o.data.msg,
    //                         icon: "success",
    //                         duration: 3e3
    //                     }), wx.redirectTo({
    //                         url: "/pages/order/index"
    //                     })), t.next = 11;
    //                     break;

    //                   case 8:
    //                     t.prev = 8, t.t0 = t.catch(1), "request:fail " == t.t0.errMsg && wx.showToast({
    //                         title: "无网络链接",
    //                         icon: "none",
    //                         duration: 1e3
    //                     });

    //                   case 11:
    //                     t.next = 14;
    //                     break;

    //                   case 13:
    //                     n.cancel && console.log("用户点击取消");

    //                   case 14:
    //                   case "end":
    //                     return t.stop();
    //                 }
    //             }, a, null, [ [ 1, 8 ] ]);
    //         }));
    //         return function(e) {
    //             return n.apply(this, arguments);
    //         };
    //     }()
    // });
  },

  //显示物流
  async logIstics() {
    let _that = this
    try {
      const res = await get({
        url: "/order/express/" + _that.data.orderId
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        _that.setData({
          list: res.data.data.express.result.list,
          delivery_name: res.data.data.order.delivery_name,
          delivery_id: res.data.data.order.delivery_id,
          status: res.data.data.express.status
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
  //订单单号复制
  textPaste: function (e) {
    let t = e.currentTarget.dataset.delivery;
    wx.showToast({
        title: "复制成功"
      }),
      wx.setClipboardData({
        data: t
      });
  },
  //确认收货
  async material() {
    let _that = this
    try {
      const res = await post({
        url: "/order/take",
        data: {
          uni: _that.data.orderId
        }
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        wx.showModal({
          title: '收货成功',
          content: '是否去评价',
          showCancel: true, //是否显示取消按钮
          cancelText: "取消", //默认是“取消”
          confirmText: "去评价", //默认是“确定”
          success: function (res) {
            if (res.cancel) {
              wx.redirectTo({
                url: "/pages/order/index"
              });
            } else {
              //点击确定
              wx.redirectTo({
                url: "/pages/userEvaluation/userEvaluation?ordeid=" + _that.data.orderId
              });
            }
          },
          fail: function (res) {}, //接口调用失败的回调函数
          complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
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
  //提醒发货
  remind: function () {
    wx.showToast({
      title: "已提醒卖家",
      icon: "success"
    });
  },
  onLoad: function (e) {

    this.setData({
      orderId: e.ordeid
    });
  },
  onReady: function () {},
  onShow: function () {
    this.defeated(), this.logIstics();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});