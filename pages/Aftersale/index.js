import {
  post,
  get
} from "../../request/request.js";
Page({
  data: {
    show: false,
    radio: "",
    pics: [],
    orderId: "",
    textarea: "",
    file: "",
    userNname: "",
    userCall: "",
    Img: []
  },
  //默认加载页面数据
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
  //提交
  async Aftersale() {
    let _that = this
    let pics = _that.data.pics
    let ImgNew = pics.join(",")
    if (_that.data.userNname.length != 0 && _that.data.userCall.length != 0 && _that.data.radio.length != 0 && _that.data.textarea.length != 0 && ImgNew.length != 0) {
      try {
        const res = await post({
          url: "/order/refund/verify",
          data: {
            refund_reason_wap_explain: _that.data.radio,
            refund_reason_wap_img: ImgNew,
            text: _that.data.textarea,
            uni: _that.data.orderId,
            refund_user_name: _that.data.userNname,
            refund_user_mobile: _that.data.userCall
          }
        })
        if (res.data.status == 200) { //成功
          wx.showToast({
            title: '申请成功请耐心等待',
            icon: 'success'
          })
          wx.redirectTo({
            url: '/pages/order/index',
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
    } else {
      wx.showToast({
        title: '请填写完整',
        icon: "none"
      })
    }
  },
  //选择原因
  async reason() {

    let _that = this
    try {
      const res = await get({
        url: "/order/refund/reason"
      })
      if (res.data.status == 200) { //成功
        _that.setData({
          reason: res.data.data
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
  //关闭模态框
  onClose: function () {
    this.setData({
      show: !1
    });
  },
  //售后类型
  selectType: function () {
    this.setData({
      show: true
    });
  },
  //选择原因
  onClick: function (e) {
    let t = e.currentTarget.dataset.name;
    this.setData({
      radio: t
    });
  },
  //获取输入信息
  textarea: function (e) {

    this.setData({
      textarea: e.detail
    });
  },
  //获取输入姓名
  userNname: function (e) {

    this.setData({
      userNname: e.detail
    });
  },
  //获取输入电话
  userCall: function (e) {

    this.setData({
      userCall: e.detail
    });
  },
  onLoad: function (e) {

    this.setData({
      orderId: e.ordeid
    });
  },
  //选择上传图片One
  previewImg: function (e) {
    let {
      index
    } = e.target.dataset
    let {
      list
    } = e.target.dataset;
    wx.previewImage({
      current: list[index],
      urls: list
    });
  },
  //选择上传图片限制上传数量
  //选择上传图片方式
  chooseImg: function (e) {
    let _that = this
    let {
      pics
    } = _that.data
    if (pics.length < 4) {
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function (e) {
          let tempFilePaths = e.tempFilePaths;
          for (let i = 0; i < tempFilePaths.length; i++) {
            pics.push(tempFilePaths[i])
            //  const imgUrl = tempFilePaths[i];
            wx.uploadFile({
              filePath: tempFilePaths[i],
              name: "file",
              url: "https://api.midiandz.com/api/upload/image",
              header: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authori-zation": wx.getStorageSync("Authori-zation")
              },
              success: function (e) {
                let data = JSON.parse(e.data)
                if (data.status == 200) {
                  _that.setData({
                    pics,
                    Img: e.data.url
                  })
                  wx.showToast({
                    title: '上传成功',
                  })
                }
              },
              fail: function (e) {}
            });

          }
        }
      })
    } else {
      wx.showToast({
        title: "最多上传4张图片",
        icon: "none",
        duration: 2000
      });
    }
  },
  //图片删除
  deleteImg: function (e) {
    let {
      pics
    } = this.data
    let {
      index
    } = e.currentTarget.dataset;
    pics.splice(index, 1)
    this.setData({
      pics
    });
  },
  //查看放大图
  previewImg1: function (e) {
    let {
      pics
    } = this.data
    let {
      index
    } = e.currentTarget.dataset;
    wx.previewImage({
      current: pics[index],
      urls: pics
    });
  },
  onReady: function () {},
  onShow: function () {
    this.defeated(), this.reason();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});