var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    rightSoundEffect: app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3',
    errorSoundEffect: app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3',
    rightFlag:false,
    errorFlag:false,
    startFlag:false,
    moveDirection:-1,
    videoFlag:false,
    animationData: '',
    matchData:{},
    speechImg:'../image/tabbar/18.gif',
    anwserImg:'../image/tabbar/29.gif',
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
    if (e.touches[0].clientX-refer.data.startIndex <-20){
      refer.setData({
        startIndex: e.touches[0].clientX,
        moveDirection:'left'
      })
      refer.toLeft(flag);//调用左移动方法
    } else if ((e.touches[0].clientX - refer.data.startIndex >20)){
      refer.setData({
        startIndex: e.touches[0].clientX,
        moveDirection: 'right'
      })
      refer.toRight(flag);//调用右移动方法
    }
  },
  toMoveEnd:function(e){
    let refer = this;
    let flag = e.currentTarget.dataset.hi;
    console.log(flag);
    setTimeout(function () {
      //如果答案正确并且向左移动则回答正确
      if (flag && refer.data.moveDirection=='left') {
        //console.log('回答正确');
        refer.setData({
          rightFlag: true,
          errorFlag: false
        });
        refer.toCorrect();
      }
      //如果答案错误并且向右移动则回答正确 
      if (flag == false && refer.data.moveDirection == 'right'){
        //console.log('回答正确');
        refer.setData({
          rightFlag: true,
          errorFlag: false
        });
        refer.toCorrect();
      }
      //如果答案正确并且向右移动则回答错误
      if(flag && refer.data.moveDirection=='right'){
        //console.log('回答错误');
        refer.setData({
          rightFlag: false,
          errorFlag: true
        });
        refer.toError();
      }
      //如果答案错误并且向左移动则回答错误
      if (flag==false && refer.data.moveDirection == 'left') {
        //console.log('回答错误');
        refer.setData({
          rightFlag: false,
          errorFlag: true
        });
        refer.toError();
      }
    }.bind(refer), 850);
    setTimeout(function () {
      //跳下一题
      let path = refer.data.matchData.match.dropletlink;
      app.globalData.dropLetId = refer.data.matchData.match.reladropletid;
      app.globalData.dropLetConfigTypeId = refer.data.matchData.match.reladropletconftypeid;
      wx.redirectTo({
        url: path
      });
    }.bind(refer), 1000);
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
  toLeft:function(){
    let refer = this;
    let animation = wx.createAnimation({
      duration: 900,
      timingFunction: "ease",
    });
    refer.animation = animation;

    animation.scale(1, 1).translateX(-150).rotate(-25).step();

    refer.setData({
      animationData: animation.export()
    });
  },
  toRight:function(){
    let refer = this;
    let animation = wx.createAnimation({
      duration: 900,
      timingFunction: "ease",
    });
    refer.animation = animation;

    animation.scale(1, 1).translateX(150).rotate(25).step();

    refer.setData({
      animationData: animation.export()
    });

    
  },
  toBootomButton: function (e) {
    let refer = this;
    wx.stopBackgroundAudio();
    let csv0 = e.currentTarget.dataset.hi[0];
    let csv1 = e.currentTarget.dataset.hi[1];
    let csv2 = e.currentTarget.dataset.hi[2];
    app.globalData.dropLetId = csv1;
    app.globalData.dropLetConfigTypeId = csv2;
    wx.redirectTo({
      url: csv0,
    });
  },
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getMatch/getMatch/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        refer.setData({
          matchData: res.data
        });
        wx.playBackgroundAudio({
          dataUrl: refer.data.matchData.match.audio
        });
        //监听播放停止
        wx.onBackgroundAudioStop(function () {
          refer.setData({
            startFlag: true
          });
          if(refer.data.videoFlag){
             refer.setData({
               anwserImg: '../image/tabbar/28.png'
             })
          }
          if (refer.data.matchData.match.matchtype == 3 && refer.data.videoFlag == false){
            //console.log(refer.data.matchData.match.matchtype+'音频答案');
            wx.playBackgroundAudio({
              dataUrl: refer.data.matchData.match.answeraudio
            });
            refer.setData({
              videoFlag:true
            })
          }
        });
      }
    });
  }
})