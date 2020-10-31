import {
  post,
  get
} from "../../request/request.js";
Page({
  data: {
    pics: [],
    orderId: "",
    textarea: "",
    goodsvalue: 1,
    servicevalue: 1,
    unique: "",
    Img: []
  },
  //进入加载
  async defeated() {
    let _that = this
    try {
      const res = await get({
        url: "/order/detail/" + _that.data.orderId
      })
      console.log(res)
      console.log(res.data.data)
      if (res.data.status == 200) { //成功
        let orderData = []
        orderData.push(res.data.data)
        _that.setData({
          order: orderData,
          unique: res.data.data.cartInfo[0].unique
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
    let textarea = _that.data.textarea
    let ImgNew = pics.join(",")
    if (textarea.length > 20 && ImgNew.length != 0) {
      try {
        const res = await post({
          url: "/order/comment",
          data: {
            product_score: _that.data.goodsvalue,
            pics: ImgNew,
            comment: _that.data.textarea,
            unique: _that.data.unique,
            service_score: _that.data.servicevalue
          }
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
    } else if (textarea.length <= 20) {
      wx.showToast({
        title: '请输入推荐原因且不少于20个字',
        icon: "none"
      })
    } else if (ImgNew.length == 0) {
      wx.showToast({
        title: '请上传你的照片',
        icon: "none"
      })
    }

  },

  //获取详情信息
  textarea: function (e) {
    console.log(e.detail), this.setData({
      textarea: e.detail
    });
  },
  //服务评价
  serviceChange: function (e) {
    console.log(e),
      this.setData({
        servicevalue: e.detail
      });
  },
  //商品评价
  goodsChange: function (e) {
    console.log(e),
      this.setData({
        goodsvalue: e.detail
      });
  },
  onLoad: function (e) {
    console.log(e),
      this.setData({
        orderId: e.ordeid
      });
  },
  //上传图片
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
          console.log(e);
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
              fail: function (e) {
                console.log(e);
              }
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
  //展示图片
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
    this.defeated();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});