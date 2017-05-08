//bookinfo.js
var app = getApp()
Page({
  data: {
    book: null
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this
    var param = options.isbn
    var child = ''
    if (param.length == 10) {
      child = 'isbn10';
    } else if (param.length == 13) {
      child = 'isbn13';
    }
    // search the book in the WD by isbn
    app.BooksRef
      .orderByChild(child)
      .equalTo(param)
      .once('value')
      .then(function (snap) {
        if (!!snap.val()) {
          var bookObj = {}
          snap.forEach(function (childsnap) {
            for (var f in childsnap.val()) {
              bookObj[f] = childsnap.val()[f]
            }
            return true
          })
          that.setData({
            book: bookObj
          })
          wx.hideLoading()
          wx.showToast({
            title: '已完成',
            icon: 'success'
          });
          // setTimeout(() => {
          //   wx.showToast({
          //     title: '已完成',
          //     icon: 'success'
          //   });
          // }, 1000)
        } else if (snap.val() == null) {
          // search the book in JUHE by the isbn
          wx.request({
            url: 'http://feedback.api.juhe.cn/ISBN',
            data: {
              key: '436d9b993fd3c3138954fd6fc9f89053',
              sub: param
            },
            dataType: 'json',
            method: 'GET',
            success: function (res) {
              // console.log(res)
              // success
              if (res.statusCode == 200 && res.data.result) {
                that.setData({
                  book: res.data.result
                })
                // Add the data to the Book (WD)
                app.BooksRef.push(res.data.result)
                  .then(function (newRef) {
                    var updateValue = {}
                    var childRef = newRef.key() + '/uid'
                    updateValue[childRef] = newRef.key()
                    app.BooksRef.update(updateValue)
                      .then(function () {
                        // pop toast - success
                        wx.hideLoading()
                        wx.showToast({
                          title: '已完成',
                          icon: 'success'
                        });
                        // setTimeout(() => {
                        //   wx.showToast({
                        //     title: '已完成',
                        //     icon: 'success',
                        //     duration: 2000
                        //   });
                        // }, 1000)
                      })
                      .catch(function (err) {
                        // pop toast - fail with err
                        // navigate back to home

                      })
                  })
              } else {
                // popup toast - nothing found 
                // navigate back to home
                wx.hideLoading()
                wx.showModal({
                  content: '数据库中无法查找到该图书资料！',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack()
                    }
                  }
                })
              }
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
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})