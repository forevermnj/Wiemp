//index.js
var util = require('../../utils/util.js');
var timer = require('../../utils/wxTimer.js');
var app = getApp();

Page({
  data: {
    wxTimerList: {},
    intervarID:'',
    downCount:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.redirectTo({
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
  },
  clogin: function(){
    let refer = this;
    //当点击跳过时停止倒计时
    clearInterval(refer.data.downCount.intervarID);
    wx.redirectTo({
      url: '../page_005/page_005',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let refer = this;
    var wxTimer = new timer({
      beginTime: "00:00:02",
      complete: function () {
        wx.redirectTo({
          url: '../page_005/page_005',
        });
      }
    });
    wxTimer.start(refer);

    refer.setData({
      downCount:wxTimer
    })
  }
})
