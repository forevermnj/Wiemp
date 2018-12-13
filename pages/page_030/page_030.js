var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    previousimg:'../image/tabbar/13.png',
    cacheSize: wx.getStorageInfoSync().currentSize+"KB"
  },
  onLoad: function () {
    
  },
  toPrevious:function(){
    wx.redirectTo({
      url: '../page_026/page_026',
    });
  },
  toClearCache: function () {
    let refer = this;
    wx.showModal({
      title: '温馨提示',
      content: '本操作将清除所有本地缓存，包括第三方账号信息，本地设置等，确定要清除缓存吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.clearStorageSync();
          refer.setData({
            cacheSize: wx.getStorageInfoSync().currentSize + "KB"
          })
          wx.redirectTo({
            url: '../page_005/page_005',
          });
        } else {
          
        }
      }
    });
  },
  toQuit: function () {
    let refer = this;
    wx.showModal({
      title: '温馨提示',
      content: '确定退出当前账号吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../page_005/page_005',
          });
        } else {

        }
      }
    });
  }
  
})