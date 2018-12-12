var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backimg: '../image/tabbar/13.png',
    downImage: '../image/tabbar/39.png',
    upImage: '../image/tabbar/40.png',
    showDropItem: true,
    selectOption: {},
    itemList:[],
    stateList: [{id:"", name:"--Option--"},{id:"1", name:"在线课程"}, {id:"0", name:"离线课程"}],
    selectedState: "", //选中的course state的 id
    selectedType: "", //选中的course Type的id
    showTypeDrop: false, 
    showStateDrop: false
  },

  onLoad: function () {
    let refer = this;
    refer.loadCourseType();
  },

  loadCourseType:function(){
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/firstCategory/getFirstCategory',
      method: "GET",
      success: function(res){
        let list = [{id:"", name:"--Option--" , index:""}];
        for(let i=0; i<res.data.list.length; i++){
          if (res.data.list[i].fircatname != "SmartTools"){
            res.data.list[i].name = res.data.list[i].fircatname; //传向组件Select的数组元素必须包含属性name
            list.push(res.data.list[i]);
          }
        }
        refer.setData({
          selectOption : list[0],
          itemList : list
        });
      }
    });
  },

  // 跳回我的
  toBack: function(){
    wx.redirectTo({
      url: '../page_026/page_026',
    })
  },

  //获取在组件中选择的course Type
  getType: function(e){
    this.setData({
      selectedType : e.detail.id
    });
  },

  //获取在组件中选择的course state
  getState: function (e) {
    this.setData({
      selectedState: e.detail.id
    });
  },

  //隐藏下拉框 
  hideDropDown: function(){
    this.setData({
      showTypeDrop: false,
      showStateDrop: false
    });
  },

  //显示type下拉框
  showType: function(){
    this.setData({
      showStateDrop: false
    });
  },

  //显示State 下拉框
  showState: function () {
    this.setData({
      showTypeDrop: false
    });
  },

  formSubmit: function(e){
    let refer = this;
    if (e.detail.value.courseName == ''){
      wx.showToast({
        title: "Please enter Course Name",
        icon: 'none'
      });
      return;
    }
    if (this.data.selectedType == '') {
      wx.showToast({
        title: "Please enter Course Type",
        icon: 'none'
      });
      return;
    }
    if (this.data.selectedState == '') {
      wx.showToast({
        title: "Please enter Course State",
        icon: 'none'
      });
      return;
    }
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/courseApply/addCourse',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data:{
        coursename: e.detail.value.courseName,
        coursefirstleveltype: refer.data.selectedType,
        coursestate: refer.data.selectedState,
        coursedescribe: e.detail.value.courseDescribe,
        applyuserid: wx.getStorageSync('uid')
      },
      success: function(res){
        if(res.data.state == 2){ //2已存在 1添加成功 0失败
            wx.showToast({
              title: 'The Course has existed',
              icon:'none'
            });
        }else if(res.data.state == '1'){
          wx.showToast({
            title: 'Added successfully, wait Approve',
            icon: 'none',
            duration: 2000,
            success: function(){
              wx.redirectTo({
                url: '../page_026/page_026',
              });
            }
          });
        } else if (res.data.state == '0'){
          wx.showToast({
            title: 'Add Failed',
            icon: 'none'
          });
        }
      }
    });
  }
})