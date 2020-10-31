import {
  post,
  get
} from "../../request/request.js";
Page({
  data: {},
  //点击进入创作页面的历史详情
  innovate: function (e) {
    console.log(e);
    let t = e.currentTarget.dataset.img;
    wx.navigateTo({
      url: "/pages/innovate/innovate?img=" + t
    });
  },
  //默认加载所有数据
  async showCrea() {
    let _that = this
    try {
      const res = await get({
        url: "/order/list?type=4&page=1&limit=10"
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        _that.setData({
          order: res.data.data
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
  onLoad: function (e) {},
  onReady: function () {},
  onShow: function () {
    this.showCrea();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});