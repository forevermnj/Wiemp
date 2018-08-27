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
          tit: 'Weekly Report',
          process: '0',
          tip: '至今还未闯关，赶紧开始吧!',
          tt: '16/30'
        },
        {
          img: app.globalData.serverUrl + '/Emp/mobile/page_021/2.png',
          tit: 'Issue Report',
          process: '60',
          tip: 'completed 60%,average score 83',
          tt: '16/30'
        },
        {
          img: app.globalData.serverUrl + '/Emp/mobile/page_021/3.png',
          tit: 'Shown Demo',
          process: '0',
          tip: '至今还未闯关，赶紧开始吧!',
          tt: '16/30'
        },
        {
          img: app.globalData.serverUrl + '/Emp/mobile/page_021/4.png',
          tit: 'Finance Report',
          process: '0',
          tip: '至今还未闯关，赶紧开始吧!',
          tt: '16/30'
        }
      ],
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png'
  },
  toIndex: function () {
    let refer = this;
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
      url: '../page_010/page_010',
    });
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