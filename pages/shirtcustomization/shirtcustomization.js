import {
  post,
  get
} from "../../request/request.js";
Page({
  data: ({
    showwl: false,
    showall: false,
    ismu: false,
    showw2: false,
    isinp: false,
    showhua: false,
    hindeshop: false,
    count: false,
    bg1: false,
    bg2: false,
    bg23: false,
    bgcm: false,
    goicon: false,
    Know: false,
    recommend: false,
    nextItemTwo: false,
    nextItemOne: true,
    bottomTb: true,
    bottomTbone: true,
    bottomTbtwo: true,
    bottomTbthree: true,
    bottomTbfure: true,
    cutout: false,
    ind: "0",
    activeName: "1",
    img: "",
    activ: "",
    zdm: false,
    cartTotalCounts: "0",
    image: "",
    goodsId: "",
    unique: "",
    bgdata: "",
    Text: "",
    Map: "",
    pin2: false,
    listMos: false,
    listTis: false,
    globalData: {},
    hide_good_box: true,
    ratio: 102 / 152,
    bgcolor: ["#FFFFFF", "#000000", "#3D365E", "#C28E90  ", "#FC7404", "#10A84C", "#1484AC", "#043474", "#FC4474", "#FC946C", "#4C6468", "#CCA4E4", "#C42434", "#E8CCD8", "#706484", "#BCCCC4"],
    ishidden: 0,
    ishiddens: 0,
    bgBoxHeight: 700,
    bgBoxWidth: 350,
    moveImgLeft: 120,
    moveImgTop: 180,
    moveImgH: 100,
    moveImgW: 100,
    shiftIconFixWidth: 50,
    shiftLeft: 127,
    shiftTop: 75,
    scaleIconFixWidth: 50,
    scaleLeft: 0,
    scaleTop: 0,
    delFixWidth: 50,
    delLeft: 95,
    delTop: 155,
    moveImgLeftone: 2,
    moveImgTopone: 0,
    moveImgHone: 696,
    moveImgWone: 344
  }),
  //显示背景图片
  async bnediimage(e) {
    let _that = this
    let {
      tburl
    } = e.currentTarget.dataset
    try {
      const res = await get({
        url: "/order/imgcate/2"
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        _that.setData({
          list: res.data.data.result
        })
        const resOne = await get({
          url: "/order/imglist/5/1/999"
        })
        if (resOne.data.status == 200) {
          //  let listMo=[]
          console.log(resOne.data.data.result.list)
          //    listMo.push(res.data.data.result.list)
          _that.setData({
            item: resOne.data.data.result.list,
            shows: true,
            showwl: true,
            listMos: true,
            showwl: true,
            ind: "100",
            coTbone: tburl,
            bottomTbone: false,
            bottomTb: true,
            bottomTbtwo: true,
            bottomTbthree: true,
            bottomTbfure: true,
            cutout: false
          })
        }
        console.log(resOne)

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
  //所有分类
  async showTo(e) {
    let _that = this
    let {
      id
    } = e.currentTarget.dataset
    let {
      myindex
    } = e.currentTarget.dataset
    console.log(myindex)
    console.log(id)
    try {
      const res = await get({
        url: "/order/imglist/" + id + "/1/999"
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        let arr = []
        arr.push(res.data.data.result.list)
        _that.setData({
          ishidden: myindex,
          listone: arr,
          shows: true,
          listMos: false
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
    // let t = (0, s.default)(o.default.mark(function t(e) {
    //     let a, s, i, r;
    //     return o.default.wrap(function(t) {
    //         for (;;) switch (t.prev = t.next) {
    //           case 0:
    //             return a = e.currentTarget.dataset.myindex, s = e.currentTarget.dataset.id, console.log(a), 
    //             t.prev = 3, t.next = 6, (0, n.get)({
    //                 url: "/order/imglist/" + s + "/1/999"
    //             });

    //           case 6:
    //             i = t.sent, (r = []).push(i.data.data.result.list), console.log(r), this.setData({
    //                 ishidden: a,
    //                 listone: r,
    //                 shows:true,
    //                 listMos:false
    //             }), t.next = 16;
    //             break;

    //           case 13:
    //             t.prev = 13, t.t0 = t.catch(3), "request:fail " == t.t0.errMsg && wx.showToast({
    //                 title: "无网络链接",
    //                 icon: "none",
    //                 duration: 1e3
    //             });

    //           case 16:
    //           case "end":
    //             return t.stop();
    //         }
    //     }, t, this, [ [ 3, 13 ] ]);
    // }));
    // return function(e) {
    //     return t.apply(this, arguments);
    // };
  },
  //切换
  qiehuan: function (e) {
    let {
      img
    } = e.currentTarget.dataset;
    this.setData({
      bg1: true,
      showwl: false,
      benimg: img,
      bgdata: img,
      imgINp2: "11",
      imgINp4: "13",
      imgINp1: "10",
      imgINp5: "10",
      touindex: "15"
    });
  },
  //选择贴图
  async istutie(e) {
    let _that = this
    let {
      tburl
    } = e.currentTarget.dataset
    console.log(tburl)
    try {
      const res = await get({
        url: "/order/imgcate/7"
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        console.log(res.data)
        _that.setData({
          tie: res.data.data.result
        })
        const resTwo = await get({
          url: "/order/imglist/5/1/999"
        })
        console.log(resTwo)
        if (resTwo.data.status == 200) {
          _that.setData({
            listTi: resTwo.data.data.result.list,
            shows: true,
            showw2: true,
            listTis: true,
            showdonghua: true,
            ismu: true,
            ind: "10",
            inds: "100",
            coTbthree: tburl,
            bottomTbthree: false,
            bottomTb: true,
            bottomTbone: true,
            bottomTbtwo: true,
            bottomTbfure: true,
            cutout: false
          })
        }
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
    // let t = (0, s.default)(o.default.mark(function t(e) {
    //     let a, s, i, r, u;
    //     return o.default.wrap(function(t) {
    //         for (;;) switch (t.prev = t.next) {
    //           case 0:
    //             return a = this, s = e.currentTarget.dataset.tburl, t.prev = 2, t.next = 5, (0, 
    //             n.get)({
    //                 url: "/order/imgcate/7"
    //             });

    //           case 5:
    //             return i = t.sent, console.log(i.data.data.result), a.setData({
    //                 tie: i.data.data.result
    //             }), t.prev = 8, t.next = 11, (0, n.get)({
    //                 url: "/order/imglist/5/1/999"
    //             });

    //           case 11:
    //             r = t.sent, (u = []).push(r.data.data.result.list), console.log(u), a.setData({
    //                 listTi: u,
    //                 shows: true,
    //                 listTis: true
    //             }), a.setData({
    //                 showw2: true,
    //                 showdonghua: true,
    //                 ismu: true,
    //                 ind: "10",
    //                 inds: "100",
    //                 coTbthree: s,
    //                 bottomTbthree:false,
    //                 bottomTb: true,
    //                 bottomTbone: true,
    //                 bottomTbtwo: true,
    //                 bottomTbfure: true,
    //                 cutout:false
    //             }), t.next = 22;
    //             break;

    //           case 19:
    //             t.prev = 19, t.t0 = t.catch(8), "request:fail " == t.t0.errMsg && wx.showToast({
    //                 title: "无网络链接",
    //                 icon: "none",
    //                 duration: 1e3
    //             });

    //           case 22:
    //             t.next = 27;
    //             break;

    //           case 24:
    //             t.prev = 24, t.t1 = t.catch(2), "request:fail " == t.t1.errMsg && wx.showToast({
    //                 title: "无网络链接",
    //                 icon: "none",
    //                 duration: 1e3
    //             });

    //           case 27:
    //           case "end":
    //             return t.stop();
    //         }
    //     }, t, this, [ [ 2, 24 ], [ 8, 19 ] ]);
    // }));
    // return function(e) {
    //     return t.apply(this, arguments);
    // };
  },
  //显示贴图分类
  async showTos(e) {
    let _that = this
    let {
      id
    } = e.currentTarget.dataset
    let {
      myindex
    } = e.currentTarget.dataset
    try {
      const res = await get({
        url: "/order/imglist/" + id + "/1/999"
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        let arr = res.data.data.result.list
        console.log(res.data)
        _that.setData({
          ishidden: myindex,
          tieone: arr,
          shows: true,
          listTis: false
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
  //切换贴图
  qiehuantie: function (e) {
    let _that = this
    console.log(e);
    let {
      img
    } = e.currentTarget.dataset;
    _that.setData({
      originUrl: img,
      bg3: true,
      imgINp4: "13",
      Map: img,
      imgINp3: "24",
      touindex: "15",
      ismu: false
    });
  },
  delTouchmove: function () {
    this.setData({
      bg3: false
    });
  },
  onPageScroll: function (t) {
    this.data.scrolltop = t.scrollTop;
  },
  //点击关闭对应模态框
  onChanges: function () {
    this.setData({
      showwl: false
    });
  },
  //点击关闭对应模态框
  onChangess: function () {
    this.setData({
      showw2: false
    });
  },
  //点击关闭对应模态框
  onChange2: function () {
    this.setData({
      showall: false
    });
  },
  //设计师款
  Diy: function (e) {
    let {
      img
    } = t.currentTarget.dataset;
    this.setData({
      bg2: true,
      showwl: false,
      benimg: img,
      cutout: false,
      bgdata: img,
      imgINp2: "11",
      imgINp4: "13",
      imgINp1: "10",
      imgINp5: "10",
      touindex: "15"
    });
  },
  //输入框页面
  watchPassWord: function (t) {},
  subs: function (e) {
    let _that = this
    let val = e.detail.value
    if (val.length != null) {
      _that.setData({
        pin2: true,
        Text: val,
        isinp: false,
        valzhi: val
      })
    } else {
      _that.setData({
        isinp: false
      })
    }
  },
  //点击关闭对应模态框
  onChange3: function () {
    this.setData({
      showw2: false,
      ismu: false
    });
  },
  //点击关闭对应模态框
  onChange: function (t) {
    this.setData({
      activeName: t.detail,
      showall: true
    });
  },
  //点击关闭对应模态框
  onChanges2: function () {
    this.setData({
      showw2: false
    });
  },
  //上传本地相册图片
  chooseWxImage: function (t) {
    let e = this;
    wx.chooseImage({
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (t) {
        e.setData({
          benimg: t.tempFilePaths[0],
          bgdata: t.tempFilePaths[0],
          imgINp4: "13",
          imgINp2: "10",
          imgINp1: "12",
          imgINp3: "24",
          imgINp5: "10",
          bg1: true,
          touindex: "15"
        });
      }
    });
  },
  //上传本地相册图片选择对应方式
  chooseWxImage: function (type) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        // console.log(res);
        that.setData({
          // tempFilePath可以作为img标签的src属性显示图片
          benimg: res.tempFilePaths[0],
          bgdata: res.tempFilePaths[0],
          imgINp4: "13",
          imgINp2: "10",
          imgINp1: "12",
          imgINp3: "14",
          imgINp5: '10',
          bg1: true,
          touindex: '15'
        })
        // console.log(that.data.bgdata)
      }
    })
  },

  chooseimage: function (e) {
    let that = this;
    let {
      tburl
    } = e.currentTarget.dataset
    // console.log(tburl)
    that.setData({
      coTb: tburl,
      bottomTb: false,
      bottomTbone: true,
      bottomTbtwo: true,
      bottomTbthree: true,
      bottomTbfure: true,
    })
    wx.showActionSheet({
      itemList: ['从本地相册获取', '拍照'],
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          } else if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          }
        }
      }
    })

  },
  //显示隐藏图片
  isinpchange: function (e) {
    let {
      tburl
    } = e.currentTarget.dataset;
    this.setData({
      isinp: true,
      imgINp3: "24",
      touindex: "15",
      coTbtwo: tburl,
      bottomTbtwo: false,
      bottomTb: true,
      bottomTbone: true,
      bottomTbthree: true,
      bottomTbfure: true,
      cutout: false
    });
  },
  //显示隐藏图片
  showPopup: function (e) {
    let {
      tburl
    } = e.currentTarget.dataset;
    this.setData({
      showhua: true,
      bgcm: true,
      coTbfure: tburl,
      bottomTbfure: false,
      bottomTb: true,
      bottomTbone: true,
      bottomTbtwo: true,
      bottomTbthree: true,
      cutout: false
    });
  },
  //切换背景
  huoqubg: function (t) {
    let e = t.currentTarget.dataset.bg;
    this.setData({
      bgcolos: e,
      bgdata: e,
      imgINp4: "13",
      imgINp2: "10",
      imgINp1: "10",
      imgINp3: "24",
      imgINp5: "12",
      touindex: "15",
      activ: e
    });
  },
  userCutout: function () {
    this.setData({
      cutout: true
    });
  },
  async jia(e) {

    let _that = this

    let touches = e.touches[0];
    let style = 'left:230rpx;top:270rpx;transition: all 0.4s;'; //移动距离
    let styleh = 'left:240rpx;top:28rpx;'; //移动距离
    _that.setData({
      isFly: true,
      goicon: true,
      hindeshop: false,
      translateStyle: style
    });
    try {
      const res = await post({
        url: "/cart/add",
        data: {
          productId: _that.data.goodsId,
          new: "0",
          uniqueId: _that.data.unique,
          cartNum: 1,
          img: _that.data.image
        }
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        console.log(res.data)
        setTimeout(() => {
          _that.setData({
            isFly: false,
            translateStyle: styleh, //恢复到最初状态
            isShake: true,
          });
          setTimeout(() => {
            // 不作过多考虑自增1
            let cartTotalCounts = _that.data.cartTotalCounts;
            cartTotalCounts++
            //  console.log(cartTotalCounts)
            if (cartTotalCounts != 0) {
              _that.setData({
                isShake: false,
                count: true,
                cartTotalCounts: cartTotalCounts
              });
            }
          }, 100);
        }, 200);
        wx.showToast({
          title: "加入购物车成功",
          icon: "success",
          duration: 2000
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
  //显示购物车
  According() {
    let _that = this
    _that.setData({
      hindeshop: true,
      goicon: false
    });
  },
  //显示购物车
  Accordings() {
    let _that = this
    _that.setData({
      hindeshop: false,
      goicon: false
    });
  },
  //查看购物车
  chakan() {
    this.setData({
      hindeshop: false
    }), wx.switchTab({
      url: "../shop/index"
    });
  },

  //立即购买
  async purchase(e) {
    let _that = this
    try {
      const res = await post({
        url: "/cart/add",
        data: {
          productId: _that.data.goodsId,
          new: "1",
          uniqueId: _that.data.unique,
          cartNum: 1,
          img: _that.data.image
        }
      })
      console.log(res)
      if (res.data.status == 200) { //成功
        wx.redirectTo({
          url: "/pages/orderSub/index?id=" + res.data.data.cartId
        })
        _that.setData({
          hindeshop: false
        })
      } else {
        wx.showToast({ //失败
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        })
        _that.setData({
          hindeshop: false

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

  // 提示
  nextKnow() {
    this.setData({
      polygon: false,
      Know: true,
      recommend: true,
      nextItemTwo: true,
      nextItemOne: false
    })
  },
  //设置之后不会再出现
  nextKnows() {
    this.setData({
      recommend: false,
      nextItemTwo: false
    }), wx.setStorageSync("useOne", "2");
  },
  onClose() {
    this.setData({
      showhua: false
    });
  },
  onCloseDiy() {
    this.setData({
      cutout: false
    });
  },
  onLoad: function (t) {
    let e = t.brands.split(",");
    this.setData({
      show: true,
      goodsId: e[0],
      unique: e[1],
      image: e[2]
    })
  },
  onShow() {
    let useOne = wx.getStorageSync("useOne")
    if (useOne != 1) {
      this.setData({
        zdm: false
      })
    } else {
      this.setData({
        zdm: true,
        polygon: true,
      });
    }
    let t = this.data.scaleIconFixWidth / 2;
    this.data.delFixWidth;
    this.setData({
      scaleLeft: this.data.moveImgLeft + this.data.moveImgW - t,
      scaleTop: this.data.moveImgTop + this.data.moveImgH - t,
      shiftLeft: this.data.shiftLeft + this.data.moveImgW - t,
      shiftTop: this.data.shiftTop + this.data.moveImgH - t
    });
  },
  moveImgTouchmove(t) {
    let e = t.changedTouches[0].pageX,
      a = t.changedTouches[0].pageY,
      o = e - this.data.moveImgW / 2,
      s = a - this.data.moveImgH / 2,
      i = this.data.scaleIconFixWidth / 2;
    this.data.delFixWidth;
    this.setData({
      moveImgLeft: o,
      moveImgTop: s,
      scaleLeft: o + this.data.moveImgW - i,
      scaleTop: s + this.data.moveImgH - i,
      shiftLeft: o + this.data.moveImgW - i,
      shiftTop: s - 20,
      delLeft: o - 24,
      delTop: s - 24
    });
  },
  scaleTouchmove(t) {
    let e = t.changedTouches[0].pageX,
      a = t.changedTouches[0].pageY,
      o = (this.data.scaleIconFixWidth,
        e),
      s = a;
    this.data.moveImgLeft, this.data.moveImgTop;
    this.setData({
      scaleLeft: o,
      scaleTop: s,
      shiftLeft: o,
      shiftTop: s - this.data.moveImgH,
      moveImgW: e - this.data.moveImgLeft,
      moveImgH: a - this.data.moveImgTop
    });
  },
  stretchTouchmove(t) {
    let e = t.changedTouches[0].pageX,
      a = t.changedTouches[0].pageY,
      o = (this.data.scaleIconFixWidth,
        e),
      s = a,
      i = e - this.data.moveImgLeft,
      n = a - this.data.moveImgTop;
    console.log(i), console.log(n), this.setData({
      stretchLeft: o + 190,
      stretchTop: s + 295,
      moveImgWone: e,
      moveImgHone: a
    });
  },
  stretchTouchmove(t) {
    let e = t.changedTouches[0].pageX,
      a = t.changedTouches[0].pageY,
      o = (this.data.scaleIconFixWidth,
        e),
      s = a,
      i = e - this.data.moveImgLeft,
      n = a - this.data.moveImgTop;
    console.log(i), console.log(n), this.setData({
      stretchLeft: o + 190,
      stretchTop: s + 295,
      moveImgWone: e,
      moveImgHone: a
    });
  },
  inpTouchmove(t) {
    let e = t.changedTouches[0].pageX,
      a = t.changedTouches[0].pageY,
      o = e - this.data.inpFixWidth / 2,
      s = a,
      i = e - this.data.moveImgLeft,
      n = a - this.data.moveImgTop;
    console.log(i), console.log(n), this.setData({
      inpsLeft: o + 190,
      inpsTop: s + 295,
      inpImgH: i,
      inpImgW: n
    });
  },


});