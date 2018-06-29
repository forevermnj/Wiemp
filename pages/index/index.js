//index.js
var util = require('../../utils/util.js');
var timer = require('../../utils/wxTimer.js');
var app = getApp();

Page({
  data: {
    authorizeUserInfoFlag:false,
    wxTimerList: {},
    intervarID:''
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
  },
  clogin: function(){
    let refer = this;
    console.log(refer.data.intervarID);
    clearInterval(refer.data.intervarID);
    wx.navigateTo({
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
        refer.setData({
          intervarID: wxTimer.intervarID
        });
        wx.navigateTo({
          url: '../page_005/page_005',
        });
      }
    });
    wxTimer.start(refer);
    console.log(wxTimer.intervarID);
  }
})
