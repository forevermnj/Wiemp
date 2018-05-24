// pages/page_002/page_002.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalaccount: 10,
    wordindex: 0,
    startx: 0,
    pagestyle: 'simple', //simple|complex
    wordlist: ["Financial", "daily", "exercise", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    wordidlist: [],
    worddetail: {
      pronounce: '[faɪˈnænʃ(ə)l]',
      translation: 'adj.  财政的; 财务的; 金融的; 有钱的;',
      sentence: '1. The enquiry dug deeper into the alleged financial misdeeds of his government.'
    },
    wordlistdetail: [
      {
        pronounce: '[faɪˈnænʃ(ə)l]',
        translation: 'adj.  财政的; 财务的; 金融的; 有钱的;',
        sentence: '1. The enquiry dug deeper into the alleged financial misdeeds of his government.'
      },
      {
        pronounce: '[ˈdeli]',
        translation: 'adj.  每日的，日常的; 一日的; 每日一次的; 每个工作日的;',
        sentence: '1. Daily facial exercises help her to retain the skin\'s elasticity.'

      }, {}, {}, {}, {}, {}, {}, {}, {
        pronounce: '[ˈsʌnˌdeɪ]',
        translation: 'n.星期日，星期天; 每逢星期日出版的报纸; 星期日报; [人名] 森迪;',
        sentence: '1. On Sunday Cohen lay around the house all day. '

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
    var wi = this.data.wordindex;

    //update word index
    var refer = this;
    if (distancex < 0) {//left move
      if (wi >= this.data.wordlist.length - 1) {//  trigger exercise page when user move left on last word
        //wi = 0;
        wx.navigateTo({
          url: '../page_006/page_006',
        })
      } else {
        wi++;
      }
    } else if (distancex > 0) { // move right
      if (wi <= 0) {
        wi = this.data.wordlist.length - 1;
      } else {
        wi--;
      }
    }
    if (distancex != 0) {
      refer.setData({
        wordindex: wi
      })
      //get detail of current word
      if (this.data.pagestyle == 'complex') {
        console.log("call backend, pagestyle == 'complex'");
        var resp = null;
        wx.request({
          url: 'https://aisss5ct.qcloud.la/Emp/mobile/bearword/mean/' + this.data.wordidlist[wi],
          method: 'GET',

          success: function (resz) {
            resp = {
              pronounce: resz.data.symbol,
              translation: resz.data.interpretation,
              sentence: resz.data.sentence
            }
            refer.setData({
              worddetail: resp
            })
          }
        })
      }
    }
  },

  //单词读音
  speech: function () {
    var refer = this;
    wx.request({
      url: 'https://aisss5ct.qcloud.la/Emp/mobile/word/pronunciation/' + refer.data.wordlist[refer.data.wordindex],
      method: 'GET',
      success: function (res) {
        const backgroundAudioManager = wx.getBackgroundAudioManager()
        backgroundAudioManager.src = res.data
      }
    })
  },

  //显示详细释义
  changestyle: function (event) {

    if (this.data.pagestyle == 'simple') {
      var resp = null;
      var refer = this;
      refer.setData({
        pagestyle: 'complex'
      })
      wx.request({
        url: 'https://aisss5ct.qcloud.la/Emp/mobile/bearword/mean/' + refer.data.wordidlist[refer.data.wordindex],
        method: 'GET',

        success: function (resz) {
          resp = {
            pronounce: resz.data.symbol,
            translation: [resz.data.interpretation],
            sentence: [resz.data.sentence],
          }

          refer.setData({
            worddetail: resp
          })
        }
      })
    } else if (this.data.pagestyle == 'complex') {
      this.setData({
        pagestyle: 'simple'
      })
    }
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var refer = this;
    wx.request({
      url: 'https://aisss5ct.qcloud.la/Emp/mobile/bearword/query/020b28e556de4352a231650c1637653c',
      method: 'GET',

      success: function (resz) {
        var acc = resz.data.total;
        var wordarray = new Array(acc);
        var wordidarray = new Array(acc);
        //fill page data
        for (var i = 0; i < resz.data.rows.length; i++) {
          wordarray[i] = resz.data.rows[i].word;
          wordidarray[i] = resz.data.rows[i].wordId;
        }
        refer.setData({
          totalaccount: acc,
          wordlist: wordarray,
          wordidlist: wordidarray
        });
      },
      fail: function () {
        wx.showModal({
          title: 'notice',
          content: '无法链接服务器',
        })
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