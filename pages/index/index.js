//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
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
    wx.scanCode({
      success: function(res){
        // success
        console.log(res)
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
        userInfo:userInfo
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
