
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startx: 0,
    wordIndex: 0,
    myanswer: [],
    wordList: [],
    status: 'failed', // success, failed
    score: 0,
    wordAccount: 0,
    startTime: '',
    elapse: '', //less than 1 minute show second
    showDialog: false,
    imgwordurl: '../image/page_002/2.png',
  },
  //单词读音
  speech: function (e) {
    //console.log(this.data.wordIndex);
    var refer = this;
    refer.setData({
      imgwordurl: '../image/page_002/3.gif'
    });
    let words = refer.data.wordList[refer.data.wordIndex].word;
    wx.request({
      url: app.globalData.serverUrl+'/Emp/mobile/word/pronunciation/' + words,
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
        imgwordurl: '../image/page_002/2.png'
      });
    })
  },
  touchstart: function (e) {
    this.setData({
      startx: e.touches[0].pageX
    })
  },
  touchmove: function (e) {

  },
  touchend: function (e) {
    /***************************************************
     * 如果用户没有选择答案,并且不是向左滑动，则不做任何反应
     ***************************************************/
    var distancex = e.changedTouches[0].pageX - this.data.startx;
    //update word index
    if (distancex < 0 && this.data.myanswer[this.data.wordIndex] != "-1") {  //allow move left only
      //改变单词下标
      this.setData({
        wordIndex: this.data.wordIndex + 1
      })
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
    /****************************************
     * 实时计算考试分数，以及所用时间
     ****************************************/
    if (this.data.wordIndex >= this.data.wordList.length - 1) {  //popup result when last word
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
        //console.log("调用打卡接口");
        this.setData({
          status: 'success'
        })
        /**
         * 考试通过，调用打卡接口
         */
        var uid = wx.getStorageSync('uid');
        //console.log(uid);
        wx.request({
          url: app.globalData.serverUrl +'/Emp/mobile/hitcard/hit',
          method: 'POST',
          header: {
            "Content-Type": "application/json"
          },
          data: {
            userId: uid
          },
          success: function (res) {
            console.log('考试打卡成功');
            var ids = wx.getStorageSync('twordrecordid');
            /**
             * 考试打卡成功将单词考试状态修改为:考试通过
             */
            wx.request({
              url: app.globalData.serverUrl + '/Emp/mobile/wordexam/examPass',
              method: 'POST',
              header: {
                "Content-Type": "application/json"
              },
              data: {
                ids: ids
              },
              success: function (res) {
                 /**
                  * 移除相关缓存数据
                  */
                wx.removeStorageSync('twordrecordid');
                wx.removeStorageSync('wordidlist');
                wx.removeStorageSync('wordlist');
                wx.removeStorageSync('totalaccount');
              }
            })



          }
        })
      } else {
        this.setData({
          status: 'failed'
        })
      }
    }

    /************************************************
     * 如果选择正确，则自动跳转下一个单词,正确单词下标为0
     *************************************************/
    if (e.currentTarget.dataset.optionsindex=='0'){
      //改变单词下标
      this.setData({
        wordIndex: this.data.wordIndex + 1
      })
    }else{
      wx.request({
        url: app.globalData.serverUrl + '/Emp/mobile/easymistake/edit/' + this.data.wordList[this.data.wordIndex].id,
        method: 'GET',
        success: function (res) {
         
        }
      })
    }

    /*************************************************
     * 存贮对于指定单词，用户所选择的释义下标
     *************************************************/
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
    var uid = wx.getStorageSync('uid');
    var refer = this;
    wx.request({
      url: app.globalData.serverUrl+'/Emp/mobile/wordexam/query/' + uid,
      method: 'GET',
      success: function (res) {
        //返回单词总数
        count = res.data.total
        //页面数据设置
        refer.setData({
          wordAccount: res.data.total,
          wordList: res.data.rows
        })
        var temp='';
        for(var k=0;k<res.data.rows.length;k++){
            temp = temp + res.data.rows[k].id+",";
        }
        //console.log('dddddddddd'+temp);
        /**
         * 将用户单词记录表中的主键存入缓存
         */
        wx.setStorage({
          key: "twordrecordid",
          data: temp
        });
        
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