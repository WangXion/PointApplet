import {
  post,
  get
} from "../../request/request.js";
Page({
  data: {},
  async userDeposit() {

    let _that = this
    try {
      const res = await get({
        url: "/extract/bank"
      })
      console.log(res)
      if (res.data.status == 200) { //成功
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
  onLoad: function (e) {},
  onReady: function () {},
  onShow: function () {
    this.userDeposit();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});