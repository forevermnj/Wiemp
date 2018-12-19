var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    previousimg: '../image/tabbar/13.png'
  },
  formSubmit:function(e){
    let oldPwd = e.detail.value.oldPwd;
    let newPwd = e.detail.value.newPwd;
    let confirmPwd = e.detail.value.ConfirmPwd;
    if(oldPwd == ""){
      wx.showModal({
        title: '提示',
        content: '原密码为空，请输入确认密码'
      });
    }
    if (newPwd == "") {
      wx.showModal({
        title: '提示',
        content: '新密码为空，请输入确认密码'
      });
      return;
    }
    if (confirmPwd=="") {
      wx.showModal({
        title: '提示',
        content: '确认密码为空，请输入确认密码'
      });
      return;
    }
    if (newPwd.length<6){
      wx.showModal({
        title: '提示',
        content: '新密码长度小于６位，请重新输入'
      });
      return;
    }
    if (newPwd == oldPwd) {
      wx.showModal({
        title: '提示',
        content: '原密码与新密码相同，请重新输入'
      });
      return;
    }
    if (newPwd != confirmPwd) {
      wx.showModal({
        title: '提示',
        content: '确认密码与新密码不一致，请重新输入'
      });
      return;
    }
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/updatePwd/updateLoginPwd',
      method:'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        oldPwd: oldPwd,
        newPwd: newPwd,
        id: wx.getStorageSync("uid")
      },
      success: (res)=>{
        if(res.data == "0"){
          wx.showModal({
            title: '提示',
            content: '原密码不正确，请重新输入'
          });
        }else if(res.data=="1"){
          wx.setStorageSync("pwd", newPwd);
          wx.showModal({
            title: '提示',
            content: '密码更新成功，请重新登录',
            showCancel: false,
            success:(r)=>{
               wx.redirectTo({
                 url: '../page_005/page_005'
               });
            }
          });
        }else if(res.data=="2"){
          wx.showToast({
            title:"密码更新失败，请稍后再试",
            icon: 'none'
          })
        }

      }
    })
  },
  toPrevious: function(){
    wx.redirectTo({
      url: '../page_031/page_031',
    })
  }
});