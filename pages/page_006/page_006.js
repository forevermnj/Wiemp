// pages/page_006/page_006.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startx: 0,
    wordIndex: 0,
    myanswer: [],
    wordList: [
      {
        word: "dub",
        pronounce: "[dʌb]",
        options: [
          'abbr.  Dutch 荷兰的',
          'vt.（以剑触肩）封…为爵士',
          'n.  鸭子',
          'n.（美）钱，元'
        ],
        correct: '1'
      }
    ],
    status: 'failed', // success, failed
    score: 0,
    wordAccount: 2,
    startTime: '',
    elapse: '', //less than 1 minute show second
    showDialog: false
  },

  touchstart: function (e) {
    //console.log("dd"+e.touches[0].pageX);
    this.setData({
      startx: e.touches[0].pageX
    })
  },
  touchmove: function (e) {

  },
  touchend: function (e) {
    var distancex = e.changedTouches[0].pageX - this.data.startx;
    var wi = this.data.wordIndex;
    //console.log('touchend')
    //update word index
    if (distancex < 0 && this.data.myanswer[this.data.wordIndex] != "-1") {  //allow move left only
      if (wi >= this.data.wordList.length - 1) {  //popup result when last word
        var rate = this.ratio();
        var percent = Math.round(rate * 100);
        var date2 = new Date();

        var elapseTime = (date2.getTime() - this.data.startTime.getTime()) / 1000;
        var elapseStr = "";
        if (elapseTime < 60) {
          elapseStr = Math.round(elapseTime) + "秒";
        } else {
          elapseStr = Math.round(elapseTime / 60) + "分钟";
        }
        this.setData({
          score: percent,
          showDialog: true,
          elapse: elapseStr
        })
        //console.log(rate + "|" + elapseTime);
        if (rate >= 0.9) {
          this.setData({
            status: 'success'
          })
        } else {
          this.setData({
            status: 'failed'
          })
        }
      } else {  //next word
        wi++;
        this.setData({
          wordIndex: wi
        })
      }
    }
  },

  ratio: function () {
    var count = 0;
    var wordCount = this.data.wordList.length;
    for (var i = 0; i < wordCount; i++) {
      if (this.data.wordList[i].correct == this.data.myanswer[i]) {
        count++;
      }
    }
    return count / wordCount;
  },

  //choose the right answer
  chooseAnswer: function (e) {
    var distancex = e.changedTouches[0].pageX - this.data.startx;
    
    //console.log('choose answer');
    var aswArray = this.data.myanswer;
    //如果用户还没有选择答案
    if (aswArray[this.data.wordIndex] == "-1") {  //only allow user to select once
      //标记指定下标单词已被用户选择
      aswArray[this.data.wordIndex] = e.currentTarget.dataset.optionsindex;
      this.setData({
        myanswer: aswArray
      })
    }
  },
  mask: function () {
    // do nothing than mask the tap event
    // console.log('mask');
  },
  iknow: function () {
    wx.navigateTo({
      url: '../page_001/page_001',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var count = 2;  // it should be BE result 
    var uid = '020b28e556de4352a231650c1637653c';
    var refer = this;
    wx.request({
      url: 'https://aisss5ct.qcloud.la/Emp/mobile/wordexam/query/' + uid,
      method: 'GET',
      success: function (res) {
        //返回单词总数
        count = res.data.total
        //页面数据设置
        refer.setData({
          wordAccount: res.data.total,
          wordList: res.data.rows
        })
        //创建一个空数组
        var emptyarray = new Array(count);
        //给创建的空数组赋值
        for (var i = 0; i < count; i++) emptyarray[i] = "-1";
        //页面数据设置
        refer.setData({
          myanswer: emptyarray,
          startTime: new Date()//开始考试时间
        })
      },
      fail: function(res){
        console.log(res)
      }
    })
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