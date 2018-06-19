//index.js
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    authorizeUserInfoFlag:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    /**
     * 移除指定缓存数据
     */
    wx.removeStorageSync("wordidlist");
    wx.removeStorageSync("wordlist");
    wx.removeStorageSync("totalaccount");
    wx.removeStorageSync("uid");

    //清理本地缓存
    wx.clearStorage();

    var refer = this;
    refer.setData({
      authorizeUserInfoFlag: app.globalData.authorizeUserInfoFlag
    });
    //console.log("首页"+app.globalData.authorizeUserInfoFlag);

  },
  clogin: function(){
    wx.navigateTo({
      url: '../page_005/page_005',
    })
  }
})
