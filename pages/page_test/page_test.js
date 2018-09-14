
const App = getApp()

Page({
  data: {
    itemData: []
  },
  touchS: function (e) {  // touchstart
    console.log('开始滑动');
    let startX = App.Touches.getClientX(e)
    startX && this.setData({ startX })
  },
  touchM: function (e) {  // touchmove
    let itemData = App.Touches.touchM(e, this.data.itemData, this.data.startX)
    console.log(itemData);
    itemData && this.setData({ itemData })

  },
  touchE: function (e) {  // touchend
    const width = 150  // 定义操作列表宽度
    let itemData = App.Touches.touchE(e, this.data.itemData, this.data.startX, width)
    itemData && this.setData({ itemData })
  },
  itemDelete: function (e) {  // itemDelete
    let itemData = App.Touches.deleteItem(e, this.data.itemData)
    itemData && this.setData({ itemData })
  },
  onLoad: function () {
    let refer = this;
    wx.request({
      url: App.globalData.serverUrl + '/Emp/mobile/getCourse/getCourse/',
      method: 'GET',
      success: function (res) {
        refer.setData({
          itemData: res.data
        });
        console.log(res);
      }
    });
  }
})