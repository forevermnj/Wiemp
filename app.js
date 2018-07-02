//app.js
var util = require('/utils/util.js');

App({
  //当小程序启动时执行
  onLaunch: function () {
    //登录
    wx.login({
      success: res => {
        //发送 res.code 到后台换取 openId, sessionKey
        if (res.code) {
          //调用获取用户信息接口
          wx.getUserInfo({
            success: function (resu) {
              //console.log({ encryptedData: resu.encryptedData, iv: resu.iv, code: res.code })
              //解密用户信息
              wx.request({
                url: 'https://www.learnzp.com/Emp/mobile/login/login',
                method: 'POST',
                header: {
                  "Content-Type": "application/json"
                },
                data: {
                  code: res.code,
                  encrypteData: resu.encryptedData,
                  iv: resu.iv
                },
                success: function (resz) {
                  //将openid存入缓存中
                  wx.setStorage({
                    key: "openId",
                    data: resz.data.userInfo.openId
                  });
                  //将用户昵称存入缓存中
                  wx.setStorage({
                    key: 'nickName',
                    data: resz.data.userInfo.nickName
                  });
                  //将用户头像存入缓存中
                  wx.setStorage({
                    key: 'headImage',
                    data: resz.data.userInfo.avatarUrl
                  });
                }
              })
            },
            fail: function (error) {

            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    serverUrl:'https://www.learnzp.com',//服务器地址
    easyError:'',
    easyErrorId: '',
    uid:'020b28e556de4352a231650c1637653c'//测试用户ID
  }
})