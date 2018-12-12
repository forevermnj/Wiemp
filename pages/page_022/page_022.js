
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
     tel:'',
     userName:'',
     departMent:'',
     passWord:'',
     email:'',
     tutor:'',
     tutorData:[]
  },
  tutorChange:function(e){
    let refer = this;
    let tutor = e.detail.value;
    console.log(refer.data.tutorData[tutor[0]].name);
    app.globalData.regtutor = refer.data.tutorData[tutor[0]].name;
    refer.setData({
      tutor: refer.data.tutorData[tutor[0]].name
    })
  },
  setModalStatus: function (e) {
    //console.log("设置显示状态，1显示0不显示", e.currentTarget.dataset.status);
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  },
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/admin/getTutor',
      method: 'GET',
      success: function (res) {
        refer.setData({
          tutorData: res.data
        });
      }
    });
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
      icon:'none',
      mask:true,
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
    if (app.globalData.regpassWord==''){
      refer.toTip('密码不能为空');
      return
    }

    /**
     * 校验手机号是否被注册
     */
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/register/checkPhone',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        phone: app.globalData.regtel
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.redirectTo({
            url: '../page_023/page_023',
          })
        }else{
          refer.toTip(res.data.result);
        }
      }
    })
    
  }
  
  
})