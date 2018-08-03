var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    speechImg:'../image/tabbar/18.gif',
    speechFlag:false,
    cimgs:[
      { url: app.globalData.serverUrl +'/Emp/mobile/page_019/1.png'},
      { url: app.globalData.serverUrl + '/Emp/mobile/page_019/2.png' },
      { url: app.globalData.serverUrl + '/Emp/mobile/page_019/3.png' }
    ],
    cflag:false,
    startIndex:0,
    imgindex:0,
    resRigFlag:false,
    resErrFlag:false,
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png'
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
  toPrevious: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/2.png'
    });
    wx.redirectTo({
      url: '../page_018/page_018',
    });
  },

  toMoveStart:function(e){
    let refer = this;
    refer.setData({
      startIndex: e.touches[0].pageX
    })
  },

  toMoveEnd:function(e){
    let refer = this;
    if ((e.changedTouches[0].pageX - refer.data.startIndex)<0){
        if (refer.data.imgindex<2){
          refer.setData({
            imgindex: refer.data.imgindex + 1
          })
        }else{
         
        }
        
    }
    if ((e.changedTouches[0].pageX - refer.data.startIndex) > 0){
      if (refer.data.imgindex >0) {
        refer.setData({
          imgindex: refer.data.imgindex - 1
        })
      } else {

      }
    }
  },

  toCorrect:function(){
    let refer = this;
    if (refer.data.imgindex==2){
      console.log('正确');
      refer.setData({
        resRigFlag:true,
        cflag:false
      });
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
    }else{
      refer.setData({
        resErrFlag: true,
        cflag: false
      });
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      console.log(tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
    }
  },

  toError:function(){
    console.log('错误');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let refer = this;
    setTimeout(function () {
      refer.setData({
        cflag:true,
        speechFlag:true
      })
    }.bind(refer), 2000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  }
})