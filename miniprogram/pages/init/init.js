//index.js
//var QQMapWX = require("../../utils/qqmap-wx-jssdk.js");
//var qqmapsdk;

const app = getApp()

var pageData = {}
for (var i = 1; i <= 1; ++i) {
  (function (index) {
    pageData[`slider`] = function (e) {
      console.log(`slider${index}发生change事件，携带值为`, e.detail.value)
      this.setData({
        peopleNum: e.detail.value
      })
    }
  })(i);
}


Page({
  data: {
    // slider
    min: 0,
    max: 9,
    value: 0, // number

    selectShow: false,
    selectData: ['游戏', '拼单', '自习', '聚餐', '电影', '拼车', '其他'],
    selectedTopic: '游戏',
    index: 0,

    date: '2021-01-05',
    time: '21:21',
    posSrc:"../../images/icons/position.svg"
  },
  // change date and time
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  // select activity type
  selectTap: function(e) {
    this.setData({
      selectShow: !this.data.selectShow
    })
  },
  optionTap: function(e) {
    let Index = e.currentTarget.dataset.index;
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow,
      selectedTopic: this.data.selectData[Index]
    });
    console.log(this.data.selectedTopic);
  },
  // slider
  sliderChange: function(e) {
    var value = e.detail.value;
    this.setData({
      value: value
    })
  },
  sliderChanging: function(e) {
    var value = e.detail.value;
    this.setData({
      value: value
    })
  },

  formSubmit: function(e) {
    const db = wx.cloud.database();
    console.log(this.data);
    console.log(e.detail.value);
    this.setData({
      name: e.detail.value.name,
      detail: e.detail.value.details,
      region: e.detail.value.region,
    })
    db.collection("set").add({
      data: {
        founder: app.globalData.name,
        sex: app.globalData.sex,
        name: this.data.name,
        detail: this.data.detail,
        sum: this.data.value,
        date: this.data.date,
        time: this.data.time,
        type: this.data.selectedTopic,
        region: this.data.region,
        prog: 0,
      },
      success: res => {
        this.setData({
          uid: res._id,
        })
        wx.showToast({
          title: '发起成功',
        })
        console.log("database user ADD success, uid: ", res._id);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '发起失败'
        })
        console.log("database user ADD failed: ", err);
      }
    })
  },

  //事件处理函数
  onLoad: function () {
   // this.getUserLocation();
  },
  getUserLocation: function() {
    let vm = this;
    wx.getSetting({
      success: (res)=> {
        console.log("设置信息" + JSON.stringify(res));
        if (res.authSetting['scope.userLocation']!=undefined
         && res.authSetting['scope.userLocation']!=true) {
           wx.showModal({
             title: "请求授权位置",
             content: "需要获取您的地理位置，请确认授权",
             success: function(res) {
               if (res.cancel) {
                 wx.showToast({
                   title: '拒绝授权',
                   icon: 'none',
                   duration: 1000
                 })
               } else if (res.confirm) {
                 wx.openSetting({
                   success: function(dataAu) {
                     if (dataAu.authSetting['scope.userLocation'] == true) {
                       wx.showToast({
                         title: '授权成功',
                         icon: 'success',
                         duration: 1000
                       })
                       vm.getLocation();
                     } else {
                       wx.showToast({
                         title: '授权失败',
                         icon: 'none',
                         duration: 1000
                       })
                     }
                   }
                 })
               }
             }
           })
         } else if (res.authSetting['scope.userLocation']==undefined) {
           vm.getLocation();
         } else {
           vm.getLocation();
         }
      },
    })
  },

  // weixin get location API
  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(JSON.stringify(res));
        var latitude = res.latitude;
        var longitude = res.longitude;
        vm.getLocal(latitude, longitude);
      },
      fail: function(res) {
        console.log('fail'+JSON.stringify(res));
      }
    })
  },
  // get location
  getLocal: function(latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })
      }
    })

  }
})
