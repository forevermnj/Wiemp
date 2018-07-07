
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:'',
    wordid:'',
    pagestyle: 'simple', //simple|complex
    worddetail: {
      pronounce: '',
      translation: '',
      sentence: ''
    },
    imgwordurl: '../image/page_002/2.png',
    imgsentenceurl: '../image/page_002/2.png',
    indeximg: '../image/tabbar/2.png',
    catagaryimg: '../image/tabbar/5.png',
    loginimg: '../image/tabbar/3.png',
    bearwordimg: '../image/tabbar/7.png',
    easyerror:'../image/tabbar/9.png'
  },
  //单词读音
  speech: function () {
    var refer = this;
    refer.setData({
      imgwordurl: '../image/page_002/3.gif'
    });
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/word/pronunciation/' + refer.data.word,
      method: 'GET',
      success: function (res) {
        var tempFilePath = res.data;
        wx.playBackgroundAudio({
          dataUrl: tempFilePath
        });
      }
    })
    //监听播放停止
    wx.onBackgroundAudioStop(function () {
      //console.log('onBackgroundAudioStop')
      refer.setData({
        imgwordurl: '../image/page_002/2.png'
      });
    })
  },
  //句子读音
  speech2: function () {
    var refer = this;
    refer.setData({
      imgsentenceurl: '../image/page_002/3.gif'
    });
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/word/pronunciation/' + refer.data.worddetail.sentence,
      method: 'GET',
      success: function (res) {
        var tempFilePath = res.data;
        wx.playBackgroundAudio({
          dataUrl: tempFilePath
        });
      }
    });
    //监听播放停止
    wx.onBackgroundAudioStop(function () {
      //console.log('onBackgroundAudioStop')
      refer.setData({
        imgsentenceurl: '../image/page_002/2.png'
      });
    })

  },

  //显示详细释义
  changestyle: function (event) {
    if (this.data.pagestyle == 'simple') {
      var refer = this;
      refer.setData({
        pagestyle: 'complex'
      })
      var wid = app.globalData.easyErrorId;
      wx.request({
        url: app.globalData.serverUrl + '/Emp/mobile/bearword/mean/' + wid,
        method: 'GET',
        success: function (resz) {
          var resp = {
            pronounce: resz.data.symbol,
            translation: resz.data.interpretation,
            sentence: resz.data.sentence
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
    var refer = this;
    refer.setData({
      word: app.globalData.easyError,
      wordid: app.globalData.easyErrorId
    })
    
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

  },
  toIndex: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/1.png',
      bearwordimg: '../image/tabbar/7.png',
      easyerror: '../image/tabbar/9.png'
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  },
  toBearWord: function () {
    let refer = this;
    refer.setData({
      bearwordimg: '../image/tabbar/8.png',
      indeximg: '../image/tabbar/2.png',
      easyerror: '../image/tabbar/9.png'
    });
    wx.redirectTo({
      url: '../page_001/page_001',
    });
  },
  toEasyMistake: function () {
    let refer = this;
    refer.setData({
      bearwordimg: '../image/tabbar/7.png',
      indeximg: '../image/tabbar/2.png',
      easyerror:'../image/tabbar/10.png'
    });
    wx.redirectTo({
      url: '../page_003/page_003',
    });
  }
})