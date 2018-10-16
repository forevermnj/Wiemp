var app = getApp();
var x, y, x1, y1, x2, y2, index, currindex, n, yy;
var arr1 = [];
var calculatescore = require('../../utils/calculatescore.js');
Page({
  data: {
    mainx: 0,
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png',
    originContent:{},
    content: [],
    start: { x: 0, y: 0 },
    correctFlag: false,
    mp3index: 0,
    allowClickNum: 3,
    allowClickIndex: 0,
    mp3: [
      app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3',
      app.globalData.serverUrl + '/Emp/mobile/mp3/page_017/1.mp3'
    ]
  },
  toSubmit: function () {
    let refer = this;
    if (
      refer.data.content[0].key == 1 &&
      refer.data.content[1].key == 2 &&
      refer.data.content[2].key == 3 &&
      refer.data.content[3].key == 4
    ) {
      //排序正确
      refer.setData({
        correctFlag: true
      });
      //调用计算用户得分函数
      let score = calculatescore.addScore();
      console.log("===" + score);
      app.globalData.score = score;
      
      let tempFilePath = refer.data.mp3[refer.data.mp3index];
      console.log('地址'+tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      wx.onBackgroundAudioStop(function () {
        refer.setData({
          mp3index: refer.data.mp3index + 1
        })
        if (refer.data.mp3index == 2) {
          let path = refer.data.originContent.sortdata.dropLetLink;
          app.globalData.dropLetId = refer.data.originContent.sortdata.reladropletid;
          app.globalData.dropLetConfigTypeId = refer.data.originContent.sortdata.reladropletconftypeid;

          //如果完成场景学习则调用保存分数方法
          if (refer.data.originContent.sortdata.reladropletid == app.globalData.successDropLetId) {
            refer.saveUserScore(
              wx.getStorageSync('uid'),
              app.globalData.scoreIndex,
              app.globalData.scoreDropLetId,
              app.globalData.scoreDropLetConfigTypeId
            );
          }
          wx.redirectTo({
            url: path
          });
        } else {
          let tempFilePath = refer.data.mp3[refer.data.mp3index];
          wx.playBackgroundAudio({
            dataUrl: tempFilePath
          });
        }

      });

    } else {
      //排错次数递增
      refer.data.allowClickIndex = refer.data.allowClickIndex + 1;
      if (refer.data.allowClickIndex == refer.data.allowClickNum) {
        //排序正确
        refer.setData({
          correctFlag: true
        });
        refer.data.allowClickIndex = 0;
        
        let tempFilePath = refer.data.mp3[refer.data.mp3index];
        wx.playBackgroundAudio({
          dataUrl: tempFilePath
        });
        wx.onBackgroundAudioStop(function () {
          refer.setData({
            mp3index: refer.data.mp3index + 1
          })
          if (refer.data.mp3index == 2) {
            let path = refer.data.originContent.sortdata.dropLetLink;
            app.globalData.dropLetId = refer.data.originContent.sortdata.reladropletid;
            app.globalData.dropLetConfigTypeId = refer.data.originContent.sortdata.reladropletconftypeid;
            wx.redirectTo({
              url: path
            });
          } else {
            let tempFilePath = refer.data.mp3[refer.data.mp3index];
            wx.playBackgroundAudio({
              dataUrl: tempFilePath
            });
          }

        });
        return
      }
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      console.log(tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
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
      indeximg: '../image/tabbar/2.png'
    });
    wx.redirectTo({
      url: '../page_016/page_016',
    });
  },
  movestart: function (e) {
    currindex = e.target.dataset.index;
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
    x1 = e.currentTarget.offsetLeft;
    y1 = e.currentTarget.offsetTop;
    //console.log(currindex+";"+x+";"+y+";"+x1+";"+y1);
  },
  move: function (e) {
    yy = e.currentTarget.offsetTop;
    x2 = e.touches[0].clientX - x + x1;
    y2 = e.touches[0].clientY - y + y1;
    this.setData({
      mainx: currindex,
      opacity: 1,
      start: { x: x2, y: y2 }
    })
  },
  moveend: function () {
    if (y2 != 0) {
      var arr = [];
      for (var i = 0; i < this.data.content.length; i++) {
        arr.push(this.data.content[i]);
      }
      var nx = this.data.content.length;
      n = 1;
      for (var k = 2; k < nx; k++) {
        if (y2 > (92 * (k - 1) + k * 2 - 26)) {
          n = k;
        }
      }
      if (y2 > (92 * (nx - 1) + nx * 2 - 26)) {
        n = nx;
      }
      //console.log(arr);
      //console.log(arr1)
      arr.splice((currindex - 1), 1);
      arr.splice((n - 1), 0, arr1[currindex - 1]);
      arr1 = [];
      for (var m = 0; m < this.data.content.length; m++) {
        //console.log(arr[m]);
        arr[m].num = m + 1;
        arr1.push(arr[m]);
      }
      // console.log(arr1);
      this.setData({
        mainx: "",
        content: arr,
        opacity: 1
      })
    }
  },
  onLoad: function () {
    let refer = this;
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/getSortData/getSortData/' + app.globalData.dropLetId + '/' + app.globalData.dropLetConfigTypeId,
      method: 'GET',
      success: function (res) {
        refer.setData({
          content: res.data.sortdata.sentence,
          originContent: res.data
        });
        arr1 = res.data.sortdata.sentence;
      }
    })

  },
  toBootomButton: function (e) {
    let refer = this;
    let csv0 = e.currentTarget.dataset.hi[0];
    let csv1 = e.currentTarget.dataset.hi[1];
    let csv2 = e.currentTarget.dataset.hi[2];
    app.globalData.dropLetId = csv1;
    app.globalData.dropLetConfigTypeId = csv2;
    wx.redirectTo({
      url: csv0,
    });
  },
  //保存用户得分
  saveUserScore: function (userid, index, dropletid, dropletconftypeid) {
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/subtask/saveScore',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        userid: userid,
        index: index,
        dropletid: dropletid,
        dropletconftypeid: dropletconftypeid,
        score: app.globalData.score
      },
      success: function (result) {
        console.log(result);
        if (result.code == "1") {
          app.globalData.score = 0;
        }
      }
    })
  }
})