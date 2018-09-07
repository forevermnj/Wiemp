var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    fillBlankdata: {},
    chooseResult:[],
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
     //获取选择的答案数组内,某个元素的下标
     let index = refer.data.chooseResult.indexOf(csv0);
     //获取空位数组内,某个元素的下标
     let num = refer.data.fillBlankdata.fillBlank.emptyposition.indexOf(csv1);
     //在选择的答案数组内,删除这个下标的元素
     refer.data.chooseResult.splice(index, 1);
     //去掉填空
     refer.data.fillBlankdata.fillBlank.quest[csv1].tit = "______";
     
     refer.setData({
      fillBlankdata: refer.data.fillBlankdata,
      chooseResult: refer.data.chooseResult,
      emptypositionIndex: num
     });
  },
  check:function(e){
    let refer = this;
    refer.setData({
      ifsubflag:true
    })
    if (refer.data.chooseResult[0] == refer.data.fillBlankdata.fillBlank.quest[refer.data.fillBlankdata.fillBlank.emptyposition[0]].correct
      && refer.data.chooseResult[1] == refer.data.fillBlankdata.fillBlank.quest[refer.data.fillBlankdata.fillBlank.emptyposition[1]].correct
    ){
      //console.log("选择正确");
      refer.correctSoundEffect();
      let path = refer.data.fillBlankdata.fillBlank.dropLetLink;
      app.globalData.dropLetId = refer.data.fillBlankdata.fillBlank.reladropletid;
      app.globalData.dropLetConfigTypeId = refer.data.fillBlankdata.fillBlank.reladropletconftypeid;
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
        let sub1 = refer.data.fillBlankdata.fillBlank.emptyposition[0];
        let sub2 = refer.data.fillBlankdata.fillBlank.emptyposition[1];
        let txt1 = refer.data.fillBlankdata.fillBlank.quest[sub1].correct
        let txt2 = refer.data.fillBlankdata.fillBlank.quest[sub2].correct
        refer.data.fillBlankdata.fillBlank.quest[sub1].tit = txt1;
        refer.data.fillBlankdata.fillBlank.quest[sub2].tit = txt2;

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
    refer.setData({
      ifsubflag:false
    })
    let csv0 = e.currentTarget.dataset.hi[0];//下标
    let csv1 = e.currentTarget.dataset.hi[1];//答案
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
    //填空
    let sub = refer.data.fillBlankdata.fillBlank.emptyposition[refer.data.emptypositionIndex];
    refer.data.fillBlankdata.fillBlank.quest[sub].tit=csv1;
    //填完一次下标递增
    refer.data.emptypositionIndex = refer.data.emptypositionIndex+1;
    console.log("递增之后的下标" + refer.data.emptypositionIndex);
    //填空完成
    if (refer.data.chooseResult.length == 2) {
      refer.setData({
        flag1: true,
        emptypositionIndex:0
      });
    }
    refer.setData({
      fillBlankdata: refer.data.fillBlankdata,
      chooseResult: refer.data.chooseResult
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
    util.showBusy('加载中...');
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getFillBlankData/getFillBlankData/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        refer.setData({
          fillBlankdata: res.data
        });
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.showSuccess('加载成功');
  }
  
})
