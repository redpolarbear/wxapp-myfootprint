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
    this.BooksRef = wilddog.sync().ref('Books')
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: function (res) {
          var js_code = res.code
          var appid = 'wxf2868d0e8c61d87f'
          var secret = '563a4e932c72054155b44fc11e54e202'
          var grant_type = 'authorization_codegran'
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: { appid, secret, js_code, grant_type },
            method: 'GET', 
            success: function (res) {
              // success
              var openid = res.data.openid // get the unique openid for each login user
              wx.getUserInfo({
                success: function (res) {
                  that.globalData.userInfo = res.userInfo
                  that.globalData.userUid = openid
                  typeof cb == "function" && cb(that.globalData.userInfo, that.globalData.userUid)
                },
                fail: function (res) {
                  // fail
                },
                complete: function (res) {
                  // complete
                }
              })
            }
          })
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })
    }
    // })
    // }
  },
  globalData: {
    userInfo: null,
    userUid: null
  }
})