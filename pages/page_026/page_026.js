var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
     userCenterData:[],
     indeximg: '../image/tabbar/2.png',
     catagaryimg: '../image/tabbar/5.png',
     loginimg: '../image/tabbar/31.png',
     center: '../image/tabbar/3.png',
     userheadimg: wx.getStorageSync('headImage'),
     tel: wx.getStorageSync('userName'),
     nickName: wx.getStorageSync('nickName')
  },
  toClick:function(e){
    let path = e.currentTarget.dataset.hi;
    if(path!="" && path!=null){
      wx.redirectTo({
        url: path
      });
    }
  },
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/userCenter/getUserCenterData',
      method: 'GET',
      success: function (res) {
        refer.setData({
          userCenterData:res.data.result
        });
      }
    });
  },
  toIndex: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/1.png',
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
  toLogin: function () {
    let refer = this;
    refer.setData({
      catagaryimg: '../image/tabbar/5.png',
      indeximg: '../image/tabbar/2.png',
      loginimg: '../image/tabbar/4.png'
    });
    wx.redirectTo({
      url: '../page_005/page_005',
    });
  },
  toCenter: function () {
    wx.redirectTo({
      url: '../page_026/page_026',
    });
  }
})