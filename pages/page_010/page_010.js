var app = getApp();
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
    catagaryimg:'../image/tabbar/5.png',
    loginimg:'../image/tabbar/3.png'
   
  },
  clickImg:function(){
    wx.navigateTo({
      url: '../page_001/page_001',
    })
  },
  onPullDownRefresh:function(){
    
  },
  onLoad: function () {
    
  },
  toIndex:function(){
     let refer = this;
     refer.setData({
       indeximg:'../image/tabbar/1.png',
       catagaryimg: '../image/tabbar/5.png',
       loginimg: '../image/tabbar/3.png'
     });
     wx.redirectTo({
       url: '../index/index',
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
