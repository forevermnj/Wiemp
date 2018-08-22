var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showBusy('加载中...');
  },
  toContinue:function(){
    wx.redirectTo({
      url: '../page_011/page_011',
    });
  },
  toCancel:function(){
    wx.redirectTo({
      url: '../page_011/page_011',
    });
  },
  toIndex: function () {
    let refer = this;
    refer.setData({
      backImgIndex: 5,
      tflag: true
    })
    wx.stopBackgroundAudio();
    refer.setData({
      indeximg: '../image/tabbar/1.png',
      catagaryimg: '../image/tabbar/5.png'
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  },
  toPrevious: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/2.png'
    });
    wx.redirectTo({
      url: '../page_011/page_011',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.showSuccess('加载成功');
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