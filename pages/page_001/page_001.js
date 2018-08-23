
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words_account: '0',
    indeximg: '../image/tabbar/2.png',
    catagaryimg: '../image/tabbar/5.png',
    loginimg: '../image/tabbar/3.png',
    bearwordimg: '../image/tabbar/8.png',
    task: 'done' //done, not_yet
  },

  exercise: function (event) {
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/wordexam/isAllPass/' + wx.getStorageSync('uid'),
      method: 'GET',
      success: function (res) {
         if(res.data){
           wx.redirectTo({
             url: '../page_002/page_002'
           })
         }else{
           wx.redirectTo({
             url: '../page_008/page_008'
           })
         }
      }
    })
   
  },

  linktowordlist: function (event) {
    wx.redirectTo({
      url: '../page_003/page_003'
    })
  },

  linktocalendar: function (event) {
    wx.redirectTo({
      url: '../page_004/page_004'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showBusy('加载中...');
    let refer = this;
    let uid = wx.getStorageSync('uid');
    let today = new Date();//当前时间  
    let y = today.getFullYear();
    let mon = today.getMonth() + 1;
    let ym = y + '-' + (mon < 10 ? "0" + mon : mon);
    let rtemp = new Array();
   /**
    * 先检查任务是否过期
    */
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/checkTask/whetherExpire/' + uid,
      method: 'GET',
      success: function (resz) {
        //console.log(resz.data);
        rtemp = resz.data.endDate.split("-");
        //console.log(rtemp);
        //年份过期
        if (parseInt(rtemp[0]) < parseInt(y)){
          wx.showModal({
            title: '提示',
            content: '您的任务已过期',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../page_010/page_010',
                });
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '../page_010/page_010',
                });
              }
            }
          });
          return;
        }
        if (parseInt(rtemp[1]) < parseInt(mon)){
          wx.showModal({
            title: '提示',
            content: '您的任务已过期',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../page_010/page_010',
                });
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '../page_010/page_010',
                });
              }
            }
          });
          return;
        }
        //月份过期
      }
    })


    
    //已完成单词
    wx.request({
      url: app.globalData.serverUrl+'/Emp/mobile/bearword/doneWordCount/' + uid,
      method: 'GET',
      success: function (resz) {
        //console.log(resz.data);
        refer.setData({
          words_account: resz.data.totaldone
        })
      }
    })
    //打卡状态
    wx.request({
      url: app.globalData.serverUrl+'/Emp/mobile/bearword/whetherDoneHitCard/' + uid,
      method: 'GET',
      success: function (resz) {
        //console.log(resz.data);
        var taskstatus = 'not_yet';
        if (resz.data.taskstatus == '1') {
          taskstatus = 'done'
        }
        refer.setData({
          task: taskstatus
        })
      }
    })
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
    // wx.redirectTo({
    //   url: '../page_010/page_010',
    // });
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
      indeximg: '../image/tabbar/1.png',
      bearwordimg: '../image/tabbar/7.png'
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  }
})