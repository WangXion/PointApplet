import {
    post,
    get
} from "../../request/request.js";
Page({
    data: {
        pinj: [],
        id:""
    },
    //查看评论点击放大图
    preview(event) {
        // console.log(event.currentTarget.dataset.src)
        let currentUrl = event.currentTarget.dataset.src
        let {
          img
        } = event.currentTarget.dataset
        console.log(img)
        wx.previewImage({
          current: currentUrl, // 当前显示图片的http链接
          urls: img // 需要预览的图片http链接列表
        })
      },
    //获取所有评论数据
  //评论
  async comment() {
    let _that = this
    let id = Number(_that.data.id)
    try {
      const res = await get({
        url: "/reply/list/" + id + "?page=" + 1 + "&limit=" + 999999 + "&type=" + 0
      })
      console.log(res.data.data)
      let evaluate = []
      evaluate.push(res.data.data[0], res.data.data[1], res.data.data[2])
      if (res.data.status == 200) {
        _that.setData({
          evaluate, //显示条数
          pin: res.data.data //判断是否显示更多
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
    onLoad: function (e) {
        let t = e.id;
        this.setData({
            id: t
        });
    },
    onReady: function () {},
    onShow: function () {
        this.comment();
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {}
});