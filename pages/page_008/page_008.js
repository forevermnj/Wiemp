
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indeximg: '../image/tabbar/2.png',
    bearwordimg: '../image/tabbar/7.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toIndex: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/1.png',
      bearwordimg: '../image/tabbar/7.png'
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  },
  toBearWord: function () {
    let refer = this;
    refer.setData({
      bearwordimg: '../image/tabbar/8.png',
      indeximg: '../image/tabbar/2.png'
    });
    wx.redirectTo({
      url: '../page_001/page_001',
    });
  }
})