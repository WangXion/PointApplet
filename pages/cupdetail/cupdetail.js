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
  //查看评论图片
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
      console.log(res)
      if (res.data.status == 200) { //成功
        let particulars = []
        particulars.push(res.data.data.storeInfo)
        _that.setData({
          particulars,
          goodsDescImg: res.data.data.storeInfo.slider_image,
          banner: res.data.data.storeInfo.slider_image,
          productAttr: res.data.data.productAttr
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
  guanbi: function () {
    this.setData({
      show: false
    });
  },
  //选择商品容量
  async jixins(e) {
    let _that = this
    let id = Number(_that.data.id)
    let {
      innhtml
    } = e.currentTarget.dataset
    console.log(innhtml)
    try {
      const res = await get({
        url: "/product/detail/" + id
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        let name = e.currentTarget.dataset.innhtml
        let arr = res.data.data.productValue.filter(item => item.name == name)
        console.log(arr)
        _that.setData({
          bgcs: innhtml,
          productValue: arr,
          image: arr[0].data.image,
          unique: arr[0].data.unique,
          brand: arr[0].data.suk,
          brand: arr[0].data.suk,
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
  //进入定制页面
  next: function () {
    let _that = this
    let id = _that.data.id
    let goBrandtwo = _that.data.bgcs
    console.log(goBrandtwo)
    let Brand = id + "," + _that.data.unique + "," + _that.data.image;
    if (goBrandtwo == "undefined" || goBrandtwo == '' || goBrandtwo == null) {
      wx.showToast({
        title: "请先选择商品",
        icon: "none"
      })

    } else {
      wx.navigateTo({
        url: "/pages/cupcustomization/cupcustomization?brands= " + Brand
      })
    }
  },
  onLoad: function (options) {
    let id = options.index;

    // console.log(options.index)
    let _that = this;
    _that.setData({
      id: id,
    })
    wx.getSystemInfo({
      success: function (res) {
        if (res.model == 'iPhone X' || res.model == 'iPhone XR' || res.model == 'iPhone XS Max' || res.model == 'iPhone 11' || res.model == 'iPhone 11pro' || res.model == 'iPhone 11pro Max') {
          _that.setData({
            iPhone: true
          })
        }
      }
    })
  },
  onReady: function () {},
  onShow: function () {
    this.showBrand(),
      this.comment();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});