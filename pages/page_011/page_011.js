var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    list2: [
      {
        pic: app.globalData.serverUrl+'/Emp/mobile/page_011/1.png',
        title: 'Listening'
      }, {
        pic: app.globalData.serverUrl +'/Emp/mobile/page_011/2.png',
        title: 'Speaking'
      }, {
        pic: app.globalData.serverUrl +'/Emp/mobile/page_011/3.png',
        title: 'Meeting'
      }, {
        pic: app.globalData.serverUrl +'/Emp/mobile/page_011/4.png',
        title: 'Vocabulary'
      }
    ],
    headImage: wx.getStorageSync('headImage'),
    nickName: wx.getStorageSync('nickName'),
    indeximg: '../image/tabbar/2.png',
    catagaryimg: '../image/tabbar/5.png',

  },
  clickImg: function () {
    wx.redirectTo({
      url: '../page_012/page_012',
    })
  },
  onPullDownRefresh: function () {

  },
  onLoad: function () {
    util.showBusy('加载中...');
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

  },
  toIndex: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/2.png',
      catagaryimg: '../image/tabbar/5.png'
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  },
  toCatagary: function () {
    let refer = this;
    refer.setData({
      catagaryimg: '../image/tabbar/6.png',
      indeximg: '../image/tabbar/2.png'
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  }
})
