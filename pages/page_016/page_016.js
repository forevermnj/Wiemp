const app = getApp();
const util = require('../../utils/util.js');
const plugin = requirePlugin("WechatSI");
// 获取**全局唯一**的语音识别管理器**recordRecoManager**
const manager = plugin.getRecordRecognitionManager();
Page({
  data: {
    recordimg:'../image/tabbar/20.gif',
    flag1:false,
    flag2:false,
    flag3:false,
    speakFlag:false,
    recordurl:'',
    timestart:'',
    score:0,
    scoreIndex:0,
    passsScore:70,
    allowReadNum:3,
    allowReadIndex:0,
    readSpeakData:{},
    resultExample:[]
  },
  /**
   * 按住按钮开始语音识别
   */
  streamRecord: function (e) {
    let refer = this;
    refer.setData({
      recordimg: '../image/tabbar/19.gif',
      flag1: true,
      flag2: false,
      timestart: e.timeStamp,
      recoresult: '',
      scoreIndex: 0
    })
    //  发起授权
    wx.authorize({
      scope: 'scope.record',
      success() {
        const options = {
          lang: "en_US",
        }
        manager.start(options);
      }, fail() {
        resolve(1)
      }
    })

  },
  /**
   * 松开按钮结束语音识别
   */
  streamRecordEnd: function (e) {
    let refer = this;
    if ((e.timeStamp - refer.data.timestart) < 300) {
      manager.stop();
      refer.setData({
        recordimg: '../image/tabbar/20.gif',
        flag1: false,
        flag2: true
      })
      return
    }
    refer.setData({
      recordimg: '../image/tabbar/20.gif',
      flag1: false
    });
    manager.stop();
  },
  toMatch:function(text){
    let refer = this;
    let tem = new Array();
    tem = text.split(' ');
    refer.data.resultExample = tem;
    refer.setData({
      resultExample: tem,
      tempurl: app.globalData.serverUrl + '/Emp/mobile/page_016/1.png',
      flag3: true
    })
    //数据比对
    for (let i = 0; i < refer.data.readSpeakData.readspeak.sentence.length; i++) {
      for (let k = 0; k < tem.length; k++) {
        if (tem[k] == refer.data.readSpeakData.readspeak.sentence[i].tit) {
          refer.data.scoreIndex = refer.data.scoreIndex + 1;
          refer.data.readSpeakData.readspeak.sentence[i].flag = true;
        }
      }
    }
    refer.setData({
      readSpeakData: refer.data.readSpeakData,
      speakFlag:false
    })
    let temp_score = refer.data.scoreIndex / refer.data.readSpeakData.readspeak.sentence.length;
    refer.setData({
      score: Math.round(temp_score * 100)
    })
    if (refer.data.score > refer.data.passsScore) {
      setTimeout(function () {
        refer.setData({
          resultExample: [],
          score: 0,
          flag3: false
        });
        let path = refer.data.readSpeakData.readspeak.dropLetLink;
        app.globalData.dropLetId = refer.data.readSpeakData.readspeak.reladropletid;
        app.globalData.dropLetConfigTypeId = refer.data.readSpeakData.readspeak.reladropletconftypeid;
        wx.redirectTo({
          url: path
        });
      }.bind(refer), 2000);
      refer.correctSoundEffect();

    } else {
      //读错次数递增
      refer.data.allowReadIndex = refer.data.allowReadIndex + 1;
      if (refer.data.allowReadIndex == refer.data.allowReadNum) {
        setTimeout(function () {
          refer.setData({
            resultExample: [],
            score: 0,
            flag3: false
          });
          let path = refer.data.readSpeakData.readspeak.dropLetLink;
          app.globalData.dropLetId = refer.data.readSpeakData.readspeak.reladropletid;
          app.globalData.dropLetConfigTypeId = refer.data.readSpeakData.readspeak.reladropletconftypeid;
          wx.redirectTo({
            url: path
          });
        }.bind(refer), 2000);
        refer.correctSoundEffect();
        refer.data.allowReadIndex = 0;
      }
    }
  },
  initRecord: function (){
    let refer = this;
    //有新的识别内容返回，则会调用此事件
    manager.onRecognize = (res) => {
      let text = res.result;
      //refer.toMatch(text);
    }
    // 识别结束事件
    manager.onStop = (res) => {
      let text = res.result;
      if (text == '') {
        this.showRecordEmptyTip()
        return
      }
      refer.toMatch(text);
    }

  },
  /**
   * 识别内容为空时的反馈
   */
  showRecordEmptyTip: function () {
    
    wx.showToast({
      title: '请说话',
      icon: 'success',
      duration: 1000,
      image:'../image/tabbar/27.png',
      success: function (res) {

      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  onLoad: function () {
    let refer = this;
    refer.initRecord();
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getReadSpeak/getReadSpeak/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        refer.setData({
          readSpeakData: res.data
        });
        
        if (refer.data.readSpeakData.readspeak.readtype=='speak'){
           refer.setData({
             recordimg:'../image/tabbar/18.gif',
             speakFlag:true
           });
           wx.playBackgroundAudio({
             dataUrl: refer.data.readSpeakData.readspeak.audio
           });
          //监听播放停止
          wx.onBackgroundAudioStop(function () {
            refer.setData({
              recordimg: '../image/tabbar/20.gif'
            });
          });
        }
      }
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
  }
})
