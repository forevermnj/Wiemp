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
    previousImg: '../image/tabbar/13.png',
    animationData1: {}
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

      //创建动画
      let animation = wx.createAnimation({
        duration: 400,
        timingFunction: "ease",
        delay: 0
      });
      //Y轴偏移
      animation.opacity(0.5).rotate(-60);
      animation.opacity(0.5).scaleX(0.5);
      animation.opacity(0.5).scaleY(0.5);
      animation.opacity(0.5).translateY(-40).step();

      //导出动画
      refer.setData({
        animationData1: animation.export()
      });
      //1秒之后恢复
      setTimeout(function () {
        animation.opacity(1).rotate(0);
        animation.opacity(1).scaleX(1);
        animation.opacity(1).scaleY(1);
        animation.opacity(1).translateY(0).step();
        refer.setData({
          animationData1: animation.export()
        })
      }.bind(refer), 400);


      setTimeout(function () {
        refer.toCorrect();
      }.bind(refer), 800);
      
        // if (refer.data.imgindex<2){
        //   refer.setData({
        //     imgindex: refer.data.imgindex + 1
        //   })
        // }else{
         
        // }
        
    }
    if ((e.changedTouches[0].pageX - refer.data.startIndex) > 0){
     
      //创建动画
      let animation = wx.createAnimation({
        duration: 400,
        timingFunction: "ease",
        delay: 0
      });
      //Y轴偏移
      animation.opacity(0.5).rotate(60);
      animation.opacity(0.5).scaleX(0.5);
      animation.opacity(0.5).scaleY(0.5);
      animation.opacity(0.5).translateY(-40).step();

      //导出动画
      refer.setData({
        animationData1: animation.export()
      });
      //1秒之后恢复
      setTimeout(function () {
        animation.opacity(1).rotate(0);
        animation.opacity(1).scaleX(1);
        animation.opacity(1).scaleY(1);
        animation.opacity(1).translateY(0).step();
        refer.setData({
          animationData1: animation.export()
        })
      }.bind(refer), 400);

      setTimeout(function () {
        refer.toError();
      }.bind(refer), 800);


    }
  },

  toCorrect:function(){
    let refer = this;
    
      console.log('正确');
      refer.setData({
        resRigFlag:true,
        cflag:false
      });
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
   
  },

  toError:function(){
    let refer = this;
    console.log('错误');
    refer.setData({
      resErrFlag: true,
      cflag: false
    });
    let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
    console.log(tempFilePath);
    wx.playBackgroundAudio({
      dataUrl: tempFilePath
    });
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