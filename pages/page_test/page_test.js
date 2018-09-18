
Page({
  data: {
    src: 'https://www.learnzp.com/Emp/mobile/page_019/1.png',
    animationData: ''
  },
  touchmove: function (e) {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
    })

    this.animation = animation

    animation.scale(1, 1).rotate(-45).step();

    this.setData({
      animationData: animation.export()
    })
  },
  touchend: function (e) {
   
  }
})