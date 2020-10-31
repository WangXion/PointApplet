import {
  post,
  get
} from "../../request/request.js";
Page({
    data: {},
    //进入加载页面
   async commission() {
        let _that = this
        try {
          const res = await get({
            url: "/spread/commission/4?page=0&limit=8"
          })
          if (res.data.status == 200) {  //成功
            _that.setData({
                      records: res.data.data,
                      recordleng: res.data.data[0].list.length,
            })
          }else{
            wx.showToast({            //失败
              title: res.data.msg,
              icon:'none',
              duration:3000
            })
          }
    
        } catch (error) {   //这步操作防止用户断网的时候做提醒
          if (error.errMsg == "request:fail ") {
            wx.showToast({
              title: "无网络链接",
              icon: 'none',
              duration: 1000
            })
          }
        }
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {
        this.commission();
    }
});