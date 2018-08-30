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
      pro:
        [
          { tit: 'We can measure', correct: '', num: 0, ifem: false },
          { tit: '______', correct: 'with', num: 1, ifem: true },
          { tit: 'the corner of eyes', correct: '', num: 2, ifem: false },
          { tit: '______', correct: 'to', num: 3, ifem: true },
          { tit: 'judge others when stand in a circle', correct: '', num: 4, ifem: false }
        ],
      emptyposition: [1, 3],
      answer:
        [
          { subnum: 0, tit: 'with' },
          { subnum: 1, tit: 'to' },
          { subnum: 2, tit: '/' },
          { subnum: 3, tit: 'by' }
        ]
    },
      {
        pro:
          [
            { tit: 'There is no apparent', correct: '', num: 0, ifem: false },
            { tit: '______', correct: 'leader', num: 1, ifem: true },
            { tit: 'or', correct: '', num: 2, ifem: false },
            { tit: '______', correct: 'subordinate', num: 3, ifem: true },
            { tit: 'in the meeting', correct: '', num: 4, ifem: false }

          ],
        emptyposition: [1, 3],
        answer:
          [
            { subnum: 0, tit: 'leader' },
            { subnum: 1, tit: 'subordinate' },
            { subnum: 2, tit: 'teacher' },
            { subnum: 3, tit: 'student' },
            { subnum: 4, tit: 'boss' },
            { subnum: 5, tit: 'employee' }
          ]
      },
      {
        pro:
          [
            { tit: 'What', correct: '', num: 0, ifem: false },
            { tit: '______', correct: 'obstacles', num: 1, ifem: true },
            { tit: 'are', correct: '', num: 2, ifem: false },
            { tit: '______', correct: 'impeding', num: 3, ifem: true },
            { tit: 'your progress?', correct: '', num: 4, ifem: false }

          ],
        emptyposition: [1, 3],
        answer:
          [
            { subnum: 0, tit: 'obstacles' },
            { subnum: 1, tit: 'impeding' },
            { subnum: 2, tit: 'barriers' },
            { subnum: 3, tit: 'impede' },
            { subnum: 4, tit: 'problems' },
            { subnum: 5, tit: 'stopping' }
          ]

      },
      {
        pro:
          [
            { tit: 'Today I am working', correct: '', num: 0, ifem: false },
            { tit: '______', correct: 'on', num: 1, ifem: true },
            { tit: 'passing the request parameters', correct: '', num: 2, ifem: false },
            { tit: '______', correct: 'to', num: 3, ifem: true },
            { tit: 'the interface search code', correct: '', num: 4, ifem: false }

          ],
        emptyposition: [1, 3],
        answer:
          [
            { subnum: 0, tit: 'on' },
            { subnum: 1, tit: 'to' },
            { subnum: 2, tit: 'for' },
            { subnum: 3, tit: 'of' },
            { subnum: 4, tit: 'out' }
          ]


      }],
    dataIndex:0,
    data:[
      {
        pro:
        [
          { tit: 'We can measure', correct: '', num: 0, ifem:false},
          { tit: '______', correct: 'with', num: 1, ifem:true},
          { tit: 'the corner of eyes', correct: '', num: 2, ifem:false},
          { tit: '______', correct: 'to', num: 3, ifem:true},
          { tit: 'judge others when stand in a circle', correct: '', num: 4, ifem:false}
        ],
        emptyposition: [1, 3],
        answer:
        [
          { subnum: 0, tit: 'with'},
          { subnum: 1, tit: 'to'},
          { subnum: 2, tit: '/'},
          { subnum: 3, tit: 'by'}
        ]
      },
      {
        pro:
        [
          { tit: 'There is no apparent', correct: '', num: 0, ifem:false},
          { tit: '______', correct: 'leader', num: 1, ifem: true},
          { tit: 'or', correct: '', num: 2, ifem: false},
          { tit: '______', correct: 'subordinate', num: 3, ifem:true},
          { tit: 'in the meeting', correct: '', num: 4, ifem: false}
        
        ],
        emptyposition: [1, 3],
        answer:
        [
          { subnum:0, tit: 'leader'},
          { subnum:1, tit: 'subordinate' },
          { subnum:2, tit: 'teacher' },
          { subnum:3, tit: 'student' },
          { subnum:4, tit: 'boss' },
          { subnum:5, tit: 'employee' }
        ]
      },
      {
        pro:
        [
            { tit:'What',correct:'',num:0,ifem:false},
            { tit: '______', correct: 'obstacles', num:1, ifem:true},
            { tit: 'are', correct: '', num:2, ifem:false},
            { tit: '______', correct: 'impeding', num:3, ifem:true},
            { tit: 'your progress?', correct: '', num:4, ifem:false}
        
        ],
        emptyposition: [1, 3],
        answer:
        [
            { subnum: 0, tit: 'obstacles' },
            { subnum: 1, tit: 'impeding' },
            { subnum: 2, tit: 'barriers' },
            { subnum: 3, tit: 'impede' },
            { subnum: 4, tit: 'problems' },
            { subnum: 5, tit: 'stopping' }
        ]
         
      },
      {
        pro:
        [
            { tit:'Today I am working',correct:'',num:0,ifem:false},
            { tit: '______', correct: 'on', num:1, ifem:true},
            { tit: 'passing the request parameters', correct: '', num:2, ifem:false},
            { tit: '______', correct: 'to', num:3, ifem:true},
            { tit: 'the interface search code', correct: '', num:4, ifem:false}
        
        ],
      emptyposition: [1, 3],
        answer:
          [
            { subnum: 0, tit: 'on' },
            { subnum: 1, tit: 'to' },
            { subnum: 2, tit: 'for' },
            { subnum: 3, tit: 'of' },
            { subnum: 4, tit: 'out' }
          ]
        
       
      }
    ],
    chooseResult:[],
    chooseResultIndex:[],
    emptypositionIndex:0,
    allowClickNum:3,
    allowClickIndex:0,
    which_sel:-1,
    flag1:false,
    ifsubflag:false,
    temp:[],
    indeximg: '../image/tabbar/2.png',
    previousImg: '../image/tabbar/13.png'
  },
  clickEmpty: function (e) {
     let refer = this;
     let csv0 = e.currentTarget.dataset.hi[0];
     let csv1 = e.currentTarget.dataset.hi[1];
     //console.log('点击空位'+csv0+'点击空位'+csv1);
     /**
      * 选择的答案数组重构
      */
     let temp_array = new Array();
     for(let i=0;i<refer.data.chooseResult.length;i++){
          if (refer.data.chooseResult[i] == csv0){

          }else{
            temp_array.push(refer.data.chooseResult[i]);
          }
     }
     refer.setData({
       chooseResult: temp_array
     })

     /**
      * 问题重构
      */
    //替换空内容
    let temp_correct = refer.data.data[refer.data.dataIndex].pro[csv1].correct;
    let temp_num = refer.data.data[refer.data.dataIndex].pro[csv1].num;
    let temp_ifem = refer.data.data[refer.data.dataIndex].pro[csv1].ifem;

    refer.data.data[refer.data.dataIndex].pro.splice(
      csv1,
      1,
      { tit: '______', correct: temp_correct, num: temp_num, ifem: temp_ifem },
    );
    // console.log('替换完成' + refer.data.data[refer.data.dataIndex].pro[0].tit);
    // console.log('替换完成' + refer.data.data[refer.data.dataIndex].pro[1].tit);
    // console.log('替换完成' + refer.data.data[refer.data.dataIndex].pro[2].tit);
    // console.log('替换完成' + refer.data.data[refer.data.dataIndex].pro[3].tit);
    // console.log('替换完成' + refer.data.data[refer.data.dataIndex].pro[4].tit);
    let data_temp = new Array();
    for (let n = 0; n < refer.data.data.length; n++) {
      if (refer.data.dataIndex == n) {
        data_temp.push(
          {
            pro: refer.data.data[refer.data.dataIndex].pro,
            emptyposition: refer.data.data[refer.data.dataIndex].emptyposition,
            answer: refer.data.data[refer.data.dataIndex].answer
          }
        );
      } else {
        data_temp.push(refer.data.data[n]);
      }
    }
    console.log('空位下标' + refer.data.emptypositionIndex);

    /**
     * 判断哪个空位下标被选中
     */
    for (let k = 0; k < refer.data.data[refer.data.dataIndex].emptyposition.length;k++){
      if (refer.data.data[refer.data.dataIndex].emptyposition[k] == csv1){
         //此下标被选中
         console.log('此下标被选中'+k);
         refer.data.which_sel = k;
      }
    }
    if(refer.data.chooseResult.length==0){
      refer.setData({
        emptypositionIndex: 0,
        chooseResult: refer.data.chooseResult,
        data: data_temp,
        which_sel:-1
      });
    }else{
      refer.setData({
        chooseResult: refer.data.chooseResult,
        data: data_temp
      });
    }
    


  },
  check:function(e){
      let refer = this;
      refer.setData({
        ifsubflag:true
      })
      
      if(refer.data.anwdata[refer.data.anwdataIndex].correct1==refer.data.chooseResult[0] && refer.data.anwdata[refer.data.anwdataIndex].correct2==refer.data.chooseResult[1]
      ){
        console.log('选择正确'+refer.data.dataIndex);
        let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
        wx.playBackgroundAudio({
          dataUrl: tempFilePath
        });
        if (refer.data.dataIndex == 1 || refer.data.dataIndex==3){
          setTimeout(function () {
            wx.redirectTo({
              url: '../page_015/page_015',
            });
          }.bind(refer), 1000);
          return
          
        }
        refer.setData({
          anwdataIndex:refer.data.anwdataIndex+1,
          dataIndex:refer.data.dataIndex+1,
          emptypositionIndex:0,
          chooseResult:[],
          flag1:false
        });
        //app.globalData.dataIndex = app.globalData.dataIndex+1;
        //app.globalData.anwdataIndex = app.globalData.anwdataIndex+1;
      } else {
        //允许选错的次数递增
        refer.data.allowClickIndex = refer.data.allowClickIndex + 1;
        if(refer.data.allowClickIndex == refer.data.allowClickNum){
            console.log('选错三次');
          if (refer.data.dataIndex == 1 || refer.data.dataIndex == 3) {
            for (let n = 0; n < refer.data.data[refer.data.dataIndex].emptyposition.length; n++) {
              let temp_correct = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[n]].correct;
              let temp_num = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[n]].num;
              let temp_ifem = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[n]].ifem;

              refer.data.data[refer.data.dataIndex].pro.splice(
                refer.data.data[refer.data.dataIndex].emptyposition[n],
                1,
                { tit: temp_correct, correct: temp_correct, num: temp_num, ifem: temp_ifem },
              );
            }

            let data_temp = new Array();
            for (let n = 0; n < refer.data.data.length; n++) {
              if (refer.data.dataIndex == n) {
                data_temp.push(
                  {
                    pro: refer.data.data[refer.data.dataIndex].pro,
                    emptyposition: refer.data.data[refer.data.dataIndex].emptyposition,
                    correct: refer.data.data[refer.data.dataIndex].correct,
                    answer: refer.data.data[refer.data.dataIndex].answer
                  }
                );
              } else {
                data_temp.push(refer.data.data[n]);
              }
            }
            refer.setData({

              data: data_temp
            });
            setTimeout(function () {
              refer.setData({
                anwdataIndex: refer.data.anwdataIndex + 1,
                dataIndex: refer.data.dataIndex + 1,
                emptypositionIndex: 0,
                chooseResult: [],
                flag1: false,
                allowClickIndex: 0
              });
            }.bind(refer), 1300);

            let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
            wx.playBackgroundAudio({
              dataUrl: tempFilePath
            });
            refer.setData({
              //chooseResult: [],
              //data:refer.data.datainit,
              which_sel: -1,
              //emptypositionIndex:0,
              flag1: false
            });
            
            
            
            setTimeout(function () {
              wx.redirectTo({
                url: '../page_015/page_015',
              });
            }.bind(refer), 1300);
            return

          }
          for (let n = 0; n < refer.data.data[refer.data.dataIndex].emptyposition.length;n++){
            let temp_correct = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[n]].correct;
            let temp_num = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[n]].num;
            let temp_ifem = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[n]].ifem;

            refer.data.data[refer.data.dataIndex].pro.splice(
              refer.data.data[refer.data.dataIndex].emptyposition[n],
              1,
              { tit: temp_correct, correct: temp_correct, num: temp_num, ifem: temp_ifem },
            );
          }
          
          let data_temp = new Array();
          for (let n = 0; n < refer.data.data.length; n++) {
            if (refer.data.dataIndex == n) {
              data_temp.push(
                {
                  pro: refer.data.data[refer.data.dataIndex].pro,
                  emptyposition: refer.data.data[refer.data.dataIndex].emptyposition,
                  correct: refer.data.data[refer.data.dataIndex].correct,
                  answer: refer.data.data[refer.data.dataIndex].answer
                }
              );
            } else {
              data_temp.push(refer.data.data[n]);
            }
          }
          refer.setData({
            
            data: data_temp
          });
          setTimeout(function () {
            refer.setData({
              anwdataIndex: refer.data.anwdataIndex + 1,
              dataIndex: refer.data.dataIndex + 1,
              emptypositionIndex: 0,
              chooseResult: [],
              flag1: false,
              allowClickIndex: 0
            });
          }.bind(refer), 1300);
          
          let tempFilePath = app.globalData.serverUrl + '/Emp/mobile/mp3/3.mp3';
          wx.playBackgroundAudio({
            dataUrl: tempFilePath
          });
          refer.setData({
            //chooseResult: [],
            //data:refer.data.datainit,
            which_sel: -1,
            //emptypositionIndex:0,
            flag1: false
          });
        }
        
      }
  },
  chooseAnswer:function(e){
    let refer = this;
    refer.setData({
      ifsubflag:false
    })
    let csv0 = e.currentTarget.dataset.hi[0];
    let csv1 = e.currentTarget.dataset.hi[1];
    console.log('标志'+refer.data.which_sel);
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
      refer.data.chooseResult.push(csv1);
      refer.data.chooseResultIndex.push(csv0);
      if (refer.data.chooseResult.length == 2) {
        refer.setData({
          flag1: true
        });
      }
      //替换空内容
      if (refer.data.which_sel != -1){
        if (refer.data.which_sel == 1) {
          let temp_correct = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[refer.data.which_sel]].correct;

          let temp_num = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[refer.data.which_sel]].num;

          let temp_ifem = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[refer.data.which_sel]].ifem;

          refer.data.data[refer.data.dataIndex].pro.splice(
            refer.data.data[refer.data.dataIndex].emptyposition[refer.data.which_sel],
            1,
            { tit: csv1, correct: temp_correct, num: temp_num, ifem: temp_ifem },
          );
        } else {
          let temp_correct = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[0]].correct;

          let temp_num = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[0]].num;

          let temp_ifem = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[0]].ifem;

          refer.data.data[refer.data.dataIndex].pro.splice(
            refer.data.data[refer.data.dataIndex].emptyposition[0],
            1,
            { tit: csv1, correct: temp_correct, num: temp_num, ifem: temp_ifem },
          );
        }
      }else{
        let temp_correct = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[refer.data.emptypositionIndex]].correct;

        let temp_num = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[refer.data.emptypositionIndex]].num;

        let temp_ifem = refer.data.data[refer.data.dataIndex].pro[refer.data.data[refer.data.dataIndex].emptyposition[refer.data.emptypositionIndex]].ifem;

        refer.data.data[refer.data.dataIndex].pro.splice(
          refer.data.data[refer.data.dataIndex].emptyposition[refer.data.emptypositionIndex],
          1,
          { tit: csv1, correct: temp_correct, num: temp_num, ifem: temp_ifem },
        );
      }
      


      

      if (refer.data.chooseResult.length < 1) {
        // refer.setData({
        //   emptypositionIndex: refer.data.emptypositionIndex + 1,
        //   chooseResult: refer.data.chooseResult,
        //   data: [
        //     { tit: refer.data.data[refer.data.dataIndex].tit, emptyposition: [1, 3] },
        //     { tit: refer.data.data[refer.data.dataIndex + 1].tit, emptyposition: [1, 3] }
        //   ]
        // });
      } else {
        let data_temp = new Array();
        for(let n=0;n<refer.data.data.length;n++){
            if (refer.data.dataIndex==n){
              data_temp.push(
                { 
                  pro: refer.data.data[refer.data.dataIndex].pro,
                  emptyposition: refer.data.data[refer.data.dataIndex].emptyposition,
                  correct: refer.data.data[refer.data.dataIndex].correct,
                  answer: refer.data.data[refer.data.dataIndex].answer
                }
              );
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
