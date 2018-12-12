Component({
  properties: {
    itemList: {
      type: Array,
      value: "",
      observer: function(newVal, oldVal) { }
    },
    showDrop: Boolean  //是否显示drop down， false 不显示 true 显示
  },
  data: {
    selectOption:{id:"", name:"--Option--", index:""},
    downImage: '../../pages/image/tabbar/47.png',
    upImage:'../../pages/image/tabbar/48.png'
  },
  methods: {
    showItemData() {
      this.setData({
        showDrop: !this.data.showDrop
      })
      this.triggerEvent('drop');
    },
    selectItem(e) {
      // console.log(e)
      let item = e.currentTarget.dataset.selectitem;
      this.setData({
        showDrop: false,
        selectOption: item
      });
      this.triggerEvent('myget', item); //将选中的值传回页面
    }
  }
})