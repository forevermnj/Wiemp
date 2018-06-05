//index.js
var util = require('../../utils/util.js');

Page({
  data: {
   
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
  clogin: function(){
    wx.navigateTo({
      url: '../page_005/page_005',
    })
  }
})
