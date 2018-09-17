
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tel:'',
     code:'',
     storagetel:'',
     storagecode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let refer = this;
    /**
     * 移除指定缓存数据
     */
    wx.removeStorageSync("wordidlist");
    wx.removeStorageSync("wordlist");
    wx.removeStorageSync("totalaccount");
    wx.removeStorageSync("uid");

    refer.setData({
      storagetel: wx.getStorageSync('userName'),
      storagecode: wx.getStorageSync('pwd')
    });

  },
  //获取用户输入的手机号
  telInput: function (e) {
    let refer = this;
    refer.setData({
      tel: e.detail.value
    });
  },
  //获取用户输入的密码
  pwdInput: function (e) {
    let refer = this;
    refer.setData({
      code: e.detail.value
    });
  },
  clogin: function (){
    let refer = this;
    let openId = wx.getStorageSync('openId');
    let nickName = wx.getStorageSync('nickName');
    if (refer.data.tel!=''){
      //将登录名存入缓存中
      wx.setStorageSync("userName", refer.data.tel);
      
    }
    if (refer.data.code!=''){
      //将登录密码存入缓存中
      wx.setStorageSync("pwd", refer.data.code);
    }
    
    // console.log('登录名' + wx.getStorageSync('userName') + '登录密码' + wx.getStorageSync('pwd'));
    util.showBusy('登录中...');
    
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/login/login2',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        code: wx.getStorageSync('pwd') != '' ? wx.getStorageSync('pwd'):refer.data.code,
        tel: wx.getStorageSync('userName') != '' ? wx.getStorageSync('userName'):refer.data.tel,
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