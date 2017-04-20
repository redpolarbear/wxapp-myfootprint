//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    userUid: '',
    isbncode: '',
    data: {
      "author": "《图说天下·珍藏版》编委会 编",
      "binding": "",
      "images_large": "http://open.6api.net/lpic/s6499208.jpg",
      "images_medium": "http://open.6api.net/mpic/s6499208.jpg",
      "isbn10": "7546310520",
      "isbn13": "9787546310527",
      "levelNum": "0",
      "origin_title": "",
      "pages": "189",
      "price": "88.00",
      "pubdate": "2009-11",
      "publisher": "",
      "subtitle": "",
      "summary": "《唐诗三百首(儿童注音读本)》内容简介：从远古的回顾到今天的眺望，如果只选择停留在原点，便永远望不见地平线另一端的模样。成长，是一个过程，如果不能让脚步飞扬，那么就该让思想插上翅膀。童话与故事赐予我们想象，它们是基石，垫高我们迈向前方的脚。当我们把“为什么”变成惊叹号，当我们无畏地闯入大自然的怀抱，成长的轨迹便会向未来伸展成有力的形状。用最精美的图片张扬自然的力量，用最传神的文字解读知识的彷徨。让我们放下沉甸甸的书包，以最轻松的姿态来阅读这个世界。透过图书让视野扩容，在这里，或绘制或拍摄的图片异彩纷呈，或知识或故事的文字娓娓道来，就这样缩短时与空的距离，让昨天、今天与明天衔接成一条光滑的弧线——我们在成长。",
      "title": "唐诗三百首",
      "translator": ""
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  addData: function(e) {
    // var uid = wx.getStorageSync('wilddog123:UUID')
    // console.log(uid)
    // app.todoRef.update({
    //   'text': 'hello world'
    // })
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
    var dataString = JSON.stringify(this.data.data)
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
    // var that = this
    // wx.request({
    //   url: 'http://feedback.api.juhe.cn/ISBN',
    //   data: {
    //     key: '436d9b993fd3c3138954fd6fc9f89053',
    //     sub: '9787546310527'
    //   },
    //   dataType: 'json',
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res){
    //     // success
    //     console.log(res)
    //     if (res.statusCode == 200) {
    //       var dataString = JSON.stringify(res.data.result)
    //       wx.navigateTo({
    //         url: '../bookinfo/bookinfo?data=' + dataString,
    //         success: function(res){
    //           // success
    //         },
    //         fail: function(res) {
    //           // fail
    //         },
    //         complete: function(res) {
    //           // complete
    //         }
    //       })
    //     }

    //   },
    //   fail: function(res) {
    //     // fail
    //   },
    //   complete: function(res) {
    //     // complete
    //   }
    // })
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
    app.getUserInfo(function(userInfo, userUid){
      //更新数据
      that.setData({
        userInfo: userInfo,
        userUid: userUid
      })
    })
    // app.todoRef.bindAsArray(this, 'todo', function(err) {
    //   if(err != null){
    //     // 数据绑定失败，失败原因：err.message;
    //     console.log(err)
    //   } else {
    //       // 数据绑定成功
    //   }
    // })
  }
})
