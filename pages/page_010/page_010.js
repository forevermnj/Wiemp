var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    fistData: [],
    
    headImage: wx.getStorageSync('headImage'),
    nickName: wx.getStorageSync('nickName'),
    indeximg:'../image/tabbar/2.png',
    catagaryimg:'../image/tabbar/6.png',
    loginimg:'../image/tabbar/3.png'
   
  },
  clickImg:function(e){
    let refer = this;
    let csv1 = e.currentTarget.dataset.hi;
    
    
    
      
      
        wx.redirectTo({
          url: csv1,
        })
     
   
    
  },
  clickImg2: function (e) {
    // wx.redirectTo({
    //   url: '../page_011/page_011',
    // })
  },
  onPullDownRefresh:function(){
    
  },
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getIndexData/getIndexData',
      method: 'GET',
      success: function (res) {
        //refer.data.fistData = res.data;
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
