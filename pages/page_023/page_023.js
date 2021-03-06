
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTouchMove: '',
    startX: 0, //开始坐标
    startY: 0,
    courseData: [],
    courseID:'',
    ifsubmit:false,
    progress: 0,
    loginimg: '../image/tabbar/3.png'
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getCourse/getCourse/',
      method: 'GET',
      success: function (res) {
        refer.setData({
          courseData: res.data
        });
      }
    });
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.courseData.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    });
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      courseData: this.data.courseData
    });
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.courseData.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    });
    //更新数据
    that.setData({
      courseData: that.data.courseData
    });
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //选择事件
  toSelect: function (e) {
    let refer = this;
    let index = e.currentTarget.dataset.index;
    refer.data.courseData[index].selected = true;
    refer.setData({
      courseData: refer.data.courseData
    });
  },
  //取消事件
  toCancel: function (e) {
    let refer = this;
    let index = e.currentTarget.dataset.index;
    refer.data.courseData[index].selected = false;
    refer.setData({
      courseData: refer.data.courseData
    });
  },
  toLogin: function () {
    wx.redirectTo({
      url: '../page_005/page_005',
    });
  },
  toRegister:function(){
    let refer = this;
    refer.progress();
    refer.setData({
      ifsubmit:true
    })
    let courseid = refer.getCourseID();
    // if(refer.data.courseID==''){
    //   wx.showToast({
    //     title: '请选择课程',
    //     image: '../image/tabbar/25.png',
    //     duration: 2000
    //   })
    //   return
    // }
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/register/register',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        code: app.globalData.regpassWord,
        phone: app.globalData.regtel,
        userName: app.globalData.reguserName,
        deparment: app.globalData.regdepartMent,
        email: app.globalData.regemail,
        courseid: courseid,
        tutor: app.globalData.regtutor
      },
      success: function (res) {
        //重置选择的课程数据
        refer.data.courseID = '';
        if (res.data.code != 0){
          wx.showModal({
            title: '提示',
            content: res.data.result,
            success: function (res) {
              refer.setData({
                progress:100
              })
              if (res.confirm) {
                wx.redirectTo({
                  url: '../page_005/page_005',
                })
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '../page_005/page_005',
                })
              }
            }
          })
        }
        if (res.data.code == 2) {
          refer.toTip(res.data.result);
        }
        if (res.data.code == 0) {
          refer.toTip(res.data.result);
        }
      }
    })
  },
  //获取选择的课程的ID
  getCourseID:function(){
    let refer = this;
    for (let i = 0; i < refer.data.courseData.length;i++){
       //如果被选中
       if(refer.data.courseData[i].selected){
         if (refer.data.courseID==''){
            refer.data.courseID = refer.data.courseData[i] .courseID;
          }else{
            refer.data.courseID = refer.data.courseID + "," +    refer.data.courseData[i].courseID;
          }
       }
    }
    return refer.data.courseID;
  },
  progress:function(){
    let refer = this;
    if (refer.data.progress >= 100) {
      // this.setData({
      //   disabled: false
      // });
      return true;
    }
    refer.setData({
      progress: ++refer.data.progress
    });
    setTimeout(function () {
      refer.progress();
    }, 20);
  }
})