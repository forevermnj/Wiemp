
Page({

 
  data: {
     imgdata:[
       { url: '../image/tabbar/32.png'},
       { url: '../image/tabbar/33.png'},
       { url: '../image/tabbar/34.png'},
       { url: '../image/tabbar/35.png'},
       { url: '../image/tabbar/37.png' }
     ],
     headimg:'../image/tabbar/36.png',
     indeximg: '../image/tabbar/2.png',
     catagaryimg: '../image/tabbar/5.png',
     loginimg: '../image/tabbar/31.png',
     center: '../image/tabbar/3.png'
     
  },
  toMyCourse:function(){
    wx.redirectTo({
      url: '../page_027/page_027',
    });
  },
  onLoad: function () {

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