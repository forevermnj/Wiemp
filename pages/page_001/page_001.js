// pages/page_001/page_001.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words_account: '280',
    task: 'done' //done, not_yet
  },

  exercise: function (event) {
    wx.navigateTo({
      url: '../page_002/page_002'
    })
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
    //set local storage when user first time access app of one day. 
    //The checking is not implemented yet.

    wx.setStorage({
      key: "finishedaccount",
      data: "250" //the number should get from backend
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //get word account from local storage if user access the app at same day
    var that = this;
    wx.getStorage({
      key: 'finishedaccount',
      success: function (res) {
        that.setData({
          words_account: res.data
        })
      }
    });
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