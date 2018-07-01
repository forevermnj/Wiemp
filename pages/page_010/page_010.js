Page({
  data: {
    list1: [
      {
        pic: '../image/page_test/1.png',
        title: '背单词'
      }, {
        pic: '../image/page_test/1.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_test/1.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_test/1.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_test/1.png',
        title: '敬请期待'
      }
    ],
    list2: [
      {
        pic: '../image/page_test/2.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_test/2.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_test/2.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_test/2.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_test/2.png',
        title: '敬请期待'
      }
    ],
    list3: [
      {
        pic: '../image/page_test/3.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_test/3.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_test/3.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_test/3.png',
        title: '敬请期待'
      }, {
        pic: '../image/page_test/3.png',
        title: '敬请期待'
      }
    ]
  },
  clickImg:function(){
    wx.navigateTo({
      url: '../page_001/page_001',
    })
  }
})
