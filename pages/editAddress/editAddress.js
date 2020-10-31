
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
    show:false,
    result: ['0','1'],
    information:[],
    addressId:'',
    location:[],//全称
    provinceId:'',//省ID
    cityId:'',//市ID
    countyId:'',//区ID
    isDefault:'',//是否为默认地址0/1
    pccName:'',//省市区名称
    address:'',//地址
    phoneNo:'',//手机号码
    consigneeName:'',//收货人
    id:'',
    togtwo:1
  },
  onChange(event) {
    this.data.information.push(event.detail)
    this.setData({
      result: event.detail,
    });
  },
//选中
toogle(e){

  let {tog}=e.currentTarget.dataset
  const { togtwo } = e.currentTarget.dataset;
  if (togtwo==1) {
    this.setData({
      isDefault:0,
      togtwo:0
    })
  }else{
    this.setData({
      isDefault:1,
      togtwo:1
    })
  }
 
},


  // 选择大地址
  confirm(e){
 
    //拿到地址的每一项遍历数组
    let provinceId=e.detail.values[0].code //省id
    let provinceName=e.detail.values[1].name //省
    let cityId=e.detail.values[1].code  //市id
    let cityName=e.detail.values[1].name  //市
    let countyId=e.detail.values[2].code  //区id
    let countyName=e.detail.values[2].name  //区
    let pccName=[]
    pccName.push(provinceName,cityName,countyName)
      let Elems= pccName.join(" ");//去除数组的逗号
      this.setData({
        value1:Elems,
        show:false,
        location:Elems,
        provinceId:provinceId,
        provinceName:provinceName,
        cityId:cityId,
        cityName:cityName,
        countyId:countyId,
        countyName:countyName,
      }) 


    // }

  },

  onChange1(event) {

    this.setData({
      result: event.detail,
      detail:event.detail.value
    });
  },
  onChange2(event) {
    this.setData({
      result: event.detail,
      consigneeName: event.detail.value,
    });
  },
  onChange3(event) {
    this.setData({
      result: event.detail,
      phoneNo: event.detail.value,
    });
  },
  selectdz(){
    this.setData({
      show:true
    })
  },

  //修改地址
  async Submit() {
    let _that=this
    let prov=_that.data.value1.split(" ")
    let address={
      "province":prov[0],
      "city":prov[1],
      "district":prov[2],
    }
    try {
      const res = await post({
        url: '/address/edit',
        data: {
          "id":_that.data.id,//地址id
          "phone":_that.data. phoneNo,//手机号
          "real_name":_that.data.consigneeName,//姓名
          "address":address,
          "is_default":_that.data.isDefault,//默认地址是1  否0 
          "detail": _that.data.detail,//详细地址
        },

      })  
         if (res.data.status==200) {
              wx.showToast({
                title: '修改成功！',  // 标题
                icon: 'success',   // 图标类型，默认success
                duration: 1500   // 提示窗停留时间，默认1000ms
            })
            wx.redirectTo({
              //目的页面地址
              url: '/pages/AddressGl/index',
              // success: function(res){},
              // ...
          })
             }else{
              wx.showToast({
                title: '抱歉你未填写内容！',
                icon: 'none',
                duration: 1000
            })
             }
 
     } catch (error) {
       if(error.errMsg=="request:fail "){
        wx.showToast({
          title: "无网络链接",
          icon:'none',
          duration:1000
        }) 
       }  
     }
   },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that=this
    let info=JSON.parse(options.item)
    let dizhi=info.province+' '+info.city+' '+info.district
    _that.setData({
          isDefault:info.is_default,//是否为默认地址0/1
          detail:info.detail,//详细地址
          phoneNo:info.phone,//手机号码
          id:info.id,//id
          consigneeName:info.real_name,//收货人
          value1:dizhi//省市区
    })
  },
  onClose(){
    this.setData({
      show:false
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