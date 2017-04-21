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
          // console.log(res)
          var js_code = res.code
          var appid = 'wxf2868d0e8c61d87f'
          var secret = '563a4e932c72054155b44fc11e54e202'
          var grant_type = 'authorization_codegran'
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: { appid, secret, js_code, grant_type },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              // success
              // console.log(res)
              var session_key = res.data.session_key // get the session_key
              wx.getUserInfo({
                success: function (res) {
                  // console.log(res)
                  var encryptedData = res.encryptedData
                  var iv = res.iv
                  that.globalData.userInfo = res.userInfo
                  // wx.request({
                  //   url: 'http://localhost:3000/onLogin',
                  //   data: {
                  //     session_key,
                  //     iv,
                  //     encryptedData,
                  //   },
                  //   method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  //   // header: {}, // 设置请求的 header
                  //   success: function(res){
                  //     // success
                  //     // console.log(res)
                  //     that.globalData.userUid = res.data.openId
                  //     wx.setStorage({
                  //       key: 'openId',
                  //       data: res.data.openId,
                  //       success: function(res){
                  //         // success
                  //       },
                  //       fail: function(res) {
                  //         // fail
                  //       },
                  //       complete: function(res) {
                  //         // complete
                  //       }
                  //     })
                  that.globalData.userUid = 'oCU8L0Z-SrStLT6QC62oSUgyVw3M'
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