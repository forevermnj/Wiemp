var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    list1: [
      {
        pic: '../image/page_010/1.png',
        title: 'sweet words'
      }, {
        pic: '../image/page_010/2.png',
        title: 'mongo reading'
      }, {
        pic: '../image/page_010/3.png',
        title: 'stand up meeting'
      }, {
        pic: '../image/page_010/4.png',
        title: 'stand up meeting'
      }, {
        pic: '../image/page_010/5.png',
        title: 'Professional literacy'
      }
    ],
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
      }, {
        pic: '../image/page_010/9.png',
        title: 'stand Up'
      }, {
        pic: '../image/page_010/10.png',
        title: 'mulesoft'
      }
    ],
    list3: [
      {
        pic: '../image/page_010/11.png',
        title: 'expect'
      }
    ],
    headImage: wx.getStorageSync('headImage'),
    nickName: wx.getStorageSync('nickName'),
    indeximg:'../image/tabbar/2.png',
    catagaryimg:'../image/tabbar/6.png',
    loginimg:'../image/tabbar/3.png'
   
  },
  clickImg:function(){
    wx.redirectTo({
      url: '../page_001/page_001',
    })
  },
  clickImg2: function () {
    wx.redirectTo({
      url: '../page_012/page_012',
    })
  },
  onPullDownRefresh:function(){
    
  },
  onLoad: function () {
    // var pages = getCurrentPages();
    // console.log('ddd' + pages.length);
    // if (pages.length>2){
    //   wx.navigateBack({
    //     delta: pages.length-1
    //   })
    // }
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
