//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    isbncode: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  addData: function(e) {
    app.todoRef.update({
      'text': 'hello world'
    })
  },
  scanISBN: function(e) {
    var that = this
    wx.scanCode({
      success: function(res){
        // success
        console.log(res)
        that.setData({
          isbncode: res.result
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  showModal: function() {
    wx.showModal({
      title: 'Modal',
      content: 'hello world',
      showCancel: true,
      success: function(res) {
        if (res.confirm) {
          console.log(res)
          console.log('success')
        } else {
          console.log(res)
          console.log('用户点击取消')
        }
      },
      fail: function() {
      }
    })
  },
  apiRequest: function() {
    var that = this
    wx.request({
      url: 'http://feedback.api.juhe.cn/ISBN',
      data: {
        key: '436d9b993fd3c3138954fd6fc9f89053',
        sub: '9787546310527'
      },
      dataType: 'json',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        if (res.statusCode == 200) {
          var dataString = JSON.stringify(res.data.result)
          wx.navigateTo({
            url: '../bookinfo/bookinfo?data=' + dataString,
            success: function(res){
              // success
            },
            fail: function(res) {
              // fail
            },
            complete: function(res) {
              // complete
            }
          })
        }

      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  navigate() {
    var world = {
      hello: "world"
    }
    wx.navigateTo({
      url: '../bookinfo/bookinfo?text=' + JSON.stringify(world),
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onLoad: function () {
    // console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    app.todoRef.bindAsArray(this, 'todo', function(err) {
      if(err != null){
        // 数据绑定失败，失败原因：err.message;
        console.log(err)
      } else {
          // 数据绑定成功
      }
    })
  }
})
