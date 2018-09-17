
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tel:'',
     code:'',
     globalUserName:'',
     globalPassWord:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let refer = this;
    refer.setData({
      globalUserName: app.globalData.userName,
      globalPassWord: app.globalData.pwd
    })
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
    let refer = this;
    let openId = wx.getStorageSync('openId');
    let nickName = wx.getStorageSync('nickName');
    app.globalData.userName = refer.data.tel;
    app.globalData.pwd = refer.data.code;
    console.log('openid' + openId + '用户昵称' + nickName + '登录名' + app.globalData.userName + '登录密码' + app.globalData.pwd);
    util.showBusy('登录中...');
    
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/login/login2',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        code: refer.data.globalUserName != '' ? refer.data.globalUserName:refer.data.code,
        tel: refer.data.globalPassWord != '' ? refer.data.globalPassWord:refer.data.tel,
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
  toRegister:function(){
    wx.redirectTo({
      url: '../page_022/page_022',
    })
  }
})