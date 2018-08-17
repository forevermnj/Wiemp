var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    anwdataIndex:0,
    anwdata:[
      { 
        tit: ['with', 'to', '/','by'],
        correct1:'with',
        correct2:'to'
      },
      { 
        tit: ['leader', 'subordinate','teacher', 'student', 'boss', 'employee'],
        correct1:'leader',
        correct2:'subordinate'
      },
      {
        tit: ['obstacles', 'impeding', 'barriers', 'impede', 'problems','stopping'],
        correct1: 'obstacles',
        correct2: 'impeding'
      },
      {
        tit: ['on', 'to', 'for', 'of','out'],
        correct1: 'on',
        correct2: 'to'
      }
    ],
    datainit: [{
      tit: [
        'We can measure',
        '______',
        'the corner of eyes ',
        '______',
        'judge others when stand in a circle'
      ],
      emptyposition: [1, 3]
    },
      {
        tit: [
          'There is no apparent',
          '______',
          'or',
          '______',
          'in the meeting'
        ],
        emptyposition: [1, 3]
      },
      {
        tit: [
          'What',
          '______',
          'are',
          '______',
          'your progress?'
        ],
        emptyposition: [1, 3]
      },
      {
        tit: [
          'Today I am working',
          '______',
          'passing the request parameters',
          '______',
          'the interface search code'
        ],
        emptyposition: [1, 3]
      }],
    dataIndex:0,
    data:[
      {tit:[
        'We can measure',
        '______',
        'the corner of eyes ',
        '______',
        'judge others when stand in a circle'
      ],
      emptyposition:[1,3]
      },
      {tit:[
        'There is no apparent',
        '______',
        'or',
        '______',
        'in the meeting'
      ],
      emptyposition: [1, 3]
      },
      {tit:[
        'What',
        '______',
        'are',
        '______',
        'your progress?'
      ],
      emptyposition: [1, 3]
      },
      {tit:[
        'Today I am working',
        '______',
        'passing the request parameters',
        '______',
        'the interface search code'
      ],
      emptyposition: [1, 3]
      }
    ],
    chooseResult:[],
    emptypositionIndex:0,
    flag1:false,
    temp:[],
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png'
  },
  clickImg: function () {
    wx.redirectTo({
      url: '../page_001/page_001',
    })
  },
  check:function(e){
      let refer = this;

      if(refer.data.anwdata[refer.data.anwdataIndex].correct1==refer.data.chooseResult[0] && refer.data.anwdata[refer.data.anwdataIndex].correct2==refer.data.chooseResult[1]
      ){
        console.log('选择正确'+refer.data.dataIndex);
        let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
        wx.playBackgroundAudio({
          dataUrl: tempFilePath
        });
        if (refer.data.dataIndex == 1 || refer.data.dataIndex==3){
          wx.redirectTo({
            url: '../page_015/page_015',
          });
        }
        refer.setData({
          anwdataIndex:refer.data.anwdataIndex+1,
          dataIndex:refer.data.dataIndex+1,
          emptypositionIndex:0,
          chooseResult:[]
        });
        app.globalData.dataIndex = app.globalData.dataIndex+1;
        app.globalData.anwdataIndex = app.globalData.anwdataIndex+1;
      } else {
        let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
        wx.playBackgroundAudio({
          dataUrl: tempFilePath
        });
        refer.setData({
          chooseResult: [],
          data:refer.data.datainit,
          emptypositionIndex:0,
          flag1: false
        });
      }
  },
  chooseAnswer:function(e){
    let refer = this;
    let csv = e.currentTarget.dataset.hi;
    let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
    wx.playBackgroundAudio({
      dataUrl: tempFilePath
    });
    if (refer.data.chooseResult.length==2){
      //console.log('选择完成' + refer.data.chooseResult);
      refer.setData({
        flag1:true
      });
    }else{
     
      refer.data.chooseResult.push(csv);
      if (refer.data.chooseResult.length == 2) {
        refer.setData({
          flag1: true
        });
      }
      //替换空内容
      refer.data.data[refer.data.dataIndex].tit.splice(refer.data.data[refer.data.dataIndex].emptyposition[refer.data.emptypositionIndex], 1, csv);

      if (refer.data.chooseResult.length < 1) {
        refer.setData({
          emptypositionIndex: refer.data.emptypositionIndex + 1,
          chooseResult: refer.data.chooseResult,
          data: [
            { tit: refer.data.data[refer.data.dataIndex].tit, emptyposition: [1, 3] },
            { tit: refer.data.data[refer.data.dataIndex + 1].tit, emptyposition: [1, 3] }
          ]
        });
      } else {
        let data_temp = new Array();
        for(let n=0;n<refer.data.data.length;n++){
            if (refer.data.dataIndex==n){
              data_temp.push({ tit: refer.data.data[refer.data.dataIndex].tit, emptyposition: [1, 3] });
            }else{
              data_temp.push(refer.data.data[n]);
            }
        }
        refer.setData({
          emptypositionIndex: refer.data.emptypositionIndex + 1,
          chooseResult: refer.data.chooseResult,
          data: data_temp
        });
      }
      
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
      url: '../page_013/page_013',
    });
  },
  onPullDownRefresh: function () {

  },
  onLoad: function () {
    util.showBusy('加载中...');
    let refer = this;
    refer.data.temp = refer.data.data[refer.data.dataIndex].tit;
    refer.setData({
      dataIndex : app.globalData.dataIndex,
      anwdataIndex : app.globalData.anwdataIndex
    })
    
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

  }
})
