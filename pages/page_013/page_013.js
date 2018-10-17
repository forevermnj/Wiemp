var app = getApp();
var util = require('../../utils/util.js');
var calculatescore = require('../../utils/calculatescore.js');
Page({
  data: {
    nochooseflag:-1,
    allowClickNum:2,
    allowClickIndex:0,
    chooseDataFlag:false,
    chooseDataNum:0,
    chooseData:{},
    animationErrorData: {},
    animationCorrectData: {},
    correctFlag:-1,
    speeImgInit:'../image/tabbar/14.png',
    speechFlag:false
  },
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getChoiceDropLet/getChoiceDropLet/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        refer.setData({
          chooseData: res.data
        })
        if (refer.data.chooseData.choice.choicetype=="1"){
          refer.speech();
        }
      }
    })
  },
  speech:function(){
     let refer = this;
     refer.setData({
       speeImgInit:'../image/tabbar/18.gif',
       speechFlag:true
     });
    let tempFilePath = refer.data.chooseData.choice.choicetextaudio;
     wx.playBackgroundAudio({
       dataUrl: tempFilePath
     });
     //监听播放停止
     wx.onBackgroundAudioStop(function () {
       refer.setData({
         speeImgInit: '../image/tabbar/14.png',
         speechFlag: false
       });
     })
  },
  toCreateCorrectAnimation:function(){
    let refer = this;
    //创建动画
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    });
    //Y轴偏移
    animation.opacity(1).translateY(-40).step();
    //导出动画
    refer.setData({
      animationCorrectData: animation.export()
    });
    //1秒之后恢复
    setTimeout(function () {
      animation.opacity(1).translateY(0).step();
      refer.setData({
        animationCorrectData: animation.export()
      })
    }.bind(refer), 500);
    
    refer.setData({
      nochooseflag: 0
    });
    setTimeout(function () {
      let path = refer.data.chooseData.choice.dropLetLink;
      app.globalData.dropLetId = refer.data.chooseData.choice.reladropletid;
      app.globalData.dropLetConfigTypeId = refer.data.chooseData.choice.reladropletconftypeid;
      //如果完成场景学习则调用保存分数方法
      if (refer.data.chooseData.choice.reladropletid == app.globalData.successDropLetId){
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
    }.bind(refer), 1300);
  },
  toCreateErrorAnimation:function(){
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
  choose: function (e) {
    let refer = this;
    let optionFlag = e.currentTarget.dataset.hi[0];
    let optionIndex = e.currentTarget.dataset.hi[1];
    refer.setData({
      chooseDataNum: optionIndex
    });
   
    //如果选择正确
    if (optionFlag) {
      //调用计算用户得分函数
      let score = calculatescore.addScore();
      console.log("===" + score);
      app.globalData.score = score;
      refer.correctSoundEffect();
      refer.setData({
        chooseDataFlag:true
      })
      refer.toCreateCorrectAnimation();
    }else{
      //允许点错次数递增
      refer.data.allowClickIndex = refer.data.allowClickIndex + 1;
      //超过选错次数则自动跳转下一个
      if (refer.data.allowClickIndex == refer.data.allowClickNum){
          refer.setData({
            nochooseflag: 0
          });
          setTimeout(function () {
            let path = refer.data.chooseData.choice.dropLetLink;
            app.globalData.dropLetId = refer.data.chooseData.choice.reladropletid;
            app.globalData.dropLetConfigTypeId = refer.data.chooseData.choice.reladropletconftypeid;
            wx.redirectTo({
              url: path
            });
          }.bind(refer), 1100);
          refer.correctSoundEffect();
          return
      }
      refer.setData({
        nochooseflag: -1,
        chooseDataFlag: false
      })
      refer.errorSoundEffect();
      refer.toCreateErrorAnimation();
    }
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
  //正确音效
  correctSoundEffect: function () {
    let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
    wx.playBackgroundAudio({
      dataUrl: tempFilePath
    });
  },
  //错误音效
  errorSoundEffect: function () {
    let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
    wx.playBackgroundAudio({
      dataUrl: tempFilePath
    });
  },
  //保存用户得分
  saveUserScore:function(userid,index,dropletid,dropletconftypeid){
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
