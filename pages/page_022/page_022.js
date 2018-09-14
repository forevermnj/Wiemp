
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
     tel:'',
     userName:'',
     departMent:'',
     passWord:'',
     email:''
  },
  onLoad: function () {

  },
  toTelinput:function(e){
    let refer = this;
    refer.setData({
      tel: e.detail.value
    })
  },
  toUserNameInput:function(e){
    let refer = this;
    refer.setData({
      userName: e.detail.value
    })
  },
  toDepartMentInput:function(e){
    let refer = this;
    refer.setData({
      departMent: e.detail.value
    })
  },
  toPasswordInput:function(e){
    let refer = this;
    refer.setData({
      passWord: e.detail.value
    })
  },
  toEmailInput:function(e){
    let refer = this;
    refer.setData({
      email: e.detail.value
    })
  },
  toLogin:function(){
    wx.redirectTo({
      url: '../page_005/page_005',
    })
  },
  toTip:function(tit){
    wx.showToast({
      title: tit,
      image:'../image/tabbar/25.png',
      duration: 2000
    })
  },
  toRegister:function(){
    let refer = this;
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if(refer.data.tel==''){
       refer.toTip('手机号不能为空');
       return
    } else if (refer.data.tel.length<11){
      refer.toTip('手机号长度有误');
      return
    } else if (!myreg.test(refer.data.tel)){
      refer.toTip('手机号有误');
      return
    }
    if(refer.data.userName==''){
      refer.toTip('用户名不能为空');
      return
    }
    if(refer.data.passWord==''){
      refer.toTip('密码不能为空');
      return
    }

    wx.redirectTo({
      url: '../page_023/page_023',
    })


    // wx.request({
    //   url: app.globalData.serverUrl + '/Emp/mobile/register/register',
    //   method: 'POST',
    //   header: {
    //     "Content-Type": "application/json"
    //   },
    //   data: {
    //     code: refer.data.passWord,
    //     phone: refer.data.tel,
    //     userName:refer.data.userName,
    //     deparment:refer.data.deparment,
    //     email:refer.data.email
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     if (res.data.code == 1){
    //       wx.showModal({
    //         title: '提示',
    //         content: res.data.result,
    //         success: function (res) {
    //           if (res.confirm) {
    //             console.log('用户点击确定')
    //             wx.redirectTo({
    //               url: '../page_005/page_005',
    //             })
    //           } else if (res.cancel) {
    //             console.log('用户点击取消')
    //           }
    //         }
    //       })
    //     }
    //     if (res.data.code == 2) {
    //       refer.toTip(res.data.result);
    //     }
    //     if (res.data.code == 0) {
    //       refer.toTip(res.data.result);
    //     }
    //   }
    // })
  }
  
  
})