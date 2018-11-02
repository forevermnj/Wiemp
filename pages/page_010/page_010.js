var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    fistData: [],
    score:'',
    starUrl:'../image/tabbar/26.png',
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
    let csv4 = e.currentTarget.dataset.hi[4];
    app.globalData.dropLetId = csv1;
    app.globalData.dropLetConfigTypeId = csv2;
    app.globalData.index = csv3;

    if (csv4){
      wx.redirectTo({
        url: csv0,
      });
    }else{
      wx.showToast({
        title: '无权限',
        image: '../image/tabbar/30.png',
        duration: 500
      })
    }
  },
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getIndexData/getIndexData/' + wx.getStorageSync('uid'),
      method: 'GET',
      success: function (res) {
        refer.setData({
          fistData: res.data.list,
          score:res.data.score
        })
      }
    })
    util.showBusy('加载中...');
  },
  onReady: function () {
    util.showSuccess('加载成功');
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
