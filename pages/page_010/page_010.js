Page({
  data: {
    list1: [
      {
        pic: '../image/page_010/1.png',
        title: '背单词'
      }, {
        pic: '../image/page_010/2.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_010/3.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_010/4.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_010/5.png',
        title: '敬请期待'
      }
    ],
    list2: [
      {
        pic: '../image/page_010/6.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_010/7.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_010/8.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_010/9.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_010/10.png',
        title: '敬请期待'
      }
    ],
    list3: [
      {
        pic: '../image/page_010/11.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_010/11.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_010/11.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_010/11.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_010/11.png',
        title: '敬请期待'
      }
    ],
    headImage: wx.getStorageSync('headImage'),
    nickName: wx.getStorageSync('nickName')
  },
  clickImg:function(){
    wx.navigateTo({
      url: '../page_001/page_001',
    })
  },
  onPullDownRefresh:function(){
    
  }
})
