// pages/list/list.js
//var actslist=require("../../datas/actsdata/acts");
var ziXi=0, pinChe=0, dianYing=0, juCan=0, youXi=0, qiTa=0, quanBu=0;
var pinDan=0;
var total;
// total=actslist.acts.length;
quanBu=total;
var acts;
var i;
console.log(pinDan);
console.log(pinChe);
console.log(youXi);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    help: "攒局帮助手册",
    top: 0,
    mode: 0,
    headImg: [
      '../../images/icons/sun.svg', '../../images/icons/moon2.svg'
    ]
  },
  modeChange: function() {
    var mode = this.data.mode;
    this.setData({
      mode: mode?0:1
    })
  },
  viewHelp: function()
  {
    console.log("帮助");
    wx.navigateTo({
      url: '../help/help',
    })
  },
   //控制回到顶部按钮的显示与消失
   onPageScroll: function (e) {//监听页面滚动
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  readColor: function(e){
    console.log(e.currentTarget.index);
    var ids= e.currentTarget.dataset.id;
    console.log('id:',ids);
    this.setData({
      id:ids
    })
  },
  getType: function(e)
  {
    var newacts={};
    var index=0;
    if(e.detail.typeDetail!='全部') {
       for(i=0;i<acts.length;i++) {
      if(acts[i].type==e.detail.typeDetail) {
        newacts[index++]=acts[i];
      }
    }
    console.log(newacts);
    this.setData({
        acts: newacts
      })
    }
    else{
      this.setData({
        acts: acts
      })
    }
    
    console.log(e.detail.typeDetail);
  },
  handleClick: function(e){
    const child=this.selectComponent('#typelist');
    console.log(child);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("活动数量为:"+total);
  },
  getParticipate: function() {
    const db = wx.cloud.database();
    db.collection("set").field({
      name: true,
      type: true,
      detail: true,
      region: true,
      date: true,
      time: true,
      sum: true,
      prog: true,
      founder: true,
      sex: true,
    }).get({
      success: res => {
        let actslist = [];
        res.data.forEach(function (item, index) {
          let participateEle = {
            _id: item._id,
            name: item.name,
            type: item.type,
            detail: item.detail,
            region: item.region,
            date: item.date,
            time: item.time,
            sum: item.sum,
            prog: item.prog,
            founder: item.founder,
            sex: item.sex
          };
          actslist.push(participateEle)
        })
        total = actslist.length;
        quanBu = actslist.length;
        acts = actslist;
        ziXi=0, pinChe=0, dianYing=0, juCan=0, youXi=0, qiTa=0, pinDan = 0;
        var i;
        for(i=0;i<total;i++) {
          if(acts[i].type=="拼单")
            pinDan++;
          if(acts[i].type=="拼车")
            pinChe++;
          if(acts[i].type=="自习")
            ziXi++;
          if(acts[i].type=="电影")
            dianYing++;
          if(acts[i].type=="聚餐")
            juCan++;
          if(acts[i].type=="其他")
            qiTa++;
          if(acts[i].type=="游戏")
            youXi++;
        }
        this.creatTypes()
        this.setData({
          acts: actslist,
          total: actslist.length
        })
      },
      fail: err => {
        wx.showToast({
          title: 'Query record failed',
          icon: 'none'
        })
      }
    })
  },

  creatTypes() {
    var types = [
      {
        "index":'0',
        "src":"../../images/all.png",
        "type":"全部",
        "number": quanBu
      },
      {
        "index":'1',
        "src":"../../images/game.png",
        "type":"游戏",
        "number": youXi
      },
      {
        "index":'2',
        "src":"../../images/pindan.png",
        "type": "拼单",
        "number": pinDan
      },
      {
        "index":'3',
        "src":"../../images/book.png",
        "type": "自习",
        "number": ziXi
      },
      {
        "index":'4',
        "src":"../../images/eat.png",
        "type": "聚餐",
        "number": juCan
      },
      {
        "index":'5',
        "src":"../../images/movie.png",
        "type": "电影",
        "number": dianYing
      },
      {
        "index":'6',
        "src":"../../images/car.png",
        "type": "拼车",
        "number": pinChe
      },
      {
        "index":'7',
        "src":"../../images/other.png",
        "type": "其他",
        "number": qiTa
      }
    ];
    this.setData({
      types: types
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
    this.getParticipate();
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
    wx.showNavigationBarLoading();
    this.getParticipate();
    this.creatTypes();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();   
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