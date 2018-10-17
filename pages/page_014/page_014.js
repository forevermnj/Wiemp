var app = getApp();
var util = require('../../utils/util.js');
var calculatescore = require('../../utils/calculatescore.js');
Page({
  data: {
    fillBlankdata: {},
    answertemp:[],
    numtemp:-1,
    chooseResult:[],
    chooseResultSubNum:[],
    emptypositionIndex:0,
    allowClickNum:3,
    allowClickIndex:0,
    flag1:false,
    ifsubflag:false
  },
  clickEmpty: function (e) {
    let refer = this;
    
    let csv0 = e.currentTarget.dataset.hi[0];//答案
    let csv1 = e.currentTarget.dataset.hi[1];//下标
    //去掉填空
    refer.data.fillBlankdata.fillBlank.quest[csv1].tit = "______";
    //获取选择结果数组内,某个元素的下标
    let index = refer.data.chooseResult.indexOf(csv0);
    //在选择结果数组内,删除这个下标的元素
    refer.data.chooseResult.splice(index, 1);

    //获取答案数组内,某个元素的下标
    let used = new Array();
    let subnum = -1;
    for (let n = 0; n < refer.data.answertemp.length;n++){
      if (refer.data.answertemp[n].tit == csv0){
        subnum = refer.data.answertemp[n].subnum;
        refer.data.answertemp[n].tit = "$";
        break;
      }
    }
    //console.log(csv0 + "dddd" + subnum);
    for (let m = 0; m < refer.data.answertemp.length; m++) {
      //console.log(refer.data.answertemp[m].subnum + "--" + refer.data.answertemp[m].tit);
    }
    refer.data.numtemp = subnum;
    //获取选择的下标结果数组内,某个元素的下标
    let subnum2 = refer.data.chooseResultSubNum.indexOf(subnum);
    //在选择的下标结果数组内,删除这个下标的元素
    refer.data.chooseResultSubNum.splice(subnum2, 1);

    // if (refer.data.chooseResultSubNum.length == 0) {
    //   console.log("去除完成" + refer.data.answertemp);
    //   refer.data.answertemp = refer.data.fillBlankdata.fillBlank.answer
    //   for (let m = 0; m < refer.data.answertemp.length; m++) {
    //     console.log(refer.data.answertemp[m].subnum + "--" + refer.data.answertemp[m].tit);
    //   }
    // }

    //获取空位数组内,某个元素的下标
    let num = refer.data.fillBlankdata.fillBlank.emptyposition.indexOf(csv1);
    //console.log("====" + refer.data.chooseResultSubNum); 
    refer.setData({
      fillBlankdata: refer.data.fillBlankdata,
      chooseResult: refer.data.chooseResult,
      emptypositionIndex: num,
      chooseResultSubNum:refer.data.chooseResultSubNum
     });
  },
  check:function(e){
    let refer = this;
    refer.setData({
      ifsubflag:true
    })
    let weatherCorrect = true;
    //循环判断是否选择正确
    for (let i = 0; i < refer.data.chooseResult.length;i++){
      if (refer.data.chooseResult[i] == refer.data.fillBlankdata.fillBlank.quest[refer.data.fillBlankdata.fillBlank.emptyposition[i]].correct){
        
      }else{
        weatherCorrect = false;
      }
    }
    //如果选择正确
    if (weatherCorrect){
      //调用计算用户得分函数
      let score = calculatescore.addScore();
      console.log("===" + score);
      app.globalData.score = score;
      refer.correctSoundEffect();
      let path = refer.data.fillBlankdata.fillBlank.dropLetLink;
      app.globalData.dropLetId = refer.data.fillBlankdata.fillBlank.reladropletid;
      app.globalData.dropLetConfigTypeId = refer.data.fillBlankdata.fillBlank.reladropletconftypeid;

      //如果完成场景学习则调用保存分数方法
      if (refer.data.fillBlankdata.fillBlank.reladropletid == app.globalData.successDropLetId) {
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
    } else {
      //选错次数递增
      refer.data.allowClickIndex = refer.data.allowClickIndex + 1;
      refer.keySoundEffect();
      //当选错次数达到最大限制时
      if (refer.data.allowClickIndex == refer.data.allowClickNum){
        //给出正确答案
        for (let j = 0; j < refer.data.fillBlankdata.fillBlank.quest.length;j++){
          if (refer.data.fillBlankdata.fillBlank.quest[j].ifem){
            refer.data.fillBlankdata.fillBlank.quest[j].tit = refer.data.fillBlankdata.fillBlank.quest[j].correct;
          }
        }

        refer.setData({
          fillBlankdata: refer.data.fillBlankdata
        })
        refer.correctSoundEffect();
        let path = refer.data.fillBlankdata.fillBlank.dropLetLink;
        app.globalData.dropLetId = refer.data.fillBlankdata.fillBlank.reladropletid;
        app.globalData.dropLetConfigTypeId = refer.data.fillBlankdata.fillBlank.reladropletconftypeid;
        wx.redirectTo({
          url: path
        });
      }
    }
  },
  chooseAnswer:function(e){
    let refer = this;
    //是否提交标志
    refer.setData({
      ifsubflag:false
    })
    let csv0 = e.currentTarget.dataset.hi[0];//下标
    let csv1 = e.currentTarget.dataset.hi[1];//答案
    
    if (refer.data.numtemp!=-1){
      refer.data.answertemp[csv0].tit = csv1;
    }
    
      for (let m = 0; m < refer.data.answertemp.length; m++) {
        //console.log(refer.data.answertemp[m].subnum + "--" + refer.data.answertemp[m].tit);
      }
    //当选择的答案数组为空时,将空位下标重置
    if(refer.data.chooseResult.length==0){
       refer.setData({
         emptypositionIndex: 0
       })
    }
    //按键音效
    refer.keySoundEffect();
    //赋值答案
    refer.data.chooseResult.push(csv1);
    //赋值下标
    refer.data.chooseResultSubNum.push(csv0);
    //填空
    for(let k=0;k<refer.data.fillBlankdata.fillBlank.quest.length;k++){
      //如果为空则填空
      if (refer.data.fillBlankdata.fillBlank.quest[k].tit =='______'){
        refer.data.fillBlankdata.fillBlank.quest[k].tit = csv1;
        break;
      }
    }
    //let sub = refer.data.fillBlankdata.fillBlank.emptyposition[refer.data.emptypositionIndex];
    //refer.data.fillBlankdata.fillBlank.quest[sub].tit=csv1;
    //填完一次下标递增
    //refer.data.emptypositionIndex = refer.data.emptypositionIndex+1;
    //console.log("递增之后的下标" + refer.data.emptypositionIndex);
    //填空完成
    if (refer.data.chooseResult.length == refer.data.fillBlankdata.fillBlank.emptyposition.length) {
      refer.setData({
        flag1: true,
        emptypositionIndex:0
      });
    }
    refer.setData({
      fillBlankdata: refer.data.fillBlankdata,
      chooseResult: refer.data.chooseResult,
      chooseResultSubNum: refer.data.chooseResultSubNum
    });
  },
  //按键音效
  keySoundEffect: function () {
    let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
    wx.playBackgroundAudio({
      dataUrl: tempFilePath
    });
  },
  //正确音效
  correctSoundEffect: function () {
    let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
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
  onLoad: function () {
    //util.showBusy('加载中...');
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getFillBlankData/getFillBlankData/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        refer.setData({
          fillBlankdata: res.data,
          answertemp: res.data.fillBlank.answer
        });
      }
    })
    
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
        if (result.code == "1") {
          app.globalData.score = 0;
          //分数重置
          calculatescore.resetScore();
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //util.showSuccess('加载成功');
  }
  
})
