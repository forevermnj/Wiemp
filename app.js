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
  toForceUpdate:function(){
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      });
    });
  },
  globalData: {
    serverUrl:'https://www.learnzp.com',//服务器地址
    easyError:'',
    easyErrorId: '',
    backImgIndex:0,//page_012页面全局参数
    backMp3Index: 0,//page_012页面全局参数
    chooseDataIndex:0,//page_013页面全局参数
    mp3dataIndex:0,//page_013页面全局参数
    dataIndex:0,//page_014页面全局参数
    anwdataIndex:0,//page_014页面全局参数
    mp3dataIndex2:0,//page_015页面全局参数
    rdataIndex:0,//page_016页面全局参数
    examFlag:false,//单词考试数据加载失败

    dropLetId:-1,//page_010页面全局参数
    dropLetConfigTypeId:-1,//page_010页面全局参数
    relaDropLetId:-1,//page_021页面全局参数
    uid:'020b28e556de4352a231650c1637653c'//测试用户ID
  }
})