// miniprogram/pages/userInfoDetail/userInfoDetail.js
Page(
  {
  /**
   * Page initial data
   */
  data: {
    name: null,
    sex: null,
    tel: null,
    info: null
  },

  bindFormSubmit: function(e) {
    console.log(e.detail.value);
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
    db.collection("user_info").add({
      data: {
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
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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