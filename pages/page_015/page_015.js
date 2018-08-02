var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    headImage: wx.getStorageSync('headImage'),
    nickName: wx.getStorageSync('nickName'),
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png',
    flag1:false,
    flag2:false,
    flag3:false,
    animationData1: {},
    animationData2: {}

  },
  clickImg: function () {
    wx.redirectTo({
      url: '../page_001/page_001',
    })
  },
  onPullDownRefresh: function () {

  },
  onLoad: function () {
    util.showBusy('加载中...');
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
  choose1: function (e) {
    //console.log(e.currentTarget.dataset.optionsindex);
    var refer = this;

    let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
    console.log(tempFilePath);
    wx.playBackgroundAudio({
      dataUrl: tempFilePath
    });

    //创建动画
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
      delay: 0
    });
    //Y轴偏移
    animation.backgroundColor("red");
    animation.opacity(1).translateY(-40).step();
    //导出动画
    refer.setData({
      animationData1: animation.export()
    });
    //1秒之后恢复
    setTimeout(function () {
      animation.backgroundColor("#334053");
      animation.opacity(1).translateY(0).step();
      refer.setData({
        animationData1: animation.export()
      })
    }.bind(refer), 400);

  },
  choose2: function (e) {
    //console.log(e.currentTarget.dataset.optionsindex);
    var refer = this;
    //wx.stopBackgroundAudio();
    var tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
    wx.playBackgroundAudio({
      dataUrl: tempFilePath
    });

    //创建动画
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
      delay: 0
    });
    //Y轴偏移
    animation.backgroundColor("red");
    animation.opacity(1).translateY(-40).step();
    //导出动画
    refer.setData({
      animationData2: animation.export()
    });
    //1秒之后恢复
    setTimeout(function () {
      animation.backgroundColor("#334053");
      animation.opacity(1).translateY(0).step();
      refer.setData({
        animationData2: animation.export()
      })
    }.bind(refer), 400);

  },
  toRight:function(){
     let refer = this;
     refer.setData({
       flag2:true
     });
     let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
     wx.playBackgroundAudio({
       dataUrl: tempFilePath
     });
    setTimeout(function () {
      wx.redirectTo({
        url: '../page_016/page_016',
      });
    }.bind(refer), 500);
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
      url: '../page_014/page_014',
    });
  }
})
