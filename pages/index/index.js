//index.js
//获取应用实例
const app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //微信登录
  webchatLogin: function(e){
    util.showBusy('正在登录');
    //登录
    wx.login({
      success: res => {
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //调用获取用户信息接口
          wx.getUserInfo({
            success: function (resu) {
              //console.log({ encryptedData: resu.encryptedData, iv: resu.iv,                   code: res.code })
              //解密用户信息
              wx.request({
                url: 'https://aisss5ct.qcloud.la/Emp/mobile/login/login',
                method: 'POST',
                header: {
                  "Content-Type": "application/json"
                },
                data: {
                  code: res.code,
                  encrypteData: resu.encryptedData,
                  iv: resu.iv
                },
                success: function (res) {
                  util.showSuccess('登录成功');
                  //console.log(res);
                  //关闭当前页面，跳转到page_001页面
                  wx.navigateTo({
                    url: '../page_001/page_001',
                  })
                }
              })
            },
            fail: function () {
              util.showModel('请求失败', error);
              console.log('获取用户信息失败')
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  }
})
