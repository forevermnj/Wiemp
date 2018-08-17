var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    list2: [
      {
        pic: app.globalData.serverUrl+'/Emp/mobile/page_011/1.png',
        title: 'Listening'
      }, {
        pic: app.globalData.serverUrl +'/Emp/mobile/page_011/2.png',
        title: 'Speaking'
      }, {
        pic: app.globalData.serverUrl +'/Emp/mobile/page_011/3.png',
        title: 'Meeting'
      }, {
        pic: app.globalData.serverUrl +'/Emp/mobile/page_011/4.png',
        title: 'Vocabulary'
      }
    ],
    headImage: wx.getStorageSync('headImage'),
    nickName: wx.getStorageSync('nickName'),
    indeximg: '../image/tabbar/2.png',
    catagaryimg: '../image/tabbar/5.png',
    bgimg: app.globalData.serverUrl +'/Emp/mobile/page_011/5.png',
    startIndex:0,
    endIndex:0,
    bgimg2:[
      {urlimg:app.globalData.serverUrl + '/Emp/mobile/page_011/6.png'},
      {urlimg:app.globalData.serverUrl + '/Emp/mobile/page_011/7.png'},
      {urlimg:app.globalData.serverUrl + '/Emp/mobile/page_011/8.png'}
    ],
    sindex:0
  },
  clickImg: function () {
    wx.redirectTo({
      url: '../page_012/page_012',
    })
  },
  touchstart:function(e){
    let refer = this;
    refer.setData({
      startIndex: e.changedTouches[0].pageX
    })
    
  },
  touchend:function(e){
    let refer = this;
    console.log(refer.data.sindex);
    refer.setData({
      endIndex: e.changedTouches[0].pageX
    })
   
    if ((refer.data.endIndex - refer.data.startIndex) < 0 && refer.data.sindex<=2){
        refer.setData({
          bgimg: refer.data.bgimg2[refer.data.sindex].urlimg,
          sindex: refer.data.sindex + 1
        })
        if (refer.data.sindex==3){
            refer.setData({
              sindex:2
            })
        }
    } 
    if ((refer.data.endIndex - refer.data.startIndex) > 0 && refer.data.sindex >= 0){
      
      refer.setData({
        bgimg: refer.data.bgimg2[refer.data.sindex].urlimg,
        sindex: refer.data.sindex - 1
      })
      
    }
    if (refer.data.sindex == -1) {
      refer.setData({
        bgimg: app.globalData.serverUrl + '/Emp/mobile/page_011/5.png',
        sindex:0
      })
    }
  },
  onPullDownRefresh: function () {

  },
  onLoad: function () {
    util.showBusy('加载中...');
    app.globalData.backImgIndex = 0;//page_012页面全局参数
    app.globalData.backMp3Index = 0;//page_012页面全局参数
    app.globalData.chooseDataIndex = 0;//page_013页面全局参数
    app.globalData.mp3dataIndex = 0;//page_013页面全局参数
    app.globalData.dataIndex = 0;//page_014页面全局参数
    app.globalData.anwdataIndex = 0;//page_014页面全局参数
    app.globalData.rdataIndex = 0;//page_016页面全局参数
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
  toIndex: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/2.png',
      catagaryimg: '../image/tabbar/5.png'
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  },
  toCatagary: function () {
    let refer = this;
    refer.setData({
      catagaryimg: '../image/tabbar/6.png',
      indeximg: '../image/tabbar/2.png'
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  }
})
