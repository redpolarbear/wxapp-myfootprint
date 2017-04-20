//bookinfo.js
var app = getApp()
Page({
  data:{
    result: {}
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var param = JSON.parse(options.data)
    





    console.log(JSON.parse(options.data))
    this.setData({
      result: JSON.parse(options.data)
    })
    // this.setData({
    //   result: JSON.parse(options.hello)
    // })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})