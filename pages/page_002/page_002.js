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
    wordlist: [],
    wordidlist: [],
    worddetail: {
      pronounce: '',
      translation: '',
      sentence: ''
    },
    imgwordurl:'../image/page_002/2.png',
    imgsentenceurl: '../image/page_002/2.png'
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

  //手指滑动结束
  mytouchend: function (event) {
    var distancex = event.changedTouches[0].pageX - this.data.startx;
    var wi = this.data.wordindex;
    //update word index
    var refer = this;
    if (distancex != 0) { //filter out the tap event
      if (distancex < 0) {  //left move
        //console.log(wi);
        if (wi >= this.data.wordlist.length - 1) {
          //trigger exercise page when user move left on last word
          wx.redirectTo({
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

      refer.setData({
        wordindex: wi
      })
      //get detail of current word
      if (this.data.pagestyle == 'complex') {
        //console.log("call backend, pagestyle == 'complex'");
        var wid = this.data.wordidlist[wi];
        wx.request({
          url: 'https://aisss5ct.qcloud.la/Emp/mobile/bearword/mean/' + wid,
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
      }
    }
  },

  //单词读音
  speech: function () {
    var refer = this;
    refer.setData({
      imgwordurl: '../image/page_002/3.gif'
    });
    var word = refer.data.wordlist[refer.data.wordindex];
    wx.request({
      url: 'https://aisss5ct.qcloud.la/Emp/mobile/word/pronunciation/' + word,
      method: 'GET',
      success: function (res) {
        const backgroundAudioManager = wx.getBackgroundAudioManager()
        backgroundAudioManager.src = res.data
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
      imgsentenceurl:'../image/page_002/3.gif'
    });
    var word = refer.data.worddetail.sentence;
    wx.request({
      url: 'https://aisss5ct.qcloud.la/Emp/mobile/word/pronunciation/' + word,
      method: 'GET',
      success: function (res) {
        const backgroundAudioManager = wx.getBackgroundAudioManager()
        backgroundAudioManager.src = res.data
        
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
      var wid = refer.data.wordidlist[refer.data.wordindex];
      wx.request({
        url: 'https://aisss5ct.qcloud.la/Emp/mobile/bearword/mean/' + wid,
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
    //先从缓存中拿数据
    var value1 = wx.getStorageSync('wordidlist');
    var value2 = wx.getStorageSync('wordlist');
    var value3 = wx.getStorageSync('totalaccount');
    //如果缓存中存在数据则不调用接口
    if (value2 != '' && value2!=null){
          this.setData({
            wordlist: value2,
            wordidlist: value1,
            totalaccount: value3
          })
          return
    }
    var refer = this;
    var uid = '020b28e556de4352a231650c1637653c';
    wx.request({
      url: 'https://aisss5ct.qcloud.la/Emp/mobile/bearword/query/' + uid,
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
        //将数据保存到缓存中
        wx.setStorage({
          key: "wordlist",
          data: wordarray
        });
        //将数据保存到缓存中
        wx.setStorage({
          key: "wordidlist",
          data: wordidarray
        });
        //将数据保存到缓存中
        wx.setStorage({
          key: "totalaccount",
          data: acc
        })
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