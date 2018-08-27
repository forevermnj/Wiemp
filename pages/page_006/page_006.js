
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startx: 0,
    wordIndex: 0,
    myanswer: [],
    wordList: [],
    status: 'failed',
    score: 0,
    wordAccount: 0,
    startTime: '',
    elapse: '', //less than 1 minute show second
    showDialog: false,
    indeximg: '../image/tabbar/2.png',
    catagaryimg: '../image/tabbar/5.png',
    loginimg: '../image/tabbar/3.png',
    imgwordurl: '../image/page_002/2.png',
    bearwordimg: '../image/tabbar/7.png',
    flag1:'0'//标记用户是否作答
  },
  //单词读音
  speech: function (e) {
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
    var refer = this;
    
    
    /***************************************************
     * 如果用户没有选择答案,并且不是向左滑动，则不做任何反应
     ***************************************************/
    var distancex = e.changedTouches[0].pageX - refer.data.startx;
    if (distancex < 0 && refer.data.myanswer[refer.data.wordIndex] != "-1") {
      //改变单词下标
      this.setData({
        wordIndex: this.data.wordIndex + 1,
        flag1:'0'
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
    /**
     * 标记用户已经作答
     */
    this.setData({
      flag1:'1'
    })

    /*************************************************
     * 存贮对于指定单词，用户所选择的释义下标
     *************************************************/
    var aswArray = this.data.myanswer;
    //如果用户还没有选择答案
    if (aswArray[this.data.wordIndex] == "-1") {
      //标记指定下标单词的释义已被用户所选择，数组存贮用户所选择的答案的下标
      aswArray[this.data.wordIndex] = e.currentTarget.dataset.optionsindex;
      this.setData({
        myanswer: aswArray
      })
    }

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
      
      if (rate >= 0.9) {
        this.setData({
          status: 'success'
        })
        //获取用户ID
        var uid = wx.getStorageSync('uid');
        /**
         * 考试通过，调用打卡接口
         */
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
            //获取用户单词记录表的主键
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
     * 如果选择正确
     * 自动跳转暂时取消
     *************************************************/
    if (e.currentTarget.dataset.optionsindex == this.data.wordList[this.data.wordIndex].correct)    {
      wx.playBackgroundAudio({
        dataUrl: app.globalData.serverUrl + '/Emp/mobile/mp3/correct.mp3'
      });
      //改变单词下标
      /*this.setData({
        wordIndex: this.data.wordIndex + 1,
        flag1:'0'
      })*/
    }else{
      wx.playBackgroundAudio({
        dataUrl: app.globalData.serverUrl + '/Emp/mobile/mp3/error.mp3'
      });
      wx.request({
        url: app.globalData.serverUrl + '/Emp/mobile/easymistake/edit/' + this.data.wordList[this.data.wordIndex].id,
        method: 'GET',
        success: function (res) {
         
        }
      })
    }

    
  },
  mask: function () {
    
  },
  iknow: function () {
    wx.redirectTo({
      url: '../page_001/page_001',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showBusy('数据加载中...');
    var count = "";
    //获取用户ID 
    var uid = wx.getStorageSync('uid');
    var refer = this;
    //请求开始考试接口
    wx.request({
      url: app.globalData.serverUrl+'/Emp/mobile/wordexam/query/' + uid,
      method: 'GET',
      success: function (res) {
        /*console.log('状态码'+res.statusCode);
        if (res.statusCode!=200){
          console.log('加载中');
          wx.redirectTo({
            url: '../page_011/page_011',
          })
        }
        if (res.statusCode==200){
          app.globalData.examFlag = true;
        }*/

        //返回单词总数
        count = res.data.total;
        //页面数据设置
        refer.setData({
          wordAccount: res.data.total,
          wordList: res.data.rows
        })

        /**
         * 组装用户单词记录表主键数据
         */
        var temp='';
        for(var k=0;k<res.data.rows.length;k++){
            temp = temp + res.data.rows[k].id+",";
        }
        /**
         * 将用户单词记录表中的主键存入缓存
         */
        wx.setStorage({
          key: "twordrecordid",
          data: temp
        });
        
        //根据开始考试接口返回的单词总数,创建一个空数组
        var emptyarray = new Array(count);
        //给创建的空数组赋值
        for (var i = 0; i < count; i++) emptyarray[i] = "-1";
        //页面数据设置
        refer.setData({
          myanswer: emptyarray,
          startTime: new Date()//开始考试时间
        })
        
      },
      complete:function(){
        util.showSuccess('加载成功');
      },
      fail: function(res){
        console.log(res)
      }
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

  },
  toIndex: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/1.png',
      bearwordimg: '../image/tabbar/7.png'
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  },
  toBearWord: function () {
    let refer = this;
    refer.setData({
      bearwordimg: '../image/tabbar/8.png',
      indeximg: '../image/tabbar/2.png'
    });
    wx.redirectTo({
      url: '../page_001/page_001',
    });
  }
})