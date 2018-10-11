var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    resdata: [],
    bgimg: app.globalData.serverUrl +'/Emp/mobile/page_011/7.png',
    startIndex:0,
    endIndex:0,
    sindex:0
  },
  clickImg: function (e) {
    let csv0 = e.currentTarget.dataset.hi[0];
    let csv1 = e.currentTarget.dataset.hi[1];
    let csv2 = e.currentTarget.dataset.hi[2];
    let csv3 = e.currentTarget.dataset.hi[3];
    
    app.globalData.dropLetId = csv1;
    app.globalData.dropLetConfigTypeId = csv2;
    app.globalData.index = csv3;
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
    console.log(refer.data.sindex);
    refer.setData({
      endIndex: e.changedTouches[0].pageX
    })
   
    if ((refer.data.endIndex - refer.data.startIndex) < 0 && refer.data.sindex<=2){
        refer.setData({
          bgimg: refer.data.resdata[refer.data.sindex].cardBackImag,
          sindex: refer.data.sindex + 1
        })
        if (refer.data.sindex==3){
            refer.setData({
              sindex:2
            })
        }
    } 
    if ((refer.data.endIndex - refer.data.startIndex) > 0 && refer.data.sindex >= 0){
      
      refer.setData({
        bgimg: refer.data.resdata[refer.data.sindex].cardBackImag,
        sindex: refer.data.sindex - 1
      })
      
    }
    if (refer.data.sindex == -1) {
      refer.setData({
        bgimg: app.globalData.serverUrl + '/Emp/mobile/page_011/5.png',
        sindex:0
      })
    }
  },
  onPullDownRefresh: function () {

  },
  onLoad: function () {
    let refer = this;
    console.log('===' + app.globalData.dropLetId);
    console.log('===' + app.globalData.dropLetConfigTypeId);
    
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getCardListDroplet/getCardListDroplet/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        refer.setData({
          resdata: res.data
        })
      }
    })
    util.showBusy('加载中...');
    app.globalData.backImgIndex = 0;//page_012页面全局参数
    app.globalData.backMp3Index = 0;//page_012页面全局参数
    app.globalData.chooseDataIndex = 0;//page_013页面全局参数
    app.globalData.mp3dataIndex = 0;//page_013页面全局参数
    app.globalData.dataIndex = 0;//page_014页面全局参数
    app.globalData.anwdataIndex = 0;//page_014页面全局参数
    app.globalData.rdataIndex = 0;//page_016页面全局参数

    
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
