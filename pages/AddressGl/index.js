import {
  post,
  get
} from "../../request/request.js";
Page({
  data: {},
  //订单页面跳转过来选择地址
  sele: function (e) {
    let t = e.currentTarget.dataset.item
    let a = [];
    a.push(t);
    let pages = getCurrentPages(); //当前页面栈
    let prevPage = pages[pages.length - 2]; //上一页面
    console.log(prevPage)
    if (prevPage.__route__ == "pages/orderSub/index") {
      prevPage.setData({
        site: a,
        dizhiId: t.id
      })
      wx.navigateBack({
        delta: 1
      })
    }
  },
  //获取所有地址
  async showLocation() {
    let _that = this
    try {
      const res = await get({
        url: "/address/list?page=1&limit=999"
      })
      console.log(res)
      let arr = res.data.data

      if (res.data.status == 200) { //成功
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].phone = res.data.data[i].phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') //隐藏用户手机号
          console.log(res.data.data)
        }
        _that.setData({
          address: res.data.data
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
  //删除地址
  async dele(e) {
    console.log(e)
    let {
      id
    } = e.currentTarget.dataset
    let _that = this
    try {
      const res = await post({
        url: "/address/del",
        data: {
          id: id
        }
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        wx.showToast({
          title: '删除成功',
          icon: "none",
        })
        wx.redirectTo({
          url: "/pages/AddressGl/index"
        })
      } else {
        wx.showToast({ //失败
          title: res.data.msg,
          icon: 'none',
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
  //修改地址
  editAddress: function (e) {
    let t = e.currentTarget.dataset.item;
    console.log(t), wx.navigateTo({
      url: "/pages/editAddress/editAddress?item=" + JSON.stringify(t)
    });
  },
  onLoad: function (e) {},
  //新增地址
  adddz: function () {
    wx.navigateTo({
      url: "/pages/changeaddress/index"
    });
  },
  onReady: function () {},
  onShow: function () {
    this.showLocation();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});