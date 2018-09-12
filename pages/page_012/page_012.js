var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    speechImg:'../image/tabbar/18.gif',
    speechFlag:false,
    backMp3:{},
    mp3Index:0,
    tflag:false
  },
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/scenariodroplet/getScenarioDropletData/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        refer.setData({
          backMp3: res.data
        })
        refer.toPlay();
      }
    })

    refer.setData({
      //backImgIndex: app.globalData.backImgIndex,
      //backMp3Index: app.globalData.backMp3Index
    });
    
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
          refer.setData({
            mp3Index:refer.data.mp3Index+1
          });
          if (refer.data.tflag == false){
            refer.toPlay();
          }
        });
      }
    }else{
      refer.setData({
        tflag:true
      })
      let path = refer.data.backMp3.list[0].dropLetLink;
      app.globalData.dropLetId = refer.data.backMp3.list[0].reladropletid;
      app.globalData.dropLetConfigTypeId = refer.data.backMp3.list[0].reladropletconftypeid;
      wx.redirectTo({
        url: path
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
        refer.setData({
          speechImg: '../image/tabbar/14.png',
          speechFlag: true
        });
      })
    }
  },
  toNext:function(){
    let refer = this;
    if (refer.data.mp3Index == refer.data.backMp3.list.length - 1){
      wx.stopBackgroundAudio();
      refer.setData({
        tflag: true
      })
      let path = refer.data.backMp3.list[0].dropLetLink;
      app.globalData.dropLetId = refer.data.backMp3.list[0].reladropletid;
      app.globalData.dropLetConfigTypeId = refer.data.backMp3.list[0].reladropletconftypeid;
      wx.redirectTo({
        url: path
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
  toBootomButton: function (e) {
    let refer = this;
    let csv0 = e.currentTarget.dataset.hi[0];
    let csv1 = e.currentTarget.dataset.hi[1];
    let csv2 = e.currentTarget.dataset.hi[2];
    app.globalData.dropLetId = csv1;
    app.globalData.dropLetConfigTypeId = csv2;
    refer.setData({
      tflag: true
    })
    wx.stopBackgroundAudio();
    refer.setData({
      indeximg: '../image/tabbar/1.png',
    });
    wx.redirectTo({
      url: csv0,
    });
  }
})
