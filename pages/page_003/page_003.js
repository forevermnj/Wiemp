
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTouchMove:'',
    startX: 0, //开始坐标
    startY: 0,
    sortorder: "descend", //ascend|descend
    buttonname: "时间倒序", //时间顺序|时间倒序
    wordlist: []//后台数据需按照时间倒序排序
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
          wordlist: res.data.rows,
          isTouchMove: false //默认全隐藏删除
        });
      }
    });
  },
  viewDetail: function(e){
    let temp = e.currentTarget.dataset.text;
    let ew = temp.split(",");
    app.globalData.easyError = ew[0];
    app.globalData.easyErrorId = ew[1];
    console.log(e.changedTouches[0].pageX);
    wx.navigateTo({
        url: '../page_009/page_009',
    });
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.wordlist.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    });
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      wordlist: this.data.wordlist
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
    that.data.wordlist.forEach(function (v, i) {
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
      wordlist: that.data.wordlist
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
  //删除事件
  del: function (e) {
    let refer = this;
    refer.data.wordlist.splice(e.currentTarget.dataset.index, 1)
    refer.setData({
      wordlist: this.data.items
    });
    let temp2 = e.currentTarget.dataset.text;
    let ew2 = temp2.split(",");
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