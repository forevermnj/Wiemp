// pages/page_002/page_002.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordlist: ["Financial", "daily", "exercise", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    totalaccount: 20,
    wordindex: 0,
    startx: 0
  },

  //手指滑动开始
  mytouchstart: function (event) {
    this.setData({
      startx: event.touches[0].pageX
    });
  },

  //手指滑动
  mytouchmove: function (event) {
  },

  //手指滑动开始
  mytouchend: function (event) {
    var distancex = event.changedTouches[0].pageX - this.data.startx;
    var i = this.data.wordindex;

    if (distancex < 0) {//move forward
      if (i >= this.data.wordlist.length - 1) {
        console.log();
        this.setData({
          wordindex: 0
        })
      } else {
        this.setData({
          wordindex: this.data.wordindex + 1
        })
      }

    } else { // move back
      if (i <= 0) {
        this.setData({
          wordindex: this.data.wordlist.length - 1
        })
      } else {
        this.setData({
          wordindex: this.data.wordindex - 1
        })
      }
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