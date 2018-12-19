var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    previousimg: '../image/tabbar/13.png'
  },
  toPrevious: function () {
    wx.redirectTo({
      url: '../page_026/page_026',
    });
  },
  toChangeTradePwd: function () {

  },
  toChangeLoginPwd: function () {
    wx.redirectTo({
      url: '../page_032/page_032'
    })
  }
});