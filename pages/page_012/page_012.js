var app = getApp();
var util = require('../../utils/util.js');
var imageUtil = require('../../utils/imageUtil.js');
Page({
  data: {
    headImage: wx.getStorageSync('headImage'),
    nickName: wx.getStorageSync('nickName'),
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png',
    speechImg:'../image/tabbar/18.gif',
    speechFlag:false,
    backImg:[
      { url: app.globalData.serverUrl + '/Emp/mobile/page_012/1.png'},
      { url: app.globalData.serverUrl + '/Emp/mobile/page_012/2.png' },
      { url: app.globalData.serverUrl + '/Emp/mobile/page_012/3.png' },
      { url: app.globalData.serverUrl + '/Emp/mobile/page_012/4.png' },
      { url: app.globalData.serverUrl + '/Emp/mobile/page_012/5.png' },
      { url: app.globalData.serverUrl + '/Emp/mobile/page_012/6.png' },
      { url: app.globalData.serverUrl + '/Emp/mobile/page_012/7.png' }

    ],
    backImgIndex:0,
    imagewidth: 0,//缩放后的宽
    imageheight: 0//缩放后的高
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  onLoad: function () {
    util.showBusy('加载中...');
    
    let refer = this;
    console.log(refer.data.backImgIndex);
    var tempFilePath = app.globalData.serverUrl +'/Emp/mobile/mp3/1.mp3';
    wx.playBackgroundAudio({
      dataUrl: tempFilePath
    });
    refer.setData({
      backImgIndex:0
    })
    //监听播放停止
    wx.onBackgroundAudioStop(function () {
      //console.log('onBackgroundAudioStop')
      refer.setData({
        speechImg: '../image/tabbar/14.png',
        speechFlag:true
      });
    });

    setTimeout(function () {
      refer.addBackImgIndex();
    }.bind(refer), 2000);
  },
  addBackImgIndex:function(){

    let refer = this;
    if (refer.data.backImgIndex >=6 && refer.data.backImgIndex>0){
      console.log('减');
      refer.reduceBackImgIndex();
      return
    }
    refer.setData({
      backImgIndex: refer.data.backImgIndex + 1
    });
    setTimeout(function () {
      refer.addBackImgIndex();
    }.bind(refer), 2000);
  },
  reduceBackImgIndex:function(){
    let refer = this;
    if (refer.data.backImgIndex<=0){
      console.log('加');
      refer.addBackImgIndex();
      return
    }
    
    refer.setData({
      backImgIndex: refer.data.backImgIndex - 1
    });
    setTimeout(function () {
      refer.reduceBackImgIndex();
    }.bind(refer), 2000);
    
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
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  }
})
