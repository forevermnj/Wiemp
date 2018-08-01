var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    list2: [
      {
        pic: '../image/page_010/6.png',
        title: 'mule'
      }, {
        pic: '../image/page_010/7.png',
        title: 'aws'
      }, {
        pic: '../image/page_010/8.png',
        title: 'expect'
      }
    ],
    headImage: wx.getStorageSync('headImage'),
    nickName: wx.getStorageSync('nickName'),
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png',
    recordimg:'../image/tabbar/15.png',
    flag1:false,
    flag2:false,
    recordurl:'',
    timestart:'',
    recoresult:''
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
        recordimg: '../image/tabbar/15.png',
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
          //let refer = this;
          refer.setData({
            recoresult:res.data
          })
        },
        fail: function () {
          console.log("语音识别失败");
        }
      })

     
    })
    refer.setData({
      recordimg: '../image/tabbar/15.png',
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
      recoresult:''
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

       
        // wx.startRecord({
        //   success: function (res) {
        //     var tempFilePath = res.tempFilePath;
        //     console.log('录音结束'+tempFilePath);
        //     wx.playVoice({
        //       filePath: tempFilePath,
        //       complete: function () {
        //       }
        //     })
        //   },
        //   fail: function (res) {
        //     //录音失败
        //   }
        // })

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
