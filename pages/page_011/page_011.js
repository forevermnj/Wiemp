var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    resdata: [],
    bgimg: '',
    startIndex:0,
    endIndex:0,
    sindex:0
  },
  clickImg: function (e) {
    let csv0 = e.currentTarget.dataset.hi[0];
    let csv1 = e.currentTarget.dataset.hi[1];
    let csv2 = e.currentTarget.dataset.hi[2];
    let csv3 = e.currentTarget.dataset.hi[3];
    let csv4 = e.currentTarget.dataset.hi[4];
    let csv5 = e.currentTarget.dataset.hi[5];
    
    app.globalData.dropLetId = csv1;
    app.globalData.dropLetConfigTypeId = csv2;

    app.globalData.scoreDropLetId = csv4;
    app.globalData.scoreDropLetConfigTypeId = csv5;
    app.globalData.scoreIndex = csv3;
    wx.redirectTo({
      url: csv0,
    })
  },
  touchstart:function(e){
    let refer = this;
    refer.setData({
      startIndex: e.changedTouches[0].pageX
    })
  },
  touchend:function(e){
    let refer = this;
    refer.setData({
      endIndex: e.changedTouches[0].pageX
    })
    if ((refer.data.endIndex - refer.data.startIndex) < 0 && refer.data.sindex<=refer.data.resdata.list.length){
        refer.setData({
          bgimg: refer.data.resdata.list[refer.data.sindex].cardBackImag,
          sindex: refer.data.sindex + 1
        });
        if (refer.data.sindex == refer.data.resdata.list.length){
            refer.setData({
              sindex: refer.data.resdata.list.length-1
            });
        }
    } 
    if ((refer.data.endIndex - refer.data.startIndex) > 0 && refer.data.sindex >= 0){
      refer.setData({
        bgimg: refer.data.resdata.list[refer.data.sindex].cardBackImag,
        sindex: refer.data.sindex - 1
      })
    }
    if (refer.data.sindex == -1) {
      refer.setData({
        bgimg: refer.data.resdata.list[0].cardBackImag,
        sindex:0
      })
    }
  },
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getCardListDroplet/getCardListDroplet/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId + '/' + wx.getStorageSync('uid'),
      method: 'GET',
      success: function (res) {
        refer.setData({
          resdata: res.data,
          bgimg: res.data.list[0].cardBackImag
        })
      }
    })
    util.showBusy('加载中...');
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.showSuccess('加载成功');
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
