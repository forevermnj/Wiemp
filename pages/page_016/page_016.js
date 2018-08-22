var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png',
    recordimg:'../image/tabbar/20.gif',
    flag1:false,
    flag2:false,
    flag3:false,
    recordurl:'',
    timestart:'',
    score:0,
    scoreIndex:0,
    rdataIndex:0,
    rdata:[
      { tit: 
        [
          { wo: 'Daily', flag: false},
          { wo: 'scrum', flag: false},
          { wo: 'meeting', flag: false},
          { wo: 'will', flag: false},
          { wo: 'turn', flag: false},
          { wo: 'out', flag: false},
          { wo: 'to', flag: false},
          { wo: 'be', flag: false},
          { wo: 'much', flag: false},
          { wo: 'faster', flag: false},
          { wo: 'and', flag: false},
          { wo: 'more', flag: false},
          { wo: 'efficient', flag: false},
          { wo: 'than', flag: false},
          { wo: 'a', flag: false},
          { wo: 'sitting', flag: false},
          { wo: 'way', flag: false}
        ]
      },
      { tit: 
          [
           { wo: 'The', flag: false},
           { wo: 'purpose', flag: false},
           { wo: 'of', flag: false},
           { wo: 'fixing', flag: false},
           { wo: '15', flag: false},
           { wo: 'minutes', flag: false},
           { wo: 'is', flag: false },
           { wo: 'to', flag: false},
           { wo: 'form', flag: false},
           { wo: 'the', flag: false},
           { wo: 'meeting', flag: false},
           { wo: 'habit', flag: false},
           { wo: 'and', flag: false},
           { wo: 'discipline', flag: false}
          ]
      },
      { tit: 
         [
          { wo: 'we', flag: false},
          { wo: 'shall', flag: false},
          { wo: 'get', flag: false},
          { wo: 'back', flag: false},
          { wo: 'on', flag: false},
          { wo: 'our', flag: false},
          { wo: 'track', flag: false},
          { wo: 'to', flag: false},
          { wo: 'synchronize', flag: false},
          { wo: 'the', flag: false},
          { wo: 'work', flag: false},
          { wo: 'of', flag: false},
          { wo: 'everyone', flag: false}
         ]
      },
      { tit:
          [
           { wo: 'Could', flag: false},
           { wo: 'you', flag: false},
           { wo: 'please', flag: false},
           { wo: 'spare', flag: false},
           { wo: 'some', flag: false},
           { wo: 'of', flag: false},
           { wo: 'your', flag: false},
           { wo: 'time', flag: false},
           { wo: 'to', flag: false},
           { wo: 'assist', flag: false},
           { wo: 'Linda', flag: false},
           { wo: 'with', flag: false},
           { wo: 'more', flag: false},
           { wo: 'details', flag: false},
           { wo: 'after', flag: false},
           { wo: 'this', flag: false},
           { wo: 'meeting', flag: false}
          ]
       }
    ],
    resultExample:[],
    tempurl: app.globalData.serverUrl+'/Emp/mobile/page_016/1.png'
  },
  clickImg: function () {
    wx.redirectTo({
      url: '../page_001/page_001',
    })
  },
  toRecordEnd:function(e){
    let refer = this;
    if ((e.timeStamp - refer.data.timestart)<300){
      wx.stopRecord();
      refer.setData({
        recordimg: '../image/tabbar/20.gif',
        flag1: false,
        flag2:true
      })
      return
    }
    const recorderManager = wx.getRecorderManager();
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      //console.log('停止录音', res.tempFilePath);
      const { tempFilePath } = res

      //console.log("语音识别");
      wx.uploadFile({
        url: app.globalData.serverUrl +'/Emp/mobile/speech/recognition',
        filePath: res.tempFilePath,
        name: 'file',
        formData: {
          'user': 'test'
        },
        success: function (res) {
          //console.log(res); console.log(res.data);
          let tem =new Array();
          tem = res.data.split(' ');
          //console.log(tem);
          refer.data.resultExample = tem;
          refer.setData({
            resultExample: tem,
            tempurl: app.globalData.serverUrl + '/Emp/mobile/page_016/1.png',
            flag3:true
          })
          for (let i = 0; i < refer.data.rdata[refer.data.rdataIndex].tit.length;i++){
              for(let k=0;k<tem.length;k++){
                if (tem[k] == refer.data.rdata[refer.data.rdataIndex].tit[i].wo){
                     refer.data.scoreIndex = refer.data.scoreIndex+1;
                  refer.data.rdata[refer.data.rdataIndex].tit[i].flag=true;
                }
              }
          }
          refer.setData({
            rdata: refer.data.rdata
          })
          let temp_score = refer.data.scoreIndex / refer.data.rdata[refer.data.rdataIndex].tit.length;
          refer.setData({
            score: Math.round(temp_score * 100)
          })
          if (temp_score<0.1){
            //console.log('读错的下标'+error);
            // let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
            // console.log(tempFilePath);
            // wx.playBackgroundAudio({
            //   dataUrl: tempFilePath
            // });
            let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
            wx.playBackgroundAudio({
              dataUrl: tempFilePath
            });
            if (refer.data.rdataIndex == 3){
              app.globalData.rdataIndex = app.globalData.rdataIndex + 1;
              setTimeout(function () {
                wx.redirectTo({
                  url: '../page_020/page_020',
                });
              }.bind(refer), 2500);
            }
            if (refer.data.rdataIndex == 1) {
              app.globalData.rdataIndex = app.globalData.rdataIndex + 1;
              setTimeout(function () {
                wx.redirectTo({
                  url: '../page_017/page_017',
                });
              }.bind(refer), 2500);
            } else {
              app.globalData.rdataIndex = app.globalData.rdataIndex + 1;
              setTimeout(function () {
                refer.setData({
                  rdataIndex: refer.data.rdataIndex + 1,
                  resultExample: [],
                  score: 0,
                  flag3: false
                });
              }.bind(refer), 2500);
            }
            
          }else{
            let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
            wx.playBackgroundAudio({
              dataUrl: tempFilePath
            });
            if (refer.data.rdataIndex == 3) {
              app.globalData.rdataIndex = app.globalData.rdataIndex + 1;
              setTimeout(function () {
                wx.redirectTo({
                  url: '../page_011/page_011',
                });
              }.bind(refer), 2000);
            }
            if (refer.data.rdataIndex == 1){
              app.globalData.rdataIndex = app.globalData.rdataIndex + 1;
              setTimeout(function () {
                wx.redirectTo({
                  url: '../page_017/page_017',
                });
              }.bind(refer), 2000);
            }else{
              app.globalData.rdataIndex = app.globalData.rdataIndex + 1;
              setTimeout(function () {
                refer.setData({
                  rdataIndex: refer.data.rdataIndex + 1,
                  resultExample: [],
                  score:0,
                  flag3:false
                });
                
              }.bind(refer), 2000);
            }
          }
        },
        fail: function () {
          console.log("语音识别失败");
        }
      })
     
    })
    refer.setData({
      recordimg: '../image/tabbar/20.gif',
      flag1: false
    })
  },
  toRecordStart:function(e){
    let refer = this;
    refer.setData({
      recordimg:'../image/tabbar/19.gif',
      flag1:true,
      flag2:false,
      timestart: e.timeStamp,
      recoresult:'',
      scoreIndex:0
    })
    //  发起授权
    wx.authorize({
      scope: 'scope.record',
      success() {
        const recorderManager = wx.getRecorderManager();
        const options = {
          duration: 10000, //指定录音的时长，单位 ms
          sampleRate: 16000,//采样率
          numberOfChannels: 1,//录音通道数
          encodeBitRate: 64000,//编码码率
          format: 'mp3',//音频格式，有效值 aac/mp3
          frameSize: 50//指定帧大小，单位 KB
        }
        recorderManager.start(options);

      }, fail() {
        resolve(1)
      }
    })
  },
  onPullDownRefresh: function () {

  },
  onLoad: function () {
    util.showBusy('加载中...');
    let refer = this;
    refer.setData({
      rdataIndex: app.globalData.rdataIndex
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

  },
  toIndex: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/1.png',
      catagaryimg: '../image/tabbar/5.png'
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  },
  toPrevious: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/2.png'
    });
    wx.redirectTo({
      url: '../page_015/page_015',
    });
  }
})
