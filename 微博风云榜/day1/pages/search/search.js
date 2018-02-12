//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '搜索',
    userInfo: {},
    userName:'',
    key:"",
    listdata: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),


  },
  // 获取input框的值
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  simulation: function (e) {
    // console.log(this.data.userName)
       var m3 = this.changg()
  },
  changg: function (options) {
    var _this = this;
    var typeId = "1"||"2"||"3"||"4"||"6"||"7"||"9"||"10"||"11"||"12"||"13"||"15";
    // console.log(typeId)
    // console.log(space)
    wx.request({
      url: 'https://route.showapi.com/254-1?showapi_appid=52900&showapi_sign=718793c63de74b99bbbafe193fa6630e&typeId=' + typeId + '&space=day' + '&key=' + _this.data.userName ,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data.showapi_res_body.contentlist[0])
        // console.log(res)
        _this.setData({
          listdata: _this.listdata = res.data.showapi_res_body.pagebean.contentlist

        })
      }
    })
  },
})