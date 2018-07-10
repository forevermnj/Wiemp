
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tel:'',
     code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    /**
     * 移除指定缓存数据
     */
    wx.removeStorageSync("wordidlist");
    wx.removeStorageSync("wordlist");
    wx.removeStorageSync("totalaccount");
    wx.removeStorageSync("uid");

    //清理本地缓存
    wx.clearStorage();
  },
  //获取用户输入的手机号
  telInput: function (e) {
    var refer = this;
    refer.setData({
      tel: e.detail.value
    })
  },
  //获取用户输入的密码
  pwdInput: function (e) {
    var refer = this;
    refer.setData({
      code: e.detail.value
    })
  },
  clogin: function (){
    var openId = wx.getStorageSync('openId');
    var nickName = wx.getStorageSync('nickName');
    util.showBusy('登录中...');
    var refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/login/login2',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        code: refer.data.code,
        tel: refer.data.tel,
        openid: openId,
        nickName: nickName
      },
      success: function (res) {
        if (res.data.result == '0') {
          //将用户ID存入缓存中
          wx.setStorage({
            key: "uid",
            data: res.data.uid
          });
          util.showSuccess('加载成功');
          wx.redirectTo({
            url: '../page_010/page_010',
          })
        } else {
          util.showSuccess('登录失败');
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  }
})