// pages/page_003/page_003.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortorder: "descend", //ascend|descend
    buttonname: "时间倒序", //时间顺序|时间倒序
    wordlist: [ //后台数据需按照时间倒序排序
      {
        word: "monochrome",
        pronunc: "ˈmɑnəkroʊm",
        trans: "adj.  单色的，黑白的;"
      }, {
        word: "monochrometer",
        pronunc: "mɒnoʊ'krɒmɪtə",
        trans: "n.  单色仪[器]，单色光镜，单能化器;"
      }, {
        word: "monochrome band",
        pronunc: "ˈmɑnəˌkrom bænd",
        trans: "黑白波段，单色波段;"
      }, {
        word: "monochrome film",
        pronunc: "ˈmɑnəˌkrom fɪlm",
        trans: "单色胶卷;"
      }, {
        word: "monochrome scale",
        pronunc: "ˈmɑnəˌkrom skel",
        trans: "单色刻度盘，黑白标度;"
      },
      {
        word: "monochrome",
        pronunc: "ˈmɑnəkroʊm",
        trans: "adj.  单色的，黑白的;"
      }, {
        word: "monochrometer",
        pronunc: "mɒnoʊ'krɒmɪtə",
        trans: "n.  单色仪[器]，单色光镜，单能化器;"
      }, {
        word: "monochrome band",
        pronunc: "ˈmɑnəˌkrom bænd",
        trans: "黑白波段，单色波段;"
      }, {
        word: "monochrome film",
        pronunc: "ˈmɑnəˌkrom fɪlm",
        trans: "单色胶卷;"
      }, {
        word: "monochrome scale",
        pronunc: "ˈmɑnəˌkrom skel",
        trans: "单色刻度盘，黑白标度;"
      },
      {
        word: "monochrome",
        pronunc: "ˈmɑnəkroʊm",
        trans: "adj.  单色的，黑白的;"
      }, {
        word: "monochrometer",
        pronunc: "mɒnoʊ'krɒmɪtə",
        trans: "n.  单色仪[器]，单色光镜，单能化器;"
      }, {
        word: "monochrome band",
        pronunc: "ˈmɑnəˌkrom bænd",
        trans: "黑白波段，单色波段;"
      }, {
        word: "monochrome film",
        pronunc: "ˈmɑnəˌkrom fɪlm",
        trans: "单色胶卷;"
      }, {
        word: "monochrome scale",
        pronunc: "ˈmɑnəˌkrom skel",
        trans: "单色刻度盘，黑白标度;"
      }

    ]
  },

  changeorder: function () {
    var original = this.data.wordlist;
    var arraylength = original.length;
    var converted = new Array(arraylength);

    for (var i = arraylength - 1, j = 0; j < arraylength; i-- , j++) {
      converted[j] = original[i];
    }
    
    if (this.data.sortorder == "descend") {
      this.setData({
        sortorder: "ascend",
        buttonname: "时间顺序",
        wordlist: converted
      })
    } else if (this.data.sortorder == "ascend") {
      this.setData({
        sortorder: "descend",
        buttonname: "时间倒序",
        wordlist: converted
      })
    }
    //console.log(this.data.wordlist)
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '易错单词'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#43CF7C'
    })

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