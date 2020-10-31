// pages/changeaddress/index.js
// const util = require('../../utils/area.js')
import {
  post,
  get
} from "../../request/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: require('./area.js').default,
    show: false,
    result: ['0', '1'],
    information: [],
    location: [], //全称
    provinceId: '', //省ID
    cityId: '', //市ID
    countyId: '', //区ID
    isDefault: '0', //是否为默认地址0/1
    pccName: '', //省市区名称
    address: '', //地址
    phoneNo: '', //手机号码
    consigneeName: '', //收货人
    index: 0
  },
  onChange(event) {
    // console.log(event)
    this.data.information.push(event.detail)
    this.setData({
      result: event.detail,
    });
  },
  //选中
  toogle(e) {

    let {
      index
    } = e.currentTarget.dataset
    console.log(index)
    console.log(this.data.isDefault)
    if (index == 1) {
      this.setData({
        isDefault: 0,
        index: 0
      })
      console.log(this.data.isDefault)
      console.log(index)
    } else {
      this.setData({
        isDefault: 1,
        index: 1
      })
      console.log(index)
      console.log(this.data.isDefault)
    }
  },


  // 选择大地址
  confirm(e) {

    //拿到地址的每一项遍历数组
    // console.log(e.detail.values[0])
    let provinceName = e.detail.values[0].name //省
    let cityName = e.detail.values[1].name //市
    let countyName = e.detail.values[2].name //区
    let pccName = []
    pccName.push(provinceName, cityName, countyName)
    let Elems = pccName.join(" "); //去除数组的逗号
    this.setData({
      value1: Elems,
      show: false,
      location: Elems,
      cityName: cityName,
      provinceName: provinceName,
      countyName: countyName,
    })


    // }

  },
  onChange1(event) {
    // console.log(event)

    this.setData({
      detail: event.detail.value
    });
  },
  onChange2(event) {
    // console.log(event)
    this.setData({
      consigneeName: event.detail.value,
    });
  },
  onChange3(event) {
    // console.log(event)
    this.setData({
      phoneNo: event.detail.value,
    });
  },
  //提交信息
  async Submit() {
    let _that = this
    console.log('详细地址', _that.data.address)
    console.log('手机号', _that.data.phoneNo)
    console.log('姓名', _that.data.consigneeName)
    console.log('省名', _that.data.provinceName)
    console.log('市名', _that.data.cityName)
    // address[city_id]
    console.log('区名', _that.data.countyName)
    console.log('是否默认', _that.data.isDefault)
    let address = {
      "province": _that.data.provinceName,
      "city": _that.data.cityName,
      "district": _that.data.countyName,
    }
    console.log(address)
    try {
      const res = await post({
        url: '/address/edit',
        data: {
          "phone": _that.data.phoneNo, //手机号
          "real_name": _that.data.consigneeName, //姓名
          "address": address,
          "is_default": _that.data.isDefault, //默认地址是1  否0 
          "detail": _that.data.detail, //详细地址
        },
      })
      console.log(res)
      if (res.data.status == 200) {
        wx.showToast({
          title: '添加成功！', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 1500 // 提示窗停留时间，默认1500ms
        })
        wx.redirectTo({
          //目的页面地址
          url: '/pages/AddressGl/index',
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
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
  selectdz() {
    this.setData({
      show: true
    })
  },
  //微信地址
  async WeChatAvatar() {
    wx.chooseAddress({
      success(res) {
        console.log(res)
        console.log(res.userName) //收货人姓名
        console.log(res.postalCode) //邮编
        console.log(res.provinceName) //国标收货地址第一级地址
        console.log(res.cityName) //国标收货地址第二级地址
        console.log(res.countyName) //国标收货地址第三级地址
        console.log(res.detailInfo) //详细收货地址信息
        console.log(res.nationalCode) //收货地址国家码
        console.log(res.telNumber) //收货人手机号码
        let address = {
          "province": res.provinceName,
          "city": res.cityName,
          "district": res.countyName,
        }
        console.log(address)
        let token = wx.getStorageSync('Authori-zation')
        wx.request({
          url: 'https://api.midiandz.com/api/address/edit', //仅为示例，并非真实的接口地址
          data: {
            "phone": res.telNumber, //手机号
            "real_name": res.userName, //姓名
            "address": address,
            "is_default": 0, //默认地址是1  否0 
            "detail": res.detailInfo, //详细地址
            "type": 1, //微信地址
          },
          method: "POST",
          header: {
            'content-type': 'application/json', // 默认值
            "Authori-zation": token
          },
          success(res) {
            if (res.data.status == 200) {
              wx.showToast({
                title: '添加成功！', // 标题
                icon: 'success', // 图标类型，默认success
                duration: 1500 // 提示窗停留时间，默认1500ms
              })
              wx.redirectTo({
                //目的页面地址
                url: '/pages/AddressGl/index',
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1500
              })
            }
          }
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onClose() {
    this.setData({
      show: false
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
    //
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