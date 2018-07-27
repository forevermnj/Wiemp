var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
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
      }
    ],
    headImage: wx.getStorageSync('headImage'),
    nickName: wx.getStorageSync('nickName'),
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png',
    recordimg:'../image/tabbar/15.png',
    flag1:false,
    recordurl:''
  },
  clickImg: function () {
    wx.redirectTo({
      url: '../page_001/page_001',
    })
  },
  onPullDownRefresh: function () {

  },
  onLoad: function () {
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
  toRecordEnd:function(){
    let refer = this;
    //结束录音  
    wx.stopRecord();
    refer.setData({
      recordimg: '../image/tabbar/15.png',
      flag1: false
    })
  },
  toRecordStart:function(){
    let refer = this;
    refer.setData({
      recordimg:'../image/tabbar/19.gif',
      flag1:true
    })
    //  发起授权
    wx.authorize({
      scope: 'scope.record',
      success() {
        //let recordManager = wx.getRecorderManager();
        wx.startRecord({
          success: function (res) {
            console.log('录音');
            var tempFilePath = res.tempFilePath;
            wx.playVoice({
              filePath: tempFilePath,
              complete: function () {
              }
            })
          },
        })
    
      }, fail() {
        resolve(1)
      }
    })


    
  },
  toIndex: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/1.png',
      catagaryimg: '../image/tabbar/5.png'
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  },
  toPrevious: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/2.png'
    });
    wx.redirectTo({
      url: '../page_015/page_015',
    });
  }
})
