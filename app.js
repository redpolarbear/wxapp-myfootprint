//app.js
var wilddog = require('utils/wilddog-weapp-all')
var config = {
    syncURL: 'https://wxapp-bookstack.wilddogio.com',
    authDomain: 'wxapp-bookstack.wilddog.com'
}
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wilddog.initializeApp(config)
    this.todoRef = wilddog.sync().ref('todo')
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              that.globalData.userUid = wx.getStorageSync('wilddog123:UUID')
              typeof cb == "function" && cb(that.globalData.userInfo, that.globalData.userUid)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo: null,
    userUid: null
  }
})