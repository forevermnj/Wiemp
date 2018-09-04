var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png',
    speechImg:'../image/tabbar/18.gif',
    speechFlag:false,
    backMp3:{},
    backMp3Index: app.globalData.backMp3Index,
    mp3Index:0,
    tflag:false
  },
  onLoad: function () {
    console.log('===' + app.globalData.dropLetId);
    console.log('===' + app.globalData.dropLetConfigTypeId);
    util.showBusy('加载中...');
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/scenariodroplet/getScenarioDropletData/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        console.log("返回数据"+res.data);
        refer.setData({
          backMp3: res.data
        })
      }
    })

    refer.setData({
      //backImgIndex: app.globalData.backImgIndex,
      //backMp3Index: app.globalData.backMp3Index
    });
    refer.toPlay();
  },
  toPlay:function(){
    
    let refer = this;
    if (refer.data.mp3Index <= refer.data.backMp3.list.length-1){
      let tempFilePath = refer.data.backMp3.list[refer.data.mp3Index].scenarioaudio;
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      if (refer.data.tflag == false){
        //监听播放停止
        wx.onBackgroundAudioStop(function () {
          console.log('播放停止');
          refer.setData({
            // backImgIndex: refer.data.backImgIndex + 1,
            // backMp3Index: refer.data.backMp3Index + 1,
            //imgIndex:refer.data.imgIndex+1,
            mp3Index:refer.data.mp3Index+1

          });
          if (refer.data.tflag == false){
            console.log('再次播放');
            refer.toPlay();
          }
          
        });
      }
      
    }else{
      console.log('toPlay--跳转页面');
      refer.setData({
        tflag:true
      })
      wx.redirectTo({
        url: '../page_013/page_013',
      });
    }
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
    let refer = this;
    //console.log(refer.data.backImgIndex);
    if (refer.data.mp3Index == refer.data.backMp3.list.length - 1){
      wx.stopBackgroundAudio();
      refer.setData({
        tflag: true
      })
      wx.redirectTo({
         url: '../page_013/page_013',
      });
    }
    refer.setData({
      mp3Index: refer.data.mp3Index + 1
    });
    refer.toPlay();
    
  },
  toPrevious:function(){
    let refer = this;
    if (refer.data.mp3Index>=1){
      refer.setData({
        mp3Index: refer.data.mp3Index - 1
      });
      refer.toPlay();
    }
  },
  toIndex: function () {
    let refer = this;
    refer.setData({
      backImgIndex: 5,
      tflag: true
    })
    wx.stopBackgroundAudio();
    refer.setData({
      indeximg: '../image/tabbar/1.png',
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
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

  }
})
