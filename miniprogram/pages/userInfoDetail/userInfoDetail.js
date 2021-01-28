// miniprogram/pages/userInfoDetail/userInfoDetail.js

const app = getApp()

Page(
  {
  /**
   * Page initial data
   */
  data: {
    userInfoID: null,
    name: null,
    sex: null,
    tel: null,
    info: null,
    male: false,
    female: false
  },

  bindFormSubmit: function(e) {
    console.log(e.detail.value);
    app.globalData.name = e.detail.value.name;
    app.globalData.sex = e.detail.value.sex;
    app.globalData.tel = e.detail.value.tel;
    app.globalData.info = e.detail.value.info;
    this.setData({
      name: e.detail.value.name,
      sex: e.detail.value.sex,
      tel: e.detail.value.tel,
      info: e.detail.value.info
    });
    this.favorMusic();
  },

  favorMusic: function() {
    const db = wx.cloud.database();
    if (this.data.userInfoID == null) {
      db.collection("user_info").add({
        data: {
          nick_name: app.globalData.userInfo.nickName,
          name: this.data.name,
          sex: this.data.sex,
          tel: this.data.tel,
          info: this.data.info
        },
        success: res => {
          this.setData({
            uid: res._id,
          })
          wx.showToast({
            title: '设置成功',
          })
          console.log("database user ADD success, uid: ", res._id);
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '设置失败'
          })
          console.log("database user ADD failed: ", err);
        }
      })
    } else {
      db.collection("user_info").doc(this.data.userInfoID).update({
        data: {
          nick_name: app.globalData.userInfo.nickName,
          name: this.data.name,
          sex: this.data.sex,
          tel: this.data.tel,
          info: this.data.info
        },
        success: res => {
          this.setData({
            uid: res._id,
          })
          wx.showToast({
            title: '更新成功',
          })
          console.log("database user UPDATE success, uid: ", res._id);
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '更新失败'
          })
          console.log("database user UPDATE failed: ", err);
        }
      })
    }
    
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'openid'
    }).then( r =>{
      console.log(r)
      const db = wx.cloud.database();
      db.collection("user_info").where({
        _openid: r.result.openid,
      }).get({
        success: res => {
          console.log("database user GET success, uid: ", res.data[0]._id);
          this.setData({
            userInfoID: res.data[0]._id,
            name: res.data[0].name,
            tel: res.data[0].tel,
            info: res.data[0].info,
          })
          if (res.data[0].sex === "male") {
            this.setData({male: true})
          } else if (res.data[0].sex == "female") {
            this.setData({female: true})
          }

          app.globalData.name = res.data[0].name;
          app.globalData.sex = res.data[0].sex;
          app.globalData.tel = res.data[0].tel;
          app.globalData.info = res.data[0].info;
        },
        fail: err => {
          console.log("database user GET failed: ", err);
        }
      })
    })
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})