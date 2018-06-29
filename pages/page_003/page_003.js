
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startx: 0,
    sortorder: "descend", //ascend|descend
    buttonname: "时间倒序", //时间顺序|时间倒序
    wordlist: []//后台数据需按照时间倒序排序
  },
  //example.js
  submitInfo: function (e) {
    console.log(e.detail.formId);
    var value1 = wx.getStorageSync('openId');
    wx.request({
      url: app.globalData.serverUrl+'/Emp/mobile/templete/message',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        touser: value1,
        template_id: 'GLLVC6wsdPwZtACiSuqGiCuw1n8372dDeVxRpKn-oJk',
        form_id: e.detail.formId
      },
      success: function (resz) {
        //util.showSuccess('加载成功');
        console.log(resz);
        //关闭当前页面，跳转到page_001页面
        wx.navigateTo({
          //url: '../page_001/page_001',
        })
      }
    })
  },
  changeorder: function () {
    var original = this.data.wordlist;
    var arraylength = original.length;
    var converted = new Array(arraylength);

    for (var i = arraylength - 1, j = 0; j < arraylength; i-- , j++) {
      converted[j] = original[i];
    }
    
    if (this.data.sortorder == "descend") {
      this.setData({
        sortorder: "ascend",
        buttonname: "时间顺序",
        wordlist: converted
      })
    } else if (this.data.sortorder == "ascend") {
      this.setData({
        sortorder: "descend",
        buttonname: "时间倒序",
        wordlist: converted
      })
    }
    //console.log(this.data.wordlist)
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    var refer = this;
    wx.setNavigationBarTitle({
      title: '易错单词'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#43CF7C'
    })
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.globalData.serverUrl+'/Emp/mobile/easymistake/query/' + uid,
      method: 'GET',
      success: function (res) {
        refer.setData({
          wordlist: res.data.rows
        });
      }
    })

  },
  //手指滑动开始
  mytouchstart: function (event) {
    this.setData({
      startx: event.touches[0].pageX
    });
  },
  mytouchend: function (e) {
    let refer = this;
    let distancex = e.changedTouches[0].pageX - refer.data.startx;
    let temp2 = e.currentTarget.dataset.text;
    let ew2 = temp2.split(",");
    if (distancex < 0) {
      wx.request({
        url: app.globalData.serverUrl + '/Emp/mobile/wordexam/delEasyErrorWord/' + ew2[2],
        method: 'GET',
        success: function (res) {
          let uid = wx.getStorageSync('uid');
          wx.request({
            url: app.globalData.serverUrl + '/Emp/mobile/easymistake/query/' + uid,
            method: 'GET',
            success: function (res) {
              refer.setData({
                wordlist: res.data.rows
              });
            }
          })
        }
      })
    }
  },
  viewDetail: function(e){
    let temp = e.currentTarget.dataset.text;
    let ew = temp.split(",");
    app.globalData.easyError = ew[0];
    app.globalData.easyErrorId = ew[1];
    console.log(e.changedTouches[0].pageX);
    wx.redirectTo({
        url: '../page_009/page_009',
    });
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})