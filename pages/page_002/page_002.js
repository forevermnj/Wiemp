// pages/page_002/page_002.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalaccount: 20,
    wordindex: 0,
    startx: 0,
    pagestyle: 'simple', //simple|complex
    wordlist: ["Financial", "daily", "exercise", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    wordlistdetail: [
      {
        pronounce: ['[faɪˈnænʃl]', '[faɪˈnænʃ(ə)l]'],
        detail: {
          translation: ['adj.  财政的; 财务的; 金融的; 有钱的;']
        }
      },
      {
        pronounce: ['[ˈdeɪli]', '[ˈdeli]'],
        detail: {
          translation: [
            'adj.  每日的，日常的; 一日的; 每日一次的; 每个工作日的;',
            'n.  日报; （不寄宿的）仆人，白天做家务的女佣;',
            'adv.  每日; 逐日; 每周日; 日复一日地;'
          ]
        }
      }, {}, {}, {}, {}, {}, {}, {}, {
        pronounce: ['[ˈsʌndeɪ]', '[ˈsʌnˌdeɪ]'],
        detail: {
          translation: [
            'n.星期日，星期天; 每逢星期日出版的报纸; 星期日报; [人名] 森迪;'
          ]
        }
      }
    ]
  },

  //手指滑动开始
  mytouchstart: function (event) {
    this.setData({
      startx: event.touches[0].pageX
    });
  },

  //手指滑动
  mytouchmove: function (event) {
  },

  //手指滑动开始
  mytouchend: function (event) {
    var distancex = event.changedTouches[0].pageX - this.data.startx;
    var i = this.data.wordindex;
    //console.log("distance:" + distancex);
    if (distancex < 0) {//move forward
      if (i >= this.data.wordlist.length - 1) {
        console.log();
        this.setData({
          wordindex: 0
        })
      } else {
        this.setData({
          wordindex: this.data.wordindex + 1
        })
      }

    } else if (distancex > 0) { // move back
      if (i <= 0) {
        this.setData({
          wordindex: this.data.wordlist.length - 1
        })
      } else {
        this.setData({
          wordindex: this.data.wordindex - 1
        })
      }
    }
  },
  //显示详细释义
  todetail: function (event) {
    this.setData({
      pagestyle: 'complex'
    })
  },

  tosimplestyle: function (event) {
    this.setData({
      pagestyle: 'simple'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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