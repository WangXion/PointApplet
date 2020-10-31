  //定义公共url
const baseUrl = "https://api.midiandz.com/api"
let ajaxTImes = 0

export const get=(params)=>{
  let token = wx.getStorageSync('Authori-zation')
  ajaxTImes++
  wx.showLoading({
    title: '拼命加载中',
    mask:true
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authori-zation':token
      },
      method:"GET",
      success:(res)=>{
        // console.log(res.data)
        if(res.data.status == 200){
          resolve(res)
        }else if(res.data.status == 410000 ){
          wx.login({
            success(res) {
              // console.log(res)
              let code = res.code
              wx.getUserInfo({
                success(res) {
                  wx.request({
                    url: 'https://api.midiandz.com/api/wechat/mp_auth',
                    method: 'POST',
                    data: {
                      "code": code,
                      "login_type":"routine" ,
                      "encryptedData": res.encryptedData,
                      "iv": res.iv
                    },
                    header: {
                      "Content-Type": "application/json;charset=UTF-8",
                    },
                    success(res) {
                  // console.log( res.data)
               if (res.data.status==200) {
                    wx.setStorage({
                      key: "Authori-zation",
                      data: res.data.data.token,
                    })
               }
                    }
                  })
                }
              })
            }
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:"none",
            duration:1500
          })
        }
      },
      fail:(err)=>{ 
        reject(err);
      },
      complete:()=>{
        ajaxTImes--
        if(ajaxTImes==0){
          wx.hideLoading()
        }
      }
    });
  })
}
export const post=(params)=>{
  let token=wx.getStorageSync('Authori-zation')
  ajaxTImes++
  wx.showLoading({
    title: '拼命加载中',
    mask:true
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authori-zation':token

      },
      // header: {
                   //token要不要放请求头 请求头的类型
      // },
      method:"POST",
      success:(res)=>{
        if(res.data.status == 200){
          resolve(res)
        }else if(res.data.status == 410000 ){
          wx.login({
            success(res) {
              // console.log(res)
              let code = res.code
              wx.getUserInfo({
                success(res) {
                  wx.request({
                    url: 'https://api.midiandz.com/api/wechat/mp_auth',
                    method: 'POST',
                    data: {
                      "code": code,
                      "login_type":"routine" ,
                      "encryptedData": res.encryptedData,
                      "iv": res.iv
                    },
                    header: {
                      "Content-Type": "application/json;charset=UTF-8",
                    },
                    success(res) {
                      if (res.data.status==200) {
                            wx.setStorage({
                              key: "Authori-zation",
                              data: res.data.data.token,
                            })
                      }
                    }
                  })
                }
              })
            }
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:"none",
            duration:1500
          })
        }
      },
      fail:(err)=>{ 
        reject(err);
      },
      complete:()=>{
        ajaxTImes--
        if(ajaxTImes==0){
          wx.hideLoading()
        }
      }
    });
  })
}