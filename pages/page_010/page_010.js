var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    fistData: [],
    indeximg:'../image/tabbar/2.png',
    catagaryimg:'../image/tabbar/6.png',
    loginimg:'../image/tabbar/3.png'
   
  },
  clickImg:function(e){
    let refer = this;
    let csv0 = e.currentTarget.dataset.hi[0];
    let csv1 = e.currentTarget.dataset.hi[1];
    let csv2 = e.currentTarget.dataset.hi[2];
    let csv3 = e.currentTarget.dataset.hi[3];
    app.globalData.dropLetId = csv1;
    app.globalData.dropLetConfigTypeId = csv2;
    app.globalData.index = csv3;
    wx.redirectTo({
       url: csv0,
    });
   
  },
  onPullDownRefresh:function(){
    
  },
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getIndexData/getIndexData',
      method: 'GET',
      success: function (res) {
        refer.setData({
          fistData: res.data
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
  toIndex:function(){
     let refer = this;
     refer.setData({
       indeximg:'../image/tabbar/1.png',
       catagaryimg: '../image/tabbar/5.png',
       loginimg: '../image/tabbar/3.png'
     });
     wx.redirectTo({
       url: '../page_010/page_010',
     });
  },
  toCatagary: function () {
    let refer = this;
    refer.setData({
      catagaryimg: '../image/tabbar/6.png',
      indeximg: '../image/tabbar/2.png',
      loginimg: '../image/tabbar/3.png'
    });
    
  },
  toLogin:function(){
    let refer = this;
    refer.setData({
      catagaryimg: '../image/tabbar/5.png',
      indeximg: '../image/tabbar/2.png',
      loginimg:'../image/tabbar/4.png'
    });
    wx.redirectTo({
      url: '../page_005/page_005',
    });
  }
})
