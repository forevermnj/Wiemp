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
          'abbr.  Dutch 荷兰的; 荷兰人（的）; 荷兰语（的）; 荷兰式的;',
          'vt.（以剑触肩）封…为爵士; 授予称号; 起绰号; 配音，转录; vi.击鼓;',
          'n.  鸭子，野鸭; 鸭肉; （表示友好的称呼）乖乖; （板球）零分; vt.& vi.  躲避，回避; 潜入; 忽然低下头（或弯下腰）; 迅速行进; ',
          'n.（美）钱，元; 雄鹿; 花花公子; vt.& vi.（马等）猛然弓背跃起; 抵制; 猛然震荡;'
        ],
        correct: '1'
      },
      {
        word: "phycology",
        pronounce: "[faɪ'kɒlədʒɪ]",
        options: [
          "adj.  自然（界）的; 身体的; 物质的; 自然规律的; n.  身体检查，体格检查;",
          "n.  心理学; 心理特点; 心理状态; 心理影响;",
          "n.  藻类学;",
          "n.  精神，心灵; 情绪; 勇气; 精髓; v.  神秘地带走;"
        ],
        correct: '2'
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

    this.setData({
      startx: e.touches[0].pageX
    })
  },
  touchmove: function (e) {

  },
  touchend: function (e) {
    var distancex = e.changedTouches[0].pageX - this.data.startx;
    var wi = this.data.wordIndex;

    //update word index
    if (distancex < 0 && this.data.myanswer[this.data.wordIndex] != "-1") {  //allow move left only
      if (wi >= this.data.wordList.length - 1) {  //popup result
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

        //console.log(rate + "|" + elapseTime);
        if (rate >= 0.9) {
          this.setData({
            score: percent,
            showDialog: true,
            status: 'success',
            elapse: elapseStr
          })
        } else {
          this.setData({
            score: percent,
            showDialog: true,
            status: 'failed',
            elapse: elapseStr
          })
        }
      } else {
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
    var aswArray = this.data.myanswer;
    if (aswArray[this.data.wordIndex] == "-1") {  //only allow user to select once
      aswArray[this.data.wordIndex] = e.currentTarget.dataset.optionsindex;
      this.setData({
        myanswer: aswArray
      })
    }
    //console.log(this.data);
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
    var emptyarray = new Array(count);
    for (var i = 0; i < count; i++) emptyarray[i] = "-1";
    this.setData({
      myanswer: emptyarray,
      startTime: new Date(),
      wordAccount: count
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