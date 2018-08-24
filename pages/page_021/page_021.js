var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      resdata:[
        { 
          img: app.globalData.serverUrl + '/Emp/mobile/page_021/1.png',
          con:
          [
            'Meeting',
            '0',
            'completed 60%,average score 83',
            '16/30'
          ] 
        },
        {
          img: app.globalData.serverUrl + '/Emp/mobile/page_021/2.png',
          con:
            [
              'Meeting',
              '0',
              'completed 60%,average score 83',
              '16/30'
            ] 
        },
        {
          img: app.globalData.serverUrl + '/Emp/mobile/page_021/3.png',
          con:
            [
              'Meeting',
              '0',
              'completed 60%,average score 83',
              '16/30'
            ] 
        },
        {
          img: app.globalData.serverUrl + '/Emp/mobile/page_021/4.png',
          con:
            [
              'Meeting',
              '0',
              'completed 60%,average score 83',
              '16/30'
            ] 
        }
      ],
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png'
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