var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resdata: []
  },
  toClickImg: function (e){
    let csv0 = e.currentTarget.dataset.hi[0];
    let csv1 = e.currentTarget.dataset.hi[1];
    let csv2 = e.currentTarget.dataset.hi[2];
    app.globalData.dropLetId = csv1;
    app.globalData.dropLetConfigTypeId = csv2;
    wx.redirectTo({
      url: csv0,
    });
  },
  toBootomButton: function (e) {
    let refer = this;
    let csv0 = e.currentTarget.dataset.hi[0];
    let csv1 = e.currentTarget.dataset.hi[1];
    let csv2 = e.currentTarget.dataset.hi[2];
    app.globalData.dropLetId = csv1;
    app.globalData.dropLetConfigTypeId = csv2;
    wx.redirectTo({
      url: csv0,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getScenListDropLetData/getScenListDropLetData/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        refer.setData({
          resdata: res.data
        })
      }
    });
  }
})