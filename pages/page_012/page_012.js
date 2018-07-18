var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    headImage: wx.getStorageSync('headImage'),
    nickName: wx.getStorageSync('nickName'),
    indeximg: '../image/tabbar/2.png',
    catagaryimg: '../image/tabbar/5.png',
    speechImg:'../image/tabbar/18.gif',
    speechFlag:false
  },
  onLoad: function () {
    util.showBusy('加载中...');
    let refer = this;
    var tempFilePath = app.globalData.serverUrl +'/Emp/mobile/mp3/1.mp3';
    wx.playBackgroundAudio({
      dataUrl: tempFilePath
    });
    //监听播放停止
    wx.onBackgroundAudioStop(function () {
      //console.log('onBackgroundAudioStop')
      refer.setData({
        speechImg: '../image/tabbar/14.png',
        speechFlag:true
      });
    })
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
  speech:function(){
    let refer = this;
    if (refer.data.speechFlag){
      refer.setData({
        speechImg: '../image/tabbar/18.gif',
        speechFlag: false
      });
      var tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/1.mp3';
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      //监听播放停止
      wx.onBackgroundAudioStop(function () {
        //console.log('onBackgroundAudioStop')
        refer.setData({
          speechImg: '../image/tabbar/14.png',
          speechFlag: true
        });
      })
    }
  },
  toNext:function(){
    wx.redirectTo({
      url: '../page_013/page_013',
    });
  },
  toPrevious:function(){
    wx.redirectTo({
      url: '../page_011/page_011',
    });
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
