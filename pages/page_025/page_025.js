var app = getApp();
var util = require('../../utils/util.js');
var calculatescore = require('../../utils/calculatescore.js');

Page({
  data: {
    ifsubFlag:false,
    question:[],
    dictationData:{},
    enterAnswer: '',
    emptyStr: '____________',
    answerIndex:0,
    score:0,
    passScore:-1,
    correctIndex:0,
    speechImg: '../image/tabbar/18.gif',
    playFlag:false
  },
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getDictation/getDictation/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        refer.setData({
          dictationData: res.data,
          question: res.data.dictation.question
        });
        refer.toPlay(refer.data.dictationData.dictation.audio);
      }
    });
  },
  toPlay:function(path){
    let refer = this;
    wx.playBackgroundAudio({
      dataUrl: path
    });
    //监听播放停止
    wx.onBackgroundAudioStop(function () {
      refer.setData({
        playFlag: true
      });
    });
  },
  toSub:function(){
    let refer = this;
    if(refer.data.enterAnswer==''){
      wx.showToast({
        title: '请输入答案',
        image: '../image/tabbar/25.png',
        duration: 2000
      })
      return
    }
    
    //输入的答案
    let inputAnswer = new Array();
    //原答案
    let originalAnswer = new Array();
    let newQuestion = new Array();
    //赋值原答案
    originalAnswer = refer.data.dictationData.dictation.anwser.split(" ");
    for(let j=0;j<refer.data.dictationData.dictation.question.length;j++){
      if (refer.data.dictationData.dictation.question[j].emptyflag){
        inputAnswer = refer.data.dictationData.dictation.question[j].tit.split(" ");
      }
    }

    let tempQuestion = new Array();
    //数据重新组装
    for (let m = 0; m < refer.data.dictationData.dictation.question.length;m++){
      if (refer.data.dictationData.dictation.question[m].emptyflag==false){
        newQuestion.push({ tit: refer.data.dictationData.dictation.question[m].tit, emptyflag: refer.data.dictationData.dictation.question[m].emptyflag, correctflag: refer.data.dictationData.dictation.question[m].correctflag});
      }else{
        tempQuestion = refer.data.dictationData.dictation.question[m].tit.split(" ");
        for(let h=0;h<tempQuestion.length;h++){
          newQuestion.push({ tit: tempQuestion[h], emptyflag:true, correctflag:false});
        }
      }
    }
    //数据比对
    for (let a = 0; a < newQuestion.length; a++){
      if (newQuestion[a].emptyflag) {
        if (newQuestion[a].tit == originalAnswer[refer.data.answerIndex]) {
            refer.data.correctIndex = refer.data.correctIndex + 1;
            refer.data.answerIndex = refer.data.answerIndex + 1;
            newQuestion[a].correctflag = true;
        }else{
          refer.data.answerIndex = refer.data.answerIndex + 1;
        }
      }
    }
    refer.correctSoundEffect();
    //计算分数
    let temp_score = refer.data.correctIndex / originalAnswer.length;
    
    //比对完成重新赋值
    refer.setData({
      question: newQuestion,
      ifsubFlag:true,
      answerIndex:0,
      enterAnswer:'',
      score: Math.round(temp_score * 100),
      correctIndex:0
    });
    if (refer.data.score > refer.data.passScore){
      //调用计算用户得分函数
      let score = calculatescore.addScore();
      console.log("===" + score);
    }
    

    setTimeout(function () {
      let path = refer.data.dictationData.dictation.dropletlink;
      app.globalData.dropLetId = refer.data.dictationData.dictation.reladropletid;
      app.globalData.dropLetConfigTypeId = refer.data.dictationData.dictation.reladropletcontypeid;

      //如果完成场景学习则调用保存分数方法
      if (refer.data.dictationData.dictation.reladropletid == app.globalData.successDropLetId) {
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
    }.bind(refer), 1000);
    
  },
  answerInput:function(e){
    let refer = this;
    refer.data.enterAnswer = e.detail.value;
    for (let i = 0; i < refer.data.dictationData.dictation.question.length;i++){
      if (refer.data.dictationData.dictation.question[i].emptyflag){
        if (e.detail.value==''){
          refer.data.dictationData.dictation.question[i].tit = refer.data.emptyStr;
          refer.setData({
            question: refer.data.dictationData.dictation.question
          });
        }else{
          refer.data.dictationData.dictation.question[i].tit = e.detail.value;
          refer.setData({
            question: refer.data.dictationData.dictation.question
          });
        }
      }
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