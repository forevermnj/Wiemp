//page_001.js
Page({
  data: {
    word: 'Good'
  },
  onLoad:function(){
    
  },
  //单词发声
  speech:function(){
    wx.request({
      url: 'https://aisss5ct.qcloud.la/Emp/mobile/word/pronunciation/'+this.data.word,
      method: 'GET',
      success: function (res) {
        //console.log(res.data);
        const backgroundAudioManager = wx.getBackgroundAudioManager()
        backgroundAudioManager.src = res.data //设置了src之后会自动播放 
      }
    })
  },
  //手指滑动开始
  slidStart:function(){
    
  },
  //手指滑动后
  slidAfter:function(){
    this.setData({
      word: 'Sun'
    })
  },
  //手指滑动结束
  slidEnd:function(){

  }
})