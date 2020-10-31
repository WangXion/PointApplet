// pages/home/home.js
import {
  post,
  get
} from "../../request/request.js";
// 引入
// 使用相对路径引入创建的文件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollLeft: '',
  },
  //点击往左
  goRight() {
    this.setData({
      scrollLeft: -320
    })
    // console.log("右")

  },
  //点击往右
  goLeft() {
    this.setData({
      scrollLeft: 0
    })
    // console.log("左")
  },
  //跳转详情e
  toDetail: (e) => {
    let id = e.currentTarget.dataset.id;
    let title = e.currentTarget.dataset.title;
    console.log(id)
    wx.navigateTo({
      url: '/pages/detail/detail?index= ' + id,
    })
  },
  cupdetail: (e) => {
    let id = e.currentTarget.dataset.id;
    let title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/cupdetail/cupdetail?index= ' + id,
    })
  },
  shirt: (e) => {
    let id = e.currentTarget.dataset.id;
    let title = e.currentTarget.dataset.title;
    console.log(id)
    wx.navigateTo({
      url: '/pages/shirtdetail/shirtdetail?index= ' + id,
    })
  },
  //手机壳 T恤 保温杯
  async showNav() {
    let _that = this
    try {
      const res = await get({
        url: '/index',
      })
      // console.log(res.data.data.store[4].cate.goods[0])
      // console.log(res.data.data.store[4].cate.goods.length)
      // console.log(res.data.data.store[5].cate.pic)
      console.log(res)
      if (res.data.status == 200) {
        _that.setData({
          nav: res.data.data.store[4].cate.goods,
          nav1: res.data.data.store[5].cate.goods,
          nav2: res.data.data.store[6].cate.goods,
          contentOne: res.data.data.store[5].cate.pic,
          contentTwo: res.data.data.store[6].cate.pic,
          banner: res.data.data.banner
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        })
      }

      // console.log(nav)
    } catch (error) {
      if (error.errMsg == "request:fail ") {
        wx.showToast({
          title: "无网络链接",
          icon: 'none',
          duration: 1000
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.showNav();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})