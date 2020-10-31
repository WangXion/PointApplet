import {
  post,
  get
} from "../../request/request.js";
Page({
  data: ({
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
  }),
  preview: function (t) {
    let a = t.currentTarget.dataset.src,
      e = t.currentTarget.dataset.img;
    console.log(e), wx.previewImage({
      current: a,
      urls: e
    });
  },
  //立即定制
  showPopup: function () {
    this.setData({
      show: !0,
      showdown: !0
    });
  },
  //点击查看更多评论
  discuss: function () {
    let t = this.data.id;
    wx.navigateTo({
      url: "/pages/discuss/discuss?id=" + t
    });
  },
  //关闭模态框
  onClose: function () {
    this.setData({
      show: !1
    });
  },
  //进入加载获取评论
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
  //进入加载获取商品信息
  async showBrand() {
    let _that = this
    let id = Number(_that.data.id)
    try {
      const res = await get({
        url: "/product/detail/" + id
      })
      if (res.data.status == 200) { //成功
        let particulars = []
        particulars.push(res.data.data.storeInfo)
        _that.setData({
          particulars,
          goodsDescImg: res.data.data.storeInfo.slider_image,
          banner: res.data.data.storeInfo.slider_image,
          pinpai: res.data.data.productAttr
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
  guanbi: function () {
    this.setData({
      show: false
    });
  },
  //商品选择，选中每一种规格然后拼接他们最后当商品大小选中的时候拼接的数据跟商品的suk做筛选，拿出对应的放到商品图片位置跟价格位置，最后跳转定制把对应的数据拿到定制页即可
  //选择正面
  async jixinOne(e) {
    let _that = this
    let id = Number(_that.data.id)
    let {
      items
    } = e.currentTarget.dataset
    console.log(items)
    let {
      innhtml
    } = e.currentTarget.dataset
    console.log(innhtml)
    _that.setData({
      bgcsOne: items,
      goBrandOne: items,
      innhtml: innhtml
    })
    try {
      const res = await get({
        url: "/product/detail/" + id
      })
      if (res.data.status == 200) { //成功
        let product = _that.data.bgcsOne + "," + _that.data.bgcsTwo + "," + _that.data.bgcsThree
        let productValue = res.data.data.productValue.filter(item => item.name == product)
        console.log(productValue)
        _that.setData({
          productValue,
          image: productValue[0].data.image,
          unique: productValue[0].data.unique
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
  //选择颜色 
  async jixinTwo(e) {
    let _that = this
    let id = Number(_that.data.id)
    let {
      items
    } = e.currentTarget.dataset
    console.log(items)
    let {
      innhtml
    } = e.currentTarget.dataset
    console.log(innhtml)
    _that.setData({
      bgcsTwo: items,
      goBrandTwo: items,
      innhtml: innhtml
    })
    try {
      const res = await get({
        url: "/product/detail/" + id
      })
      if (res.data.status == 200) { //成功
        let product = _that.data.bgcsOne + "," + _that.data.bgcsTwo + "," + _that.data.bgcsThree
        let productValue = res.data.data.productValue.filter(item => item.name == product)
        console.log(productValue)
        _that.setData({
          productValue,
          image: productValue[0].data.image,
          unique: productValue[0].data.unique
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
  //选择大小，最后触发商品类型改变
  async jixinThree(e) {
    let _that = this
    let id = Number(_that.data.id)
    let {
      items
    } = e.currentTarget.dataset
    console.log(items)
    let {
      innhtml
    } = e.currentTarget.dataset
    console.log(innhtml)
    _that.setData({
      bgcsThree: items,
      goBrandThree: items,
      innhtml: innhtml
    })
    try {
      const res = await get({
        url: "/product/detail/" + id
      })
      if (res.data.status == 200) { //成功
        console.log(res.data)
        let product = _that.data.bgcsOne + "," + _that.data.bgcsTwo + "," + _that.data.bgcsThree
        let productValue = res.data.data.productValue.filter(item => item.name == product)
        console.log(productValue)
        _that.setData({
          productValue,
          image: productValue[0].data.image,
          unique: productValue[0].data.unique
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
  //进入定制页面
  next: function () {
    let t = this.data.id,
      a = this.data.bgcsOne,
      e = (this.data.goBrandOne, this.data.bgcsTwo),
      n = this.data.bgcsThree,
      r = t + "," + this.data.unique + "," + this.data.image;
    "undefined" == a || null == a || "" == a || "undefined" == e || null == e || "" == e || "undefined" == n || null == n || "" == n ? wx.showToast({
      title: "请先选择商品",
      icon: "none"
    }) : wx.navigateTo({
      url: "/pages/shirtcustomization/shirtcustomization?brands= " + r
    });
  },
  onLoad: function (t) {
    let a = t.index,
      e = this;
    e.setData({
      id: a
    }), wx.getSystemInfo({
      success: function (t) {
        "iPhone X" != t.model && "iPhone XR" != t.model && "iPhone XS Max" != t.model && "iPhone 11" != t.model && "iPhone 11pro" != t.model && "iPhone 11pro Max" != t.model || e.setData({
          iPhone: !0
        });
      }
    });
  },
  onReady: function () {},
  onShow: function () {
    this.showBrand(), this.comment();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});