var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resdata: [],
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png'
  },
  toClickImg: function (e){
    let csv0 = e.currentTarget.dataset.hi[0];
    let csv1 = e.currentTarget.dataset.hi[1];
    app.globalData.relaDropLetId = csv1;
    wx.redirectTo({
      url: csv0,
    })
    
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
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getScenListDropLetData/getScenListDropLetData/' + app.globalData.dropLetId+'/sd',
      method: 'GET',
      success: function (res) {
        refer.setData({
          resdata: res.data
        })
      }
    })
    util.showBusy('loading...');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.showSuccess('loading successed');
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