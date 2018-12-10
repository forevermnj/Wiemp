var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    button: [],
    passimg: app.globalData.serverUrl+'/Emp/mobile/page_020/5.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let refer = this;
    console.log(app.globalData.dropLetId);
    console.log(app.globalData.dropLetConfigTypeId);
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/gammarSuccess/gammarSuccess/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        refer.setData({
          button: res.data
        })
       
      }
    })
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
  }
})