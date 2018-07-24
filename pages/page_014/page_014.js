var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    chooseData:['',''],
    chooseIndex:0,
    answerData: [{ txt: 'since' }, { txt: 'has' }, { txt: 'for' }, { txt: 'had'}],
    answerIndex:0,
    headImage: wx.getStorageSync('headImage'),
    nickName: wx.getStorageSync('nickName'),
    indeximg: '../image/tabbar/2.png',
    catagaryimg: '../image/tabbar/6.png',
    flag1:false,
    flag2:false,
    flag3:false,
    flag:[false,false,false,false]


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
  c1:function(e){
    let refer = this;
    //选择的下标
    let cho = e.currentTarget.dataset.hi;
    let cindex = refer.data.chooseIndex;
    
    if (refer.data.chooseData[0] != '' && refer.data.chooseData[1]!=''){
      console.log('填写完成');
        //已填空完成
        refer.setData({
          flag3:true
        })
    }else{
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      console.log(tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      let temp1 = refer.data.flag[1];
      let temp2 = refer.data.flag[2];
      let temp3 = refer.data.flag[3];
      if (cindex==0){
        refer.setData({
          chooseData: [refer.data.answerData[cho].txt,''],
          chooseIndex: refer.data.chooseIndex + 1,
          flag1:true,
          flag: [true, temp1, temp2, temp3]
        })
      }else{
        let temp = refer.data.chooseData[0];
        refer.setData({
          chooseData: [temp, refer.data.answerData[cho].txt], 
          chooseIndex: refer.data.chooseIndex + 1,
          flag2: true,
          flag: [true, temp1, temp2, temp3]
         
        })
      }
      
    }
     
  },
  c2: function (e) {
    let refer = this;
    //选择的下标
    let cho = e.currentTarget.dataset.hi;
    let cindex = refer.data.chooseIndex;
    //console.log(cindex);
    if (refer.data.chooseData[0] != '' && refer.data.chooseData[1] != '') {
      console.log('填写完成');
      //已填空完成
      refer.setData({
        flag3: true
      })
    } else {
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      console.log(tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      let temp0 = refer.data.flag[0];
      let temp2 = refer.data.flag[2];
      let temp3 = refer.data.flag[3];
      if (cindex == 0) {
        refer.setData({
          chooseData: [refer.data.answerData[cho].txt, ''],
          chooseIndex: refer.data.chooseIndex + 1,
          flag1: true,
          flag: [temp0, true, temp2, temp3]
        })
      } else {
        let temp = refer.data.chooseData[0];
        refer.setData({
          chooseData: [temp, refer.data.answerData[cho].txt],
          chooseIndex: refer.data.chooseIndex + 1,
          flag2: true,
          flag: [temp0, true, temp2, temp3]
        })
      }

    }
  },
  c3: function (e) {
    let refer = this;
    //选择的下标
    let cho = e.currentTarget.dataset.hi;
    let cindex = refer.data.chooseIndex;
    //console.log(cindex);
    if (refer.data.chooseData[0] != '' && refer.data.chooseData[1] != '') {
      console.log('填写完成');
      //已填空完成
      refer.setData({
        flag3: true
      })
    } else {
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      console.log(tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      let temp0 = refer.data.flag[0];
      let temp1 = refer.data.flag[1];
      let temp3 = refer.data.flag[3];
      if (cindex == 0) {
        refer.setData({
          chooseData: [refer.data.answerData[cho].txt, ''],
          chooseIndex: refer.data.chooseIndex + 1,
          flag1: true,
          flag: [temp0, temp1, true, temp3]
        })
      } else {
        let temp = refer.data.chooseData[0];
        refer.setData({
          chooseData: [temp, refer.data.answerData[cho].txt],
          chooseIndex: refer.data.chooseIndex + 1,
          flag2: true,
          flag: [temp0, temp1, true, temp3]
        })
      }

    }
  },
  c4: function (e) {
    let refer = this;
    //选择的下标
    let cho = e.currentTarget.dataset.hi;
    let cindex = refer.data.chooseIndex;
    //console.log(cindex);
    if (refer.data.chooseData[0] != '' && refer.data.chooseData[1] != '') {
      console.log('填写完成');
      //已填空完成
      refer.setData({
        flag3: true
      })
    } else {
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      console.log(tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      let temp0 = refer.data.flag[0];
      let temp1 = refer.data.flag[1];
      let temp2 = refer.data.flag[2];
      if (cindex == 0) {
        refer.setData({
          chooseData: [refer.data.answerData[cho].txt, ''],
          chooseIndex: refer.data.chooseIndex + 1,
          flag1: true,
          flag: [temp0, temp1, temp2, true]
        })
      } else {
        let temp = refer.data.chooseData[0];
        console.log(cho);
        refer.setData({
          chooseData: [temp, refer.data.answerData[cho].txt],
          chooseIndex: refer.data.chooseIndex + 1,
          flag2: true,
          flag: [temp0, temp1, temp2, true]
        })
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
  toCatagary: function () {
    let refer = this;
    refer.setData({
      catagaryimg: '../image/tabbar/6.png',
      indeximg: '../image/tabbar/2.png'
    });

  }
})
