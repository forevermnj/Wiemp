var app = getApp();
var util = require('../../utils/util.js');
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}



Page({
  
  data: {
    videoData:{},
    inputValue: '',
    danmuList: [],
    backImg: app.globalData.serverUrl+'/Emp/mobile/page_024/1.png'
  },
  onLoad: function (options) {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getVideo/getVideo/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        refer.setData({
          videoData: res.data
        });
      }
    });
  },
  bindSendDanmu: function () {
    let refer = this;
    refer.videoContext.sendDanmu({
      text: refer.inputValue,
      color: getRandomColor()
    })
  },
  bindInputBlur: function (e) {
    let refer = this;
    refer.inputValue = e.detail.value
  },
  onReady: function (res) {
    let refer = this;
    refer.videoContext = wx.createVideoContext('myVideo')
  },
  toEnd:function(){
    let refer = this;
    let path = refer.data.videoData.video.dropletlink;
    app.globalData.dropLetId = refer.data.videoData.video.reladropletid;
    app.globalData.dropLetConfigTypeId = refer.data.videoData.video.reladropletcontypeid;
    wx.redirectTo({
      url: path
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
  }
  
})