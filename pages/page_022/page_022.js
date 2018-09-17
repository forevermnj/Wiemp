
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
    app.globalData.regtel = e.detail.value;
  },
  toUserNameInput:function(e){
    app.globalData.reguserName = e.detail.value;
  },
  toDepartMentInput:function(e){
    app.globalData.regdepartMent = e.detail.value;
  },
  toPasswordInput:function(e){
    app.globalData.regpassWord = e.detail.value;
  },
  toEmailInput:function(e){
    app.globalData.regemail = e.detail.value;
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
  toNext:function(){
    let refer = this;
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (app.globalData.regtel==''){
       refer.toTip('手机号不能为空');
       return
    } else if (app.globalData.regtel.length<11){
      refer.toTip('手机号长度有误');
      return
    } else if (!myreg.test(app.globalData.regtel)){
      refer.toTip('手机号有误');
      return
    }
    if (app.globalData.reguserName==''){
      refer.toTip('用户名不能为空');
      return
    }
    if (app.globalData.passWord==''){
      refer.toTip('密码不能为空');
      return
    }

    wx.redirectTo({
      url: '../page_023/page_023',
    })
  }
  
  
})