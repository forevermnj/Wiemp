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

    //backgroundAudioManager.title = '此时此刻'
    //backgroundAudioManager.epname = '此时此刻'
    //backgroundAudioManager.singer = '汪峰'
   // backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    backgroundAudioManager.src = 'https://aisss5ct.qcloud.la/learn/user/down/media' // 设置了 src 之后会自动播放 
  }
})