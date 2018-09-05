var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    mp3dataIndex:0,
    mp3data:[
      { url: app.globalData.serverUrl + '/Emp/mobile/mp3/page_013/1.mp3'},
      { url: app.globalData.serverUrl + '/Emp/mobile/mp3/page_013/2.mp3'},
      { url: app.globalData.serverUrl + '/Emp/mobile/mp3/page_013/3.mp3'},
      { url: app.globalData.serverUrl + '/Emp/mobile/mp3/page_013/4.mp3'},
      { url: app.globalData.serverUrl + '/Emp/mobile/mp3/page_013/5.mp3'},
      { url: app.globalData.serverUrl + '/Emp/mobile/mp3/page_013/6.mp3'}
    ],
    nochooseflag:-1,
    allowClickNum:3,
    allowClickIndex:0,
    chooseDataFlag:false,
    chooseDataNum:0,
    chooseDataIndex: app.globalData.chooseDataIndex,
    chooseData:{
      "button": [{
        "icon": "../image/tabbar/13.png",
        "buttonname": "Previous",
        "buttonlink": "../page_012/page_012",
        "reladropletid": "4",
        "reladropletconftype": "1"
      }],
      "choice": {
        "reladropletid": "5",
        "reladropletconftypeid": "2",
        "choicetextaudio": "https://www.learnzp.com/Emp/mobile/mp3/page_013/1.mp3",
        "choicetextimage": "https://www.learnzp.com/Emp/mobile/page_012/1.png",
        "optionindexa": 1,
        "optionflaga": "false",
        "optionindexb": 2,
        "optionflagb": "true",
        "optionindexc": 3,
        "optionflagc": "false",
        "optiontexta": "It can monitor who is late today",
        "optiontextb": "It can form discipline, belongings and spirit among team members",
        "optiontextc": "It can help us solve our personal problems"
      }
    },
    /*chooseData:[
      {
        choicepro:'For the following descriptions of stand up meeting, which one is correct?',
        choiceanw:
        [
          {anw:'It can monitor who is late today',flag:false,num:0},
          {anw:'It can form discipline, belongings and spirit among team members', flag: true, num: 1},
          {anw:'It can help us solve our personal problems', flag: false, num: 2}
        ]
      },
      {
        choicepro:'Why is the stand-up meeting so fast?',
        choiceanw:
        [
          {anw:'Because attendees are less than other meetings', flag: false, num: 0},
          {anw: 'Because there is no word to say', flag: false, num: 1},
          {anw:'Because we need to exchange information with each other efficiently', flag: true, num: 2}
        ]
      },
      { 
        choicepro:'	How many questions will the host ask in stand up meeting?',
        choiceanw:
        [
          {anw:'Two',flag:false,num:0},
          {anw:'Three',flag:true,num:1},
          {anw:'Four',flag:false,num:2}
        ]
      },
      {
        choicepro:'Which task will Paul do today?',
        choiceanw:
        [
          {anw:'He will finish the preparation about MRS release',flag:false,num:0},
          {anw:'He will send mail to Bernard to seek help for the third party confirmation',flag:false,num:1},
          {anw:'He will work on passing the request parameters to the interface search code',flag:true,num:2}
        ]
      },
      {
        choicepro:'What mistake did Alice make?',
        choiceanw:
        [
          {anw:'She did not help Linda solve problem after meeting',flag:false,num:0},
          {anw:'She talked too many details of her project experience in meeting',flag:true,num:1},
          {anw:'She was used to showing herself in stand up meeting on purpose',flag:false,num:2}
        ]
      },
      {
        choicepro:'Why did the host interrupt Alice?',
        choiceanw:
        [
          {anw:'Because Alice told something wrong',flag:false,num:0},
          {anw:'Because the host did not have any patience',flag:false,num:1},
          {anw:'Because stand up meeting time is limited',flag:true,num:2}
        ]
      }
    ],*/
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png',
    animationErrorData: {},
    animationCorrectData: {},
    correctFlag:-1,
    speeImgInit:'../image/tabbar/14.png',
    speechFlag:false
  },
  clickImg: function () {
    wx.redirectTo({
      url: '../page_001/page_001',
    })
  },
  onPullDownRefresh: function () {

  },
  onLoad: function () {
    util.showBusy('加载中...');
    let refer = this;
    refer.setData({
      chooseDataIndex: app.globalData.chooseDataIndex,
      mp3dataIndex: app.globalData.mp3dataIndex
    });
    refer.speech();
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
  speech:function(){
     let refer = this;
     refer.setData({
       speeImgInit:'../image/tabbar/18.gif',
       speechFlag:true
     });
     let tempFilePath = refer.data.mp3data[refer.data.mp3dataIndex].url;
     wx.playBackgroundAudio({
       dataUrl: tempFilePath
     });
     //监听播放停止
     wx.onBackgroundAudioStop(function () {
       refer.setData({
         speeImgInit: '../image/tabbar/14.png',
         speechFlag: false
       });
     })
  },
  toCreateCorrectAnimation:function(){
    let refer = this;
    //创建动画
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    });
    //Y轴偏移
    animation.opacity(1).translateY(-40).step();
    //导出动画
    refer.setData({
      animationCorrectData: animation.export()
    });
    //1秒之后恢复
    setTimeout(function () {
      animation.opacity(1).translateY(0).step();
      refer.setData({
        animationCorrectData: animation.export()
      })
    }.bind(refer), 500);
    if (refer.data.chooseDataIndex == 1 || refer.data.chooseDataIndex==5)
     {
      refer.setData({
        nochooseflag: 0
      });
      //app.globalData.chooseDataIndex = app.globalData.chooseDataIndex + 1;
      //app.globalData.mp3dataIndex = app.globalData.mp3dataIndex + 1;
      setTimeout(function () {
        wx.redirectTo({
          url: '../page_014/page_014',
        });
      }.bind(refer), 1300);
    }else{
      refer.setData({
        nochooseflag: 0
      });
      setTimeout(function () {
        console.log('开始递增');
        refer.setData({
          chooseDataIndex: refer.data.chooseDataIndex + 1,
          mp3dataIndex:refer.data.mp3dataIndex + 1,
          nochooseflag: -1
        });
        //app.globalData.chooseDataIndex=app.globalData.chooseDataIndex + 1;
        //app.globalData.mp3dataIndex = app.globalData.mp3dataIndex+1;
        refer.speech();
      }.bind(refer), 1300);
      
    }
    
  },
  toCreateErrorAnimation:function(){
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
  choose: function (e) {
    let refer = this;
    let csv = e.currentTarget.dataset.hi[0];
    let numflag = e.currentTarget.dataset.hi[1];
    refer.setData({
      chooseDataNum: numflag
    });
    
    //如果选择正确
    if (csv) {
      let refer = this;
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      refer.setData({
        chooseDataFlag:true
      })
      refer.toCreateCorrectAnimation();
      
    }else{
      let refer = this;
      //允许点错次数递增
      refer.data.allowClickIndex = refer.data.allowClickIndex + 1;
      //超过三次选错则自动跳转下一个
      if(refer.data.allowClickIndex==3){
          console.log('选错3次');
        if (refer.data.chooseDataIndex == 1 || refer.data.chooseDataIndex == 5) {
          refer.setData({
            nochooseflag: 0
          });
          //app.globalData.chooseDataIndex = app.globalData.chooseDataIndex + 1;
          //app.globalData.mp3dataIndex = app.globalData.mp3dataIndex + 1;
          setTimeout(function () {
            wx.redirectTo({
              url: '../page_014/page_014',
            });
          }.bind(refer), 1300);
        } else {
          refer.setData({
            nochooseflag: 0
          });
          setTimeout(function () {
            console.log('开始递增');
            refer.setData({
              chooseDataIndex: refer.data.chooseDataIndex + 1,
              mp3dataIndex: refer.data.mp3dataIndex + 1,
              nochooseflag: -1,
              allowClickIndex:0
            });
            //app.globalData.chooseDataIndex=app.globalData.chooseDataIndex + 1;
            //app.globalData.mp3dataIndex = app.globalData.mp3dataIndex+1;
            refer.speech();
          }.bind(refer), 500);

        }
        let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
        wx.playBackgroundAudio({
          dataUrl: tempFilePath
        });
        return
      }






      refer.setData({
        nochooseflag: -1
      })
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      refer.toCreateErrorAnimation();
    }
  },
  toIndex: function () {
    let refer = this;
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
    refer.setData({
      indeximg: '../image/tabbar/2.png'
    });
    wx.redirectTo({
      url: '../page_012/page_012',
    });
  }
})
