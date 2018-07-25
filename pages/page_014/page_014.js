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
    previousImg: '../image/tabbar/13.png',
    flag1:false,
    flag2:false,
    flag3:false,
    flag:[false,false,false,false],
    checkFlag1:false,
    checkFlag2:false,
    check_errorFlag1:false,
    check_errorFlag2:false

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
  v1:function(e){
     let refer = this;
     let temp = refer.data.chooseData[1];
     let csv = e.currentTarget.dataset.hi;
     let selected = -1;
     for(var i=0;i<refer.data.answerData.length;i++){
          if(refer.data.answerData[i].txt == csv){
            selected = i;
            break;
          }
     }
     refer.setData({
       checkFlag1:false,
       check_errorFlag1:false,
       flag1:false,
       chooseData: ['', temp],
       chooseIndex:0
     })
     if (refer.data.chooseData[0] == '' && refer.data.chooseData[1] == ''){
        refer.setData({
          chooseIndex:0
        })
     }
     if (refer.data.chooseData[0] == '' || refer.data.chooseData[1] == '') {
      refer.setData({
        flag3: false
      })
     }
     if(selected !=-1){
         let temparray = new Array(4);
         for(let k=0;k<4;k++){
             if(selected == k){
               temparray[k] = false;
             }else{
               temparray[k] = refer.data.flag[k];
             }
         }
         refer.setData({
           flag: temparray
         })
     }
  },
  v2:function(e){
     let refer = this;
     let temp = refer.data.chooseData[0];
     let csv = e.currentTarget.dataset.hi;
     let selected = -1;
     for (var i = 0; i < refer.data.answerData.length; i++) {
      if (refer.data.answerData[i].txt == csv) {
        selected = i;
        break;
      }
     }
     refer.setData({
       checkFlag2:false,
       check_errorFlag2:false,
       flag2:false,
       chooseData: [temp, ''],
       chooseIndex: 1
     })
    if (refer.data.chooseData[0] == '' && refer.data.chooseData[1] == '') {
      refer.setData({
        chooseIndex: 0
      })
    }
    if (refer.data.chooseData[0] == '' || refer.data.chooseData[1] == '') {
      refer.setData({
        flag3: false
      })
    }
    if (selected != -1) {
      let temparray = new Array(4);
      for (let k = 0; k < 4; k++) {
        if (selected == k) {
          temparray[k] = false;
        } else {
          temparray[k] = refer.data.flag[k];
        }
      }
      refer.setData({
        flag: temparray
      })
    }
  },
  c1:function(e){
    let refer = this;
    //选择的下标
    let cho = e.currentTarget.dataset.hi;
    let cindex = refer.data.chooseIndex;
    console.log('asd'+cindex);
    if (refer.data.chooseData[0] != '' && refer.data.chooseData[1]!=''){
        console.log('填写完成1'+cho);
        //已填空完成
        refer.setData({
          flag3:true
        })
    }else{
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      //console.log(tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      let temp1 = refer.data.flag[1];
      let temp2 = refer.data.flag[2];
      let temp3 = refer.data.flag[3];
      if (cindex==0){
        let ctemp = refer.data.chooseData[1];
        refer.setData({
          chooseData: [refer.data.answerData[cho].txt, ctemp],
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

      if (refer.data.chooseData[0] != '' && refer.data.chooseData[1] != '') {
        //console.log('填写完成');
        //已填空完成
        refer.setData({
          flag3: true
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
      console.log('填写完成2' + cho);
      //已填空完成
      refer.setData({
        flag3: true
      })
    } else {
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      //console.log(tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      let temp0 = refer.data.flag[0];
      let temp2 = refer.data.flag[2];
      let temp3 = refer.data.flag[3];
      if (cindex == 0) {
        let ctemp = refer.data.chooseData[1];
        refer.setData({
          chooseData: [refer.data.answerData[cho].txt, ctemp],
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
      if (refer.data.chooseData[0] != '' && refer.data.chooseData[1] != '') {
        //console.log('填写完成');
        //已填空完成
        refer.setData({
          flag3: true
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
      console.log('填写完成3' + cho);
      //已填空完成
      refer.setData({
        flag3: true
      })
    } else {
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      //console.log(tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      let temp0 = refer.data.flag[0];
      let temp1 = refer.data.flag[1];
      let temp3 = refer.data.flag[3];
      if (cindex == 0) {
        let ctemp = refer.data.chooseData[1];
        refer.setData({
          chooseData: [refer.data.answerData[cho].txt, ctemp],
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
      if (refer.data.chooseData[0] != '' && refer.data.chooseData[1] != '') {
        //console.log('填写完成');
        //已填空完成
        refer.setData({
          flag3: true
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
      console.log('填写完成4' + cho);
      //已填空完成
      refer.setData({
        flag3: true
      })
    } else {
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      //console.log(tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      let temp0 = refer.data.flag[0];
      let temp1 = refer.data.flag[1];
      let temp2 = refer.data.flag[2];
      if (cindex == 0) {
        let ctemp = refer.data.chooseData[1];
        refer.setData({
          chooseData: [refer.data.answerData[cho].txt, ctemp],
          chooseIndex: refer.data.chooseIndex + 1,
          flag1: true,
          flag: [temp0, temp1, temp2, true]
        })
      } else {
        let temp = refer.data.chooseData[0];
        //console.log(cho);
        refer.setData({
          chooseData: [temp, refer.data.answerData[cho].txt],
          chooseIndex: refer.data.chooseIndex + 1,
          flag2: true,
          flag: [temp0, temp1, temp2, true]
        })
      }
      if (refer.data.chooseData[0] != '' && refer.data.chooseData[1] != '') {
        //console.log('填写完成');
        //已填空完成
        refer.setData({
          flag3: true
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
  toPrevious: function () {
    let refer = this;
    refer.setData({
      indeximg: '../image/tabbar/2.png'
    });
    wx.redirectTo({
      url: '../page_013/page_013',
    });
  },
  check:function(){
    let refer = this;
    if (refer.data.chooseData[0] == 'since') {
         refer.setData({
           checkFlag1:true
         })
    }else{
      refer.setData({
        check_errorFlag1: true
      })
      
    }
    if (refer.data.chooseData[1] == 'had') {
      refer.setData({
        checkFlag2: true
      })
    }else{
      refer.setData({
        check_errorFlag2: true
      })
    }
    
  }
})
