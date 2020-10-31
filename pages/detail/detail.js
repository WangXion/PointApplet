import {
  post,
  get
} from "../../request/request.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    iPhone: false,
    particulars: '',
    id: "",
    goBrandOne: '',
    goBrandtwo: '',
    brand: '', //品牌
    model: '', //型号
    value: '',
    //预览照片
    showdown: false,
    show: false,
    id: '',
    bgc: '',
    bgcs: '',
    // price:'',
    unique: '',
    img: ''
  },
  //预览图片，放大预览
  preview(event) {
    let currentUrl = event.currentTarget.dataset.src
    let {
      img
    } = event.currentTarget.dataset
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: img // 需要预览的图片http链接列表
    })
  },
  showPopup() { //后端拿到的牌子和型号分别复制给bgc和bgcs 实现点击定制改变背景颜色
    this.setData({
      show: true,
      showdown: true
      // bgc:paizi,    
      // bgcs:xinhao
    });
  },

  //评论跳转
  discuss() {
    let _that = this
    let id = _that.data.id
    wx.navigateTo({
      url: '/pages/discuss/discuss?id=' + id,
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  //评论
  async comment() {
    let _that = this
    let id = Number(_that.data.id)
    try {
      const res = await get({
        url: "/reply/list/" + id + "?page=" + 1 + "&limit=" + 999999 + "&type=" + 0
      })
      console.log(res.data.data)
      console.log(res.data.data.length)
      let  evaluate=[]
      if (res.data.status == 200) {
        if (res.data.data.length==0) {
          _that.setData({
            pin: res.data.data //判断是否显示更多
          })
        }else if (res.data.data.length==1) {
             evaluate.push(res.data.data[0])
          _that.setData({
            evaluate, //显示条数
            pin: res.data.data //判断是否显示更多
          })
         }else  if (res.data.data.length==2) {
          evaluate.push(res.data.data[0], res.data.data[1])
          console.log(evaluate)
          _that.setData({
            evaluate, //显示条数
            pin: res.data.data //判断是否显示更多
          })
         }else if (res.data.data.length>=3) {

            evaluate.push(res.data.data[0], res.data.data[1], res.data.data[2])
          _that.setData({
            evaluate, //显示条数
            pin: res.data.data //判断是否显示更多
          })
         }
      }
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
  //品牌
  async showBrand() {
    let _that = this
    let id = _that.data.id
    try {
      const res = await get({
        url: '/product/detail/' + Number(id),
      })

      let particulars = []
      particulars.push(res.data.data.storeInfo)
      if (res.data.status == 200) {
        _that.setData({
          particulars, //价格
          goodsDescImg: res.data.data.storeInfo.slider_image, //详情底部图片
          banner: res.data.data.storeInfo.slider_image, //轮播
          pinpai: res.data.data.shouji
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
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
  guanbi() {
    this.setData({
      show: false
    })
  },
  //选择品牌
  jixin(e) {
    let {
      index
    } = e.currentTarget.dataset
    let {
      relatedid
    } = e.currentTarget.dataset
    let _that = this
    _that.setData({
      bgc: index,
      goBrandOne: index,
      brand: index,
      xin: relatedid,
      model: "aa" //清除默认
    })



  },



  //选择型号
  async jixins(e) {
    let {
      items
    } = e.currentTarget.dataset
    let {
      innhtml
    } = e.currentTarget.dataset
    // let contrast=this.data.goBrandOne+','+items
    let _that = this
    let id = _that.data.id

    try {
      const res = await get({
        url: '/product/detail/' + Number(id),
      })

      if (res.data.status == 200) {
        let shouji_childs = res.data.data.shouji_child.filter(item => item.name == items)

        let value = shouji_childs[0].value
        let productValue = res.data.data.productValue.filter(item => item.name == value)

        _that.setData({
          productValue,
          image: productValue[0].data.image,
          // price:productValue[0].data.price,
          unique: productValue[0].data.unique,
        })
      }
    } catch (error) {
      if (error.errMsg == "request:fail ") {
        wx.showToast({
          title: "无网络链接",
          icon: 'none',
          duration: 1000
        })
      }
    }
    this.setData({
      bgcs: items,
      goBrandtwo: items,
      innhtml: innhtml,
    })
  },

  //跳转定制
  next() {
    let id = this.data.id
    let {
      goBrandtwo
    } = this.data
    let {
      goBrandOne
    } = this.data
    let brands = id + ',' + this.data.unique + ',' + this.data.image
    if (goBrandOne == "undefined" || goBrandOne == null || goBrandOne == "" || goBrandtwo == "undefined" || goBrandtwo == null || goBrandtwo == "") {
      wx.showToast({
        title: "请先选择商品", // 提示的内容
        icon: "none", // 图标，默认success
      })
    } else {
      wx.navigateTo({
        url: '/pages/customization/customization?brands= ' + brands,
      })

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.index;
    let _that = this;
    _that.setData({
      id: id,
    })
    wx.getSystemInfo({
      success: function (res) {
        _that.setData({
          brand: res.brand,
          model: res.model

        })
        if (res.model == 'iPhone X' || res.model == 'iPhone XR' || res.model == 'iPhone XS Max' || res.model == 'iPhone 11' || res.model == 'iPhone 11pro' || res.model == 'iPhone 11pro Max') {
          _that.setData({
            iPhone: true
          })
        }
      }
    })


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
    this.showBrand();
    this.comment();
    // this.showEvaluate()
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