//var t = getApp().globalData.memwords

Page({
  data: {
    motto: ''
  },
  onLoad:function(){
    this.setData({
      motto: getApp().globalData.memwords
    })
  },
  speech:function(){
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.src = 'https://tsn.baidu.com/text2audio?tex=Sun&per=4&spd=5&pit=5&vol=5&cuid=10962256&tok=24.84c05932a09286e7a5d7bceb9f70c651.2592000.1525852595.282335-10854623&lan=zh&ctp=1' // 设置了 src 之后会自动播放 
  }
})