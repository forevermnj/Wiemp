var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    mp3dataIndex:0,
    anwIndex:0,
    chooseDataNum:0,
    mp3data:[
      {
        pro: app.globalData.serverUrl + '/Emp/mobile/mp3/page_015/1.mp3',
        anw:
        [
          { url: app.globalData.serverUrl + '/Emp/mobile/mp3/page_015/2.mp3',flag:false,num:0},
          { url: app.globalData.serverUrl + '/Emp/mobile/mp3/page_015/3.mp3',flag:false,num:1},
          { url: app.globalData.serverUrl + '/Emp/mobile/mp3/page_015/4.mp3',flag:true,num:2}
        ]
      },
      {
        pro: app.globalData.serverUrl + '/Emp/mobile/mp3/page_015/5.mp3',
        anw:
        [
          { url: app.globalData.serverUrl + '/Emp/mobile/mp3/page_015/6.mp3',flag:false,num:0},
          { url: app.globalData.serverUrl + '/Emp/mobile/mp3/page_015/7.mp3',flag:false,num:1},
          { url: app.globalData.serverUrl + '/Emp/mobile/mp3/page_015/8.mp3',flag:true,num:2}
         
        ]
      }
    ],
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png',
    flag1:false,
    flag2:false,
    flag3:false,
    preflag:false,
    speeImgInit: '../image/tabbar/14.png',
    speechFlag: false,
    animationErrorData: {},
    animationCorrectData: {},
    nochooseflag: -1

  },
  speech: function () {

    let refer = this;
    if (refer.data.preflag==false){
      refer.setData({
        speeImgInit: '../image/tabbar/18.gif',
        speechFlag: true,
        anwIndex: 0
      });
      let tempFilePath = refer.data.mp3data[refer.data.mp3dataIndex].pro;
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      //监听播放停止
      wx.onBackgroundAudioStop(function () {
        if (refer.data.preflag == false){
          if (refer.data.anwIndex <= 2) {
            let tempFilePath = refer.data.mp3data[refer.data.mp3dataIndex].anw[refer.data.anwIndex].url;
            wx.playBackgroundAudio({
              dataUrl: tempFilePath
            });
            refer.setData({
              anwIndex: refer.data.anwIndex + 1
            })
          } else {
            refer.setData({
              speeImgInit: '../image/tabbar/14.png',
              speechFlag: false
            });
          }
        }
        
      })
    }
    
  },
  onLoad: function () {
    util.showBusy('加载中...');
    let refer = this;
    refer.setData({
      anwIndex:0,
      mp3dataIndex:app.globalData.mp3dataIndex2
    })
    refer.speech();
  },
  onPullDownRefresh: function () {

  },
  toCreateErrorAnimation: function () {
    let refer = this;
    //创建动画
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
      delay: 0
    });
    //Y轴偏移
    animation.backgroundColor("red");
    animation.opacity(1).translateY(-40).step();

    //导出动画
    refer.setData({
      animationErrorData: animation.export()
    });
    //1秒之后恢复
    setTimeout(function () {
      animation.backgroundColor("#354255");
      animation.opacity(1).translateY(0).step();
      refer.setData({
        animationErrorData: animation.export()
      })
    }.bind(refer), 400);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.showSuccess('加载成功');
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
  choose: function (e) {
    let refer = this;
    let csv = e.currentTarget.dataset.hi[0];
    let numflag = e.currentTarget.dataset.hi[1];
    refer.setData({
      chooseDataNum: numflag
    });
    console.log('选择的结果'+csv);
    if(csv){
      //app.globalData.mp3dataIndex2 = app.globalData.mp3dataIndex2+1;
      refer.setData({
        nochooseflag: 0,
        preflag: true
      })
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      setTimeout(function () {
        wx.stopBackgroundAudio();
        wx.redirectTo({
          url: '../page_016/page_016',
        });
      }.bind(refer), 1500);
    }else{
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      console.log(tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      refer.toCreateErrorAnimation();
    }

    
  },
  toIndex: function () {
    let refer = this;
    wx.stopBackgroundAudio();
    refer.setData({
      indeximg: '../image/tabbar/1.png',
      catagaryimg: '../image/tabbar/5.png'
    });
    wx.redirectTo({
      url: '../page_010/page_010',
    });
  },
  toPrevious: function () {
    let refer = this;
    wx.stopBackgroundAudio();

    refer.setData({
      indeximg: '../image/tabbar/2.png',
      preflag:true
    });
    wx.redirectTo({
      url: '../page_014/page_014',
    });
  }
})
