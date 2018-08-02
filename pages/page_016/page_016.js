var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    headImage: wx.getStorageSync('headImage'),
    nickName: wx.getStorageSync('nickName'),
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png',
    recordimg:'../image/tabbar/20.gif',
    flag1:false,
    flag2:false,
    flag3:false,
    recordurl:'',
    timestart:'',
    cflag0:false,
    cflag1:false,
    cflag2:false,
    cflag3:false,
    cflag4:false,
    cflag5:false,
    cflag6:false,
    cflag7:false,
    cflag8:false,
    cflag9:false,
    cflag10:false,
    cflag11:false,
    score:0,
    scoreIndex:0,
    example:['when','he','spoke','to','people','most','of','them','just','looked','at','him'],
    resultExample:[],
    tempurl: app.globalData.serverUrl+'/Emp/mobile/page_016/1.png'
  },
  clickImg: function () {
    wx.redirectTo({
      url: '../page_001/page_001',
    })
  },
  onPullDownRefresh: function () {

  },
  onLoad: function () {
    util.showBusy('加载中...');
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
  toRecordEnd:function(e){
    let refer = this;
    //console.log(e.timeStamp);
    
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
      console.log('停止录音', res.tempFilePath);
      const { tempFilePath } = res

      console.log("语音识别");
      wx.uploadFile({
        url: app.globalData.serverUrl +'/Emp/mobile/speech/recognition',
        filePath: res.tempFilePath,
        name: 'file',
        formData: {
          'user': 'test'
        },
        success: function (res) {
          console.log(res); console.log(res.data);
          let tem =new Array();
          tem = res.data.split(' ');
          console.log(tem);
          refer.data.resultExample = tem;
          //let refer = this;
          refer.setData({
            //recoresult:res.data,
            resultExample: tem,
            tempurl: app.globalData.serverUrl + '/Emp/mobile/page_016/2.png',
            flag3:true
          })
          for (let i = 0; i < refer.data.example.length;i++){
              for(let k=0;k<tem.length;k++){
                   if(tem[k]==refer.data.example[i]){
                     refer.data.scoreIndex = refer.data.scoreIndex+1;
                       if (i == 0){
                          refer.setData({
                            cflag0:true,
                            //scoreIndex: scoreIndex+1
                          })
                       }
                       if (i == 1) {
                         refer.setData({
                           cflag1: true,
                           //scoreIndex: scoreIndex + 1
                         })
                       }
                       if (i == 2) {
                         refer.setData({
                           cflag2: true,
                           //scoreIndex: scoreIndex + 1
                         })
                       }
                       if (i == 3) {
                         refer.setData({
                           cflag3: true,
                           //scoreIndex: scoreIndex + 1
                         })
                       }
                       if (i == 4) {
                         refer.setData({
                           cflag4: true,
                           //scoreIndex: scoreIndex + 1
                         })
                       }
                       if (i == 5) {
                         refer.setData({
                           cflag5: true,
                           //scoreIndex: scoreIndex + 1
                         })
                       }
                       if (i == 6) {
                         refer.setData({
                           cflag6: true,
                           //scoreIndex: scoreIndex + 1
                         })
                       }
                       if (i == 7) {
                         refer.setData({
                           cflag7: true,
                           //scoreIndex: scoreIndex + 1
                         })
                       }
                       if (i == 8) {
                         refer.setData({
                           cflag8: true,
                           //scoreIndex: scoreIndex + 1
                         })
                       }
                       if (i == 9) {
                         refer.setData({
                           cflag9: true,
                           //scoreIndex: scoreIndex + 1
                         })
                       }
                       if (i == 10) {
                         refer.setData({
                           cflag10: true,
                           //scoreIndex: scoreIndex + 1
                         })
                       }
                       if (i == 11) {
                         refer.setData({
                           cflag11: true,
                           //scoreIndex: scoreIndex + 1
                         })
                       }
                   }
              }
          }

          let temp_score = refer.data.scoreIndex / 12;
          refer.setData({
            score: Math.round(temp_score * 100)
          })
          if (temp_score<0.5){
            let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
            console.log(tempFilePath);
            wx.playBackgroundAudio({
              dataUrl: tempFilePath
            });
          }else{
            let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
            wx.playBackgroundAudio({
              dataUrl: tempFilePath
            });
            setTimeout(function () {
              wx.redirectTo({
                url: '../page_016/page_016',
              });
            }.bind(refer), 1000);
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
    //console.log(e.timeStamp);
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
