//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    vip: '百年超极大会员',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    likeList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../userInfoDetail/userInfoDetail'
    })
  },
  onShow: function() {
    this.getParticipate();
    this.getFounder();
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          console.log(res)
        }
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getWXUserInfo() {
    console.log(this.data.userInfo)
  },

  getParticipate: function() {
    wx.cloud.callFunction({
      name: 'openid'
    }).then( r =>{
      console.log("openid GET success, uid: ", r);
      const db = wx.cloud.database();
      db.collection("set").where({
        participates_openid: r.result.openid,
      }).get({
        success: res => {
          let participateDb = [];
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
              sex: item.sex
            };
            participateDb.push(participateEle)
          })
          this.setData({
            participateList: participateDb
          })
        },
        fail: err => {
          wx.showToast({
            title: 'Query record failed',
            icon: 'none'
          })
        }
      })
    })
  },
  getFounder: function() {
    wx.cloud.callFunction({
      name: 'openid'
    }).then( r =>{
      console.log("openid GET success, uid: ", r);
      const db = wx.cloud.database();
      db.collection("set").where({
        _openid: r.result.openid,
      }).get({
        success: res => {
          let founderDb = [];
          res.data.forEach(function (item, index) {
            let founderEle = {
              _id: item._id,
              name: item.name,
              type: item.type,
              detail: item.detail,
              region: item.region,
              date: item.date,
              time: item.time,
              sum: item.sum,
              prog: item.prog,
              sex: item.sex
            };
            founderDb.push(founderEle)
          })
          this.setData({
            founderList: founderDb
          })
        },
        fail: err => {
          wx.showToast({
            title: 'Query record failed',
            icon: 'none'
          })
        }
      })
    })
    
  },
  getUserInfo: function(e) {
    //console.log(e)
    
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
