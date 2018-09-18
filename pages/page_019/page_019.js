var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    rightSoundEffect: app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3',
    errorSoundEffect: app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3',
    rightFlag:false,
    errorFlag:false,
    animationData: '',
    matchData:{
      "button": [],
      "match": {
        "dropletlink": null,
        "reladropletid": null,
        "reladropletconftypeid": null,
        "matchtype": 3,
        "audio": null,
        "image": app.globalData.serverUrl + '/Emp/mobile/page_019/1.png',
        "ifimageright": null,
        "ifsentenceright": null,
        "ifanswersentenceright": null,
        "answeraudio": null,
        "ifansweraudioright": null,
        "sentence": null,
        "answersentence": null
      }
    },
    speechImg:'../image/tabbar/18.gif',
    startIndex:0
  },
 

  toMoveStart:function(e){
    let refer = this;
    refer.data.startIndex = e.touches[0].clientX;
  },
  toMove:function(e){
    let refer = this;
    let flag = e.currentTarget.dataset.hi;
    //左移动
    if (e.touches[0].clientX-refer.data.startIndex <0){
      refer.setData({
        startIndex: e.touches[0].clientX
      })
      refer.toLeft(flag);//调用左移动方法
    }else{
      refer.setData({
        startIndex: e.touches[0].clientX
      })
      refer.toRight(flag);//调用右移动方法
    }
  },
  toCorrect:function(){
    let refer = this;
    let tempFilePath = refer.data.rightSoundEffect;
    wx.playBackgroundAudio({
      dataUrl: tempFilePath
    });
  },
  toError:function(){
    let refer = this;
    let tempFilePath = refer.data.errorSoundEffect;
    wx.playBackgroundAudio({
      dataUrl: tempFilePath
    });
  },
  toLeft:function(flag){
    let refer = this;
    let animation = wx.createAnimation({
      duration: 900,
      timingFunction: "ease",
    });
    refer.animation = animation;

    animation.scale(1, 1).translateX(-120).rotate(-45).step();

    refer.setData({
      animationData: animation.export()
    });

    setTimeout(function () {
      if(flag){
        refer.setData({
          rightFlag: true,
          errorFlag: false
        })
      }else{
        refer.setData({
          rightFlag: false,
          errorFlag: true
        })
      }
    }.bind(refer), 850);
  },
  toRight:function(flag){
    let refer = this;
    let animation = wx.createAnimation({
      duration: 900,
      timingFunction: "ease",
    });
    refer.animation = animation;

    animation.scale(1, 1).translateX(120).rotate(45).step();

    refer.setData({
      animationData: animation.export()
    });

    setTimeout(function () {
      if(flag){
        refer.setData({
          errorFlag: false,
          rightFlag: true
        })
      }else{
        refer.setData({
          errorFlag: true,
          rightFlag: false
        })
      }
    }.bind(refer), 850);
  },
  onLoad: function () {
    
  }
})