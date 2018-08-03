var app = getApp();
var x, y, x1, y1, x2, y2, index, currindex, n, yy;
var arr1 =
  [
    { content: 'Global warming is the result of an increase in carbon gases in our atmosphere.', id: 1 ,key:1},
    { content: 'As a result,sea levels are rising and weather patterns are changing. ', id: 2, key: 2},
    { content: 'These gases trap heat from the sun,so the Earth is getting warmer.', id: 3, key: 3},
    { content: 'In addition,we humans are destroying the habitats of many plants and animals.', id: 4, key: 4}
  ];
Page({
  data: {
    mainx: 0,
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png',
    content: [
      { content: 'Global warming is the result of an increase in carbon gases in our atmosphere.', id: 1, key: 1},
      { content: 'As a result,sea levels are rising and weather patterns are changing. ', id: 2, key: 2},
      { content: 'These gases trap heat from the sun,so the Earth is getting warmer.', id: 3, key: 3},
      { content: 'In addition,we humans are destroying the habitats of many plants and animals.', id: 4, key: 4}
    ],
    start: { x: 0, y: 0 },
    correctFlag:false
  },
  toSubmit:function(){
     let refer = this;
     //console.log('提交');
     //console.log(refer.data.content);
    if (
      refer.data.content[0].key==4 &&
      refer.data.content[1].key==1 &&
      refer.data.content[2].key==2 &&
      refer.data.content[3].key==3
      ){
         //排序正确
         refer.setData({
           correctFlag:true
         });
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
      setTimeout(function () {
        wx.redirectTo({
          url: '../page_018/page_018',
        });
      }.bind(refer), 1000);
    }else{
      let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/2.mp3';
      console.log(tempFilePath);
      wx.playBackgroundAudio({
        dataUrl: tempFilePath
      });
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
        if (y2 > (82 * (k - 1) + k * 2 - 26)) {
          n = k;
        }
      }
      if (y2 > (82 * (nx - 1) + nx * 2 - 26)) {
        n = nx;
      }
      //console.log(arr);
      //console.log(arr1)
      arr.splice((currindex - 1), 1);
      arr.splice((n - 1), 0, arr1[currindex - 1]);
      arr1 = [];
      for (var m = 0; m < this.data.content.length; m++) {
        //console.log(arr[m]);
        arr[m].id = m + 1;
        arr1.push(arr[m]);
      }
      // console.log(arr1);
      this.setData({
        mainx: "",
        content: arr,
        opacity: 1
      })
    }
  }
})