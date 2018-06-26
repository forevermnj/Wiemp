
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words_account: '0',
    task: 'done', //done, not_yet
    flag1: false
  },

  exercise: function (event) {
    var refer = this;
    refer.setData({
      flag1:true
    })
    wx.navigateTo({
      url: '../page_002/page_002'
    })
  },

  linktowordlist: function (event) {
    wx.navigateTo({
      url: '../page_003/page_003'
    })
  },

  linktocalendar: function (event) {
    wx.navigateTo({
      url: '../page_004/page_004'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid = wx.getStorageSync('uid');
    var refer = this;
    //已完成单词
    wx.request({
      url: app.globalData.serverUrl+'/Emp/mobile/bearword/doneWordCount/' + uid,
      method: 'GET',
      success: function (resz) {
        //console.log(resz.data);
        refer.setData({
          words_account: resz.data.totaldone
        })
      }
    })
    //打卡状态
    wx.request({
      url: app.globalData.serverUrl+'/Emp/mobile/bearword/whetherDoneHitCard/' + uid,
      method: 'GET',
      success: function (resz) {
        //console.log(resz.data);
        var taskstatus = 'not_yet';
        if (resz.data.taskstatus == '1') {
          taskstatus = 'done'
        }
        refer.setData({
          task: taskstatus
        })
      }
    })
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
    var refer = this;
    refer.setData({
      flag1: false
    })
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