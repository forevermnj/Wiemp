var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
     imgdata:[
       { url: '../image/tabbar/32.png'},
       { url: '../image/tabbar/33.png'},
       { url: '../image/tabbar/34.png'},
       { url: '../image/tabbar/35.png'},
       { url: '../image/tabbar/37.png' },
       { url: '../image/tabbar/38.png' },
       { url: '../image/tabbar/39.png' },
       { url: '../image/tabbar/40.png' },
       { url: '../image/tabbar/41.png' },
       { url: '../image/tabbar/42.png' }
     ],
     headimg:'../image/tabbar/36.png',
     indeximg: '../image/tabbar/2.png',
     catagaryimg: '../image/tabbar/5.png',
     loginimg: '../image/tabbar/31.png',
     center: '../image/tabbar/3.png',
     userheadimg: wx.getStorageSync('headImage')
     
  },
  toMyCourse:function(){
    wx.redirectTo({
      url: '../page_027/page_027',
    });
  },
  toSelectCourse:function(){
    wx.redirectTo({
      url: '../page_028/page_028',
    });
  },
  toAddCourse:function(){
    wx.redirectTo({
      url: '../page_029/page_029'
    });
  },
  onLoad: function () {
    console.log('=====' + wx.getStorageSync('headImage'));
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