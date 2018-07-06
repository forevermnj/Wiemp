//index.js

var app = getApp();

Page({
  data: {
   
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
  clogin: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /*let refer = this;
    var wxTimer = new timer({
      beginTime: "00:00:02",
      complete: function () {
        wx.navigateTo({
          url: '../page_005/page_005',
        });
      }
    });
    wxTimer.start(refer);

    refer.setData({
      downCount:wxTimer
    })*/
  }
})
