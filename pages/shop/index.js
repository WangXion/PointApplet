import {
  post,
  get
} from "../../request/request.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    allchecked: false,
    totalPrice: 0,
    totalNum: 0,
    sum: 0
  },
  navto() {
    wx.navigateTo({
      url: '/pages/orderSub/index',
    })
  },
  //显示购物车
  async shop() {
    let _that = this
    try {
      const res = await get({
        url: '/cart/list',
      })
      if (res.data.status == 200) {
        _that.setData({
          cart: res.data.data.valid,
          sum: res.data.data.valid.length
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
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
  // 商品选中
  handleItemChange(e) {
    let _that = this
    //获取被修改的id
    const {
      id
    } = e.currentTarget.dataset
    const {
      istrue
    } = e.currentTarget.dataset
    const {
      index
    } = e.currentTarget.dataset
    //选中状态取反
    _that.data.cart[index].istrue = !_that.data.cart[index].istrue;
    _that.setData({
      cart: _that.data.cart,
    })
    this.setCart(_that.data.cart)
  },
  //设置购物车状态 重新计算 底部工具栏 价格 数量
  setCart(cart) {
    //总价 数量
    let _that = this
    let totalPrice = 0;
    let totalNum = 0;
    let allchecked = true;
    _that.data.cart.forEach(v => {
      if (v.istrue) {
        totalPrice = Math.floor(((v.cart_num * v.productInfo.price) + totalPrice) * 100) / 100
        totalNum += v.cart_num;
      } else {
        allchecked = false;
      }
    });

    //判断数组是否为空
    // allchecked = cart.length != 0 ? allchecked : false;
    //把数据重新设置会data中和缓存中
    this.setData({
      cart,
      allchecked,
      totalPrice,
      totalNum
    });
    // wx.setStorageSync('cart', cart)
  },
  //商品全选功能
  handleItemAllcheck() {
    let _that = this
    //获取data中的数据
    let {
      cart,
      allchecked
    } = _that.data;
    //修改值
    allchecked = !allchecked;
    //循坏修改cart数组中的状态
    cart.forEach(v => v.istrue = allchecked);
    _that.setData({
      cart
    })
    this.setCart(_that.data.cart)
  },

  //商品数量加减
  async handleEdit(e) {
    let _that = this
    const {
      index,
      operation
    } = e.currentTarget.dataset
    const {
      cart
    } = _that.data
    const {
      cart_num
    } = cart[index]
    if (cart_num <= 1 && operation == -1) {
      wx.showToast({
        title: '再删就到底了哟',
        icon: "none"
      })
      this.setCart(_that.data.cart)
    } else {
      cart[index].cart_num = cart[index].cart_num + operation
      _that.setData({
        cart
      })
      try {
        const {
          id,
          cart_num
        } = cart[index]
        const res = await post({
          url: '/cart/num',
          data: {
            id,
            number: cart_num,
          },
        })
        this.setCart(_that.data.cart)
      } catch (error) {
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

  //删除
  async dele(e) {
    let {
      id,
      index
    } = e.currentTarget.dataset
    // const {istrue} = this.data.cart[index]l
    let _that = this
    // if(istrue){
    try {
      const res = await post({
        url: '/cart/del',
        data: {
          "ids": [id]
        }
      })

      if (res.data.status == 200) {
        wx.showToast({
          title: '删除成功', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 1500 // 提示窗停留时间，默认1500ms
        })
        _that.shop()
        _that.setData({
          totalPrice: 0,
          totalNum: 0,
        })
      } else {
        wx.showToast({
          title: '抱歉失败了',
          icon: 'none',
          duration: 1500
        })
      }
      //获取缓存中购物车数据
      // const cart=wx.getStorageSync('cart')||[];
      // this.setCart(cart);

    } catch (error) {
      if (error.errMsg == "request:fail ") {
        wx.showToast({
          title: "无网络链接",
          icon: 'none',
          duration: 1000
        })
      }
    }
    // }else{
    //   wx.showToast({
    //     title: '请先选中',
    //     icon:"none"
    //   })
    // }

  },
  //删除的时候提醒
  //查看详情
  goDetails: function (e) {
    let {
      id
    } = e.currentTarget.dataset;
    let {
      name
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/${name}/${name}?index=` + id
    });
  },
  //结算
  async navtos(e) {
    let {
      totalnum
    } = e.currentTarget.dataset
    let {
      totalprice
    } = e.currentTarget.dataset
    let close = this.data.cart.filter(item => item.istrue == true)
    let id = []
    for (let i = 0; i < close.length; i++) {
      const element = close[i].id;
      id.push(element)
    }

    if (totalnum != 0 && this.data.totalPrice != 0) {
      wx.navigateTo({
        // url: '/pages/orderSub/index?totalNums=' + JSON.stringify(close) + '&totalnum=' + totalnum + '&totalprice=' + totalprice,
        url: '/pages/orderSub/index?id=' + id.toString() + '&totalnum=' + totalnum + '&totalprice=' + totalprice,
      })
    } else {
      wx.showToast({
        title: '请先勾选商品',
        icon: "none"
      })
    }
  },
  //热门推荐
  async hot() {
    let _that = this
    try {
      const res = await get({
        url: "/product/hot?page=1&limit=999"
      })
      if (res.data.status == 200) { //成功
        let call = res.data.data.filter(item => item.cate_id == 4)
        let vacuum = res.data.data.filter(item => item.cate_id == 5)
        let tShirt = res.data.data.filter(item => item.cate_id == 6)
        _that.setData({
          call,
          vacuum,
          tShirt,
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

  /**
   * 
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
    this.shop()
    this.hot()
    this.setData({
      totalPrice: 0,
      checked: false
    })

  },


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
  // onPullDownRefresh: function () {
  // },

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