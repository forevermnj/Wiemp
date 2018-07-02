
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionDateList: ["2018年4月30日", "2018年5月3日"],
    selectedDate: '',//选中的几月几号
    selectedWeek: '',//选中的星期几
    curYear: 2018,//当前年份
    curMonth: 4,//当前月份
    daysCountArr: [// 保存各个月份的长度，平年
      31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ],
    userTaskStartDate: '',
    userTaskEndDate:'',
    flag1:true,
    weekArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dateList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '打卡日历'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#43CF7C'
    })
    //retrive exercise record
    var today = new Date();//当前时间  
    var y = today.getFullYear();
    var mon = today.getMonth() + 1;
    var ym = y + '-' + (mon < 10 ? "0" + mon : mon);

    var refer = this;
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/studycalendar/query/' + uid + '/' + ym,
      method: 'GET',

      success: function (resz) {
        var days = resz.data.length;
        var tempActionDate = new Array(days);
        for (var i = 0; i < days; i++) {
          tempActionDate[i] = resz.data[i].stringDate
        }
        //console.log('call BE:');
        refer.setData({
          actionDateList: tempActionDate
        })

        /**
         * 请求用户任务的开始日期和结束日期
         */
        wx.request({
          url: app.globalData.serverUrl + '/Emp/mobile/studycalendar/queryDate/' + uid,
          method: 'GET',

          success: function (res) {
            
            refer.setData({
              userTaskStartDate: res.data.startDate,
              userTaskEndDate: res.data.endDate
            });
            var utd = res.data.startDate.split('-');
            var ued = res.data.endDate.split('-');
            
            /**
             * 不是当年的
             */
            if (y != utd[0]) {
              refer.setData({
                flag1: false
              });
            } else {
              let temput = utd[1];
              let temputd = temput.substring(1, 2);

              let tempt = ued[1];
              let tempt2 = tempt.substring(1, 2);
              //false 时页面变为白色
              if (temputd > mon) {
                refer.setData({
                  flag1: false
                });
              } else {
                if (tempt2 < mon) {
                  refer.setData({
                    flag1: false
                  });
                }
              }
            }
          },
          complete: function (res) {
            
          }
        });
      },
      complete: function (resz) {
        refer.getDateList(y, mon-1);
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
    var today = new Date();//当前时间  
    var y = today.getFullYear();//年  
    var mon = today.getMonth() + 1;//月  
    var d = today.getDate();//日  
    var i = today.getDay();//星期  
    var formatMonth = mon < 10 ? "0" + mon : mon;
    var formatDay = d < 10 ? "0" + d : d;
    var oneday = y + '-' + formatMonth + '-' + formatDay;
    this.setData({
      curYear: y,
      curMonth: mon,
      selectedDate: oneday,
      selectedWeek: this.data.weekArr[i]
    });

    this.getDateList(y, mon - 1);

  },

  getDateList: function (y, mon) {
    var vm = this;
    //如果是否闰年，则2月是29日
    var daysCountArr = this.data.daysCountArr;
    if (y % 4 == 0 && y % 100 != 0) {
      this.data.daysCountArr[1] = 29;
      this.setData({
        daysCountArr: daysCountArr
      });
    }
    //第几个月；下标从0开始实际月份还要再+1  
    var dateList = [];
    // console.log('本月', vm.data.daysCountArr[mon], '天');
    dateList[0] = [];
    var weekIndex = 0;//第几个星期
    for (var i = 0; i < vm.data.daysCountArr[mon]; i++) {
      var week = new Date(y, mon, (i + 1)).getDay();
      // 如果是新的一周，则新增一周
      if (week == 0) {
        weekIndex++;
        dateList[weekIndex] = [];
      }
      var formatMonth = (mon + 1) < 10 ? "0" + (mon + 1) : (mon + 1);
      var formatDay = (i + 1) < 10 ? "0" + (i + 1) : (i + 1);
      var oneday = y + '-' + formatMonth + '-' + formatDay;

      //var tf = vm.isactiondate(vm.data.actionDateList, oneday) ? 'a' : 'r'; //a use exercised date style,r for remaining day style
      var tf = vm.isactiondate(vm.data.actionDateList, oneday) ? 'a' : 'r'; //a use exercised date style,r for remaining day style

      // 如果是第一行，则将该行日期倒序，以便配合样式居右显示
      if (weekIndex == 0) {
        dateList[weekIndex].unshift({
          value: oneday,
          date: i + 1,
          week: week,
          flag: tf
        });
      } else {
        dateList[weekIndex].push({
          value: oneday,
          date: i + 1,
          week: week,
          flag: tf
        });
      }
    }
    //console.log('本月日期', dateList);
    vm.setData({
      dateList: dateList
    });
  },


  selectDate: function (e) {
    var vm = this;
    // console.log('选中', e.currentTarget.dataset.date.value);
    vm.setData({
      selectedDate: e.currentTarget.dataset.date.value,
      selectedWeek: vm.data.weekArr[e.currentTarget.dataset.date.week]
    });
  },

  isactiondate: function (/*<array>*/dataarray, oneday) {

    for (var i = 0; i < dataarray.length; i++) {
      if (dataarray[i] == oneday) return true;
    }
    return false;
  },

  preMonth: function () {
    // 上个月
    var vm = this;
    var curYear = vm.data.curYear;
    var curMonth = vm.data.curMonth;
    curYear = curMonth - 1 ? curYear : curYear - 1;
    curMonth = curMonth - 1 ? curMonth - 1 : 12;
    // console.log('上个月', curYear, curMonth);
    vm.setData({
      curYear: curYear,
      curMonth: curMonth
    });

    var refer = this;
    var uid = wx.getStorageSync('uid');
    var y = curYear;
    var mon = curMonth;
    var ym = y + '-' + (mon < 10 ? "0" + mon : mon);
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/studycalendar/query/' + uid + '/' + ym,
      method: 'GET',

      success: function (resz) {
        var days = resz.data.length;
        var tempActionDate = new Array(days);
        for (var i = 0; i < days; i++) {
          tempActionDate[i] = resz.data[i].stringDate
        }
        //console.log('call BE:');
        refer.setData({
          actionDateList: tempActionDate
        });
      },
      complete: function (resz) {
        refer.getDateList(y, mon - 1);
      }
    });

    let utd = vm.data.userTaskStartDate.split('-');
    let ued = vm.data.userTaskEndDate.split('-');

    /**
     * 不是当年的
     */
    if (curYear!=utd[0]){
      refer.setData({
        flag1: false
      });
    }else{
      let temput = utd[1];
      let temputd = temput.substring(1, 2);

      let tempt = ued[1];
      let tempt2 = tempt.substring(1, 2);
      //false 时页面变为白色
      if (temputd > curMonth){
         vm.setData({
           flag1:false
         })
      } else {
        if (tempt2 >= curMonth){
          vm.setData({
            flag1: true
          })
        }
      }
    }

    vm.getDateList(curYear, curMonth - 1);
  },
  nextMonth: function () {
    // 下个月
    var vm = this;
    var curYear = vm.data.curYear;
    var curMonth = vm.data.curMonth;
    curYear = curMonth + 1 == 13 ? curYear + 1 : curYear;
    curMonth = curMonth + 1 == 13 ? 1 : curMonth + 1;
    // console.log('下个月', curYear, curMonth);
    vm.setData({
      curYear: curYear,
      curMonth: curMonth
    });

    var refer = this;
    var uid = wx.getStorageSync('uid');
    var y = curYear;
    var mon = curMonth;
    var ym = y + '-' + (mon < 10 ? "0" + mon : mon);
    wx.request({
      url: app.globalData.serverUrl + '/Emp/mobile/studycalendar/query/' + uid + '/' + ym,
      method: 'GET',

      success: function (resz) {
        var days = resz.data.length;
        var tempActionDate = new Array(days);
        for (var i = 0; i < days; i++) {
          tempActionDate[i] = resz.data[i].stringDate
        }
        //console.log('call BE:');
        refer.setData({
          actionDateList: tempActionDate
        });
      },
      complete: function (resz) {
        refer.getDateList(y, mon - 1);
      }
    });


    let utd = vm.data.userTaskStartDate.split('-');
    let ued = vm.data.userTaskEndDate.split('-');
    /**
    * 不是当年的
    */
    if (curYear != ued[0]) {
      refer.setData({
        flag1: false
      });
    } else {
      let temput = ued[1];
      let temputd = temput.substring(1, 2);
      
      let tempt = utd[1];
      let tempt2 = tempt.substring(1, 2);
      if (temputd < curMonth) {
        vm.setData({
          flag1: false
        })
      }else{
        if (tempt2 <= curMonth){
          vm.setData({
            flag1: true
          })
        }
        
      }
    }

    vm.getDateList(curYear, curMonth - 1);
  }
})