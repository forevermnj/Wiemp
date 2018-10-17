var app = getApp();
var util = require('../../utils/util.js');
var calculatescore = require('../../utils/calculatescore.js');
Page({
  data: {
    audioChoice:{},
    chooseDataNum:0,
    mp3index:1,
    preflag:false,
    speeImgInit: '../image/tabbar/14.png',
    speechFlag: false,
    animationErrorData: {},
    animationCorrectData: {},
    allowClickNum:3,
    allowClickIndex:0,
    allowClickFlag:false,
    nochooseflag: -1
  },
  toPlay:function(mp3url){
    wx.playBackgroundAudio({
      dataUrl: mp3url
    });
  },
  speech: function () {
    let refer = this;
    let mp3url = refer.data.audioChoice.choiceAudio.choiceaudio;
    if (refer.data.preflag==false){
      refer.setData({
        speeImgInit: '../image/tabbar/18.gif',
        speechFlag: true,
        allowClickFlag:false,
        mp3index: refer.data.audioChoice.choiceAudio.choiceaudioindexa
      });
      refer.toPlay(mp3url);
      //监听播放停止
      wx.onBackgroundAudioStop(function () {
        refer.data.mp3index = refer.data.mp3index +1;
        if (!refer.data.allowClickFlag){
          if (refer.data.preflag == false) {
            if (refer.data.mp3index ==2) {
              let mp3url =refer.data.audioChoice.choiceAudio.choiceaudioa;
              refer.toPlay(mp3url);
            } else if (refer.data.mp3index == 3) {
              let mp3url = refer.data.audioChoice.choiceAudio.choiceaudiob;
              refer.toPlay(mp3url);
            } else if (refer.data.mp3index == 4){
              let mp3url = refer.data.audioChoice.choiceAudio.choiceaudioc;
              refer.toPlay(mp3url);
            }else{
               refer.setData({
                 speeImgInit: '../image/tabbar/14.png',
                 speechFlag: false
               });
            }
          }
        }
      })
    }
  },
  onLoad: function () {
    util.showBusy('加载中...');
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getChoiceAudioDroplet/getChoiceAudioDroplet/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        refer.setData({
          audioChoice: res.data,
          chooseDataNum: 0
        })
        refer.speech();
      }
    });
  },
  toCreateErrorAnimation: function () {
    let refer = this;
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
      animationErrorData: animation.export()
    });
    //1秒之后恢复
    setTimeout(function () {
      animation.backgroundColor("#354255");
      animation.opacity(1).translateY(0).step();
      refer.setData({
        animationErrorData: animation.export()
      })
    }.bind(refer), 400);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.showSuccess('加载成功');
  },
  choose: function (e) {
    let refer = this;
    let flag = e.currentTarget.dataset.hi[0];
    let num = e.currentTarget.dataset.hi[1];
    refer.setData({
      chooseDataNum: num,
      speeImgInit: '../image/tabbar/14.png',
      speechFlag: false
    });
    if (flag){
      refer.setData({
        nochooseflag: 0,
        preflag: true
      })
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      
    
      setTimeout(function () {
        //调用计算用户得分函数
        let score = calculatescore.addScore();
        console.log("===" + score);
        app.globalData.score = score;
        wx.stopBackgroundAudio();
        let path = refer.data.audioChoice.choiceAudio.dropLetLink;
        app.globalData.dropLetId = refer.data.audioChoice.choiceAudio.reladropletid;
        app.globalData.dropLetConfigTypeId = refer.data.audioChoice.choiceAudio.reladropletconftypeid;

        //如果完成场景学习则调用保存分数方法
        if (refer.data.audioChoice.choiceAudio.reladropletid == app.globalData.successDropLetId) {
          refer.saveUserScore(
            wx.getStorageSync('uid'),
            app.globalData.scoreIndex,
            app.globalData.scoreDropLetId,
            app.globalData.scoreDropLetConfigTypeId
          );
        }
        wx.redirectTo({
          url: path
        });
      }.bind(refer), 1500);
    }else{
      //选错次数递增
      refer.setData({
        allowClickFlag:true
      })
      wx.stopBackgroundAudio();
      refer.data.allowClickIndex = refer.data.allowClickIndex + 1;
      if(refer.data.allowClickIndex == refer.data.allowClickNum){
          //console.log('选错三次');
          refer.setData({
            nochooseflag: 0,
            preflag: true
          })
        refer.data.allowClickIndex = 0;
        setTimeout(function () {
          wx.stopBackgroundAudio();
          let path = refer.data.audioChoice.choiceAudio.dropLetLink;
          app.globalData.dropLetId = refer.data.audioChoice.choiceAudio.reladropletid;
          app.globalData.dropLetConfigTypeId = refer.data.audioChoice.choiceAudio.reladropletconftypeid;
          wx.redirectTo({
            url: path
          });
        }.bind(refer), 1500);
        //return

      }
      refer.errorSoundEffect();
      refer.toCreateErrorAnimation();
    }
  },
  //错误音效
  errorSoundEffect: function () {
    let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
    wx.playBackgroundAudio({
      dataUrl: tempFilePath
    });
  },
  toBootomButton: function (e) {
    let refer = this;
    let csv0 = e.currentTarget.dataset.hi[0];
    let csv1 = e.currentTarget.dataset.hi[1];
    let csv2 = e.currentTarget.dataset.hi[2];
    app.globalData.dropLetId = csv1;
    app.globalData.dropLetConfigTypeId = csv2;
    wx.redirectTo({
      url: csv0,
    });
  },
  //保存用户得分
  saveUserScore: function (userid, index, dropletid, dropletconftypeid) {
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/subtask/saveScore',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        userid: userid,
        index: index,
        dropletid: dropletid,
        dropletconftypeid: dropletconftypeid,
        score: app.globalData.score
      },
      success: function (result) {
        if (result.data.code == "1") {
          app.globalData.score = 0;
          //分数重置
          calculatescore.resetScore();
        }
      }
    })
  }
})
