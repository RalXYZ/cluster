// pages/help/help.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        'basicInfor': {
            'title': '攒局用户手册',
            'source': "攒局是GX1919组在浙江大学陈建海老师微信小程序通识课程中完成的大作业。",
            'intro': "使用攒局小程序，用户可以在自习、电影、聚餐、拼车、拼单、游戏、旅行等场景下召集伙伴，以降低成本或告别孤寡~",
        },
        'advantages': [
          { 
            'title': '1. 轻便简洁',
            'content': '本小程序专注攒局，功能专一，从页面呈现到用户操作都极力求简。'
          },
          {
            'title': '2. 用户友好',
            'content':'本小程序不仅尽可能简化用户操作，在页面交互上更加用户友好外，还提供了浅色和深色两个主题，尽可能做到页面友好。'
          },
          {
            'title': '3. 安全私密',
            'content': '在参加攒局或者创建局之前，用户需要完善个人信息，主要包括个人真实姓名和电话号码。如平台上出现不当行为，易与相关执法机关进行对接。并且，在攒局详情页，仅展示局长的手机号，而不会展示加入者的详细信息。'
          }
        ],
        'manipulation': [
            {
              'title':'1. 发起攒局',
              'content': '选择对应的活动类型，输入活动主题、时间地点等基础信息，尽可能详细生动地介绍活动，并输入活动总人数即可发起。'},
            {
              'title':'2. 加入攒局', 
              'content': '在攒局列表查看自己感兴趣的局，点击上方的分类可以进行类别筛选。点击单个局可以进入该局的详情页，点击下方的“我要加入”按钮即可入局，若已满员则该按钮将显示“已满员”，无法加入。'},
            {
              'title':'3. 成局', 
              'content': '攒局列表中每个局的下方都有一个进度条，表示当前的攒局进度。当参加人数到达预设总人数时视为攒局成功。'},
            {
              'title':'note',
              'content': '*第一次发起或加入局之前都需要完善个人信息*'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    onPullDownRefresh: function(e){
        this.onRefresh();
      },
      onRefresh: function(e) {
        wx.showNavigationBarLoading();
        wx.showLoading({
          title: '刷新中...',
        })
        this.getData();
      },
      getData: function() {
        wx.request({
          url: '',
          complete(res){
              //隐藏loading 提示框
              wx.hideLoading();
              //隐藏导航条加载动画
              wx.hideNavigationBarLoading();
              //停止下拉刷新
              wx.stopPullDownRefresh();
          }
        })
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