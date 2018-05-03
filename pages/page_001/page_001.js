// pages/page_001/page_001.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words_account: '280',
    task: 'done' //done, not_yet
  },

  linkto: function (event) {
    if (event.target.id == "wronglist") {
      wx.navigateTo({
        url: '../page_101/page_101'
      })
    }
    else if (event.target.id == "learncalender") {
      wx.navigateTo({
        url: '../page_101/page_101'
      })
    }

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

  }
})