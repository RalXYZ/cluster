// pages/inforDetail/inforDeatil.js

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        /*
        activity: {
            founder: 'Wu Xinbei',
            participates: [
                " Zhao Zichen"," Cui Mingyuan" 
            ],
            type: '聚餐',
            headline: '海底捞组团',
            detail: '微信小程序大作业组队,不卷,能运行就好',
            sum: 3,
            date: '2021-01-06',
            time: '21:21',
            region: '浙江大学 紫金港校区'
        },
        */
        btn: {
            value: '我要参加',
            state: false
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //console.log(this.data.activity);
        const {id} = options;
        this.setData({
            id: id,
        })
    },

    initData() {
        const db = wx.cloud.database();
        db.collection('set').doc(this.data.id).field({
            is_founder: true,
            is_participant: true,
            founder: true,
            name: true,
            type: true,
            detail: true,
            region: true,
            date: true,
            time: true,
            sum: true,
            prog: true,
            sex: true,
            participates: true,
        }).get({
          success: res => {
            this.setData({
                activity: res.data
            })
            var crtNum = 0;
            crtNum += this.data.activity.prog;
            if (this.data.activity.sum == crtNum) {
                this.setData({
                    "btn.state": true,
                    "btn.value": "已满员"
                })
            } else if (this.data.activity.is_founder) {
                this.setData({
                    "btn.state": true,
                    "btn.value": "您是发起者"
                }) 
            } else if (this.data.activity.is_participant) {
                this.setData({
                    "btn.state": true,
                    "btn.value": "您已加入"
                }) 
            } else {
                this.setData({
                    "btn.state": false,
                    "btn.value": "我要参加"
                }) 
            }
          },
          fail: err => {
            console.log("Error: Get set openid failed");
            console.log(err);
          }
        })
    },

    handleJoin() {
        if (this.data.activity.participates == undefined) {
            this.data.activity.participates = []
        }
        this.data.activity.participates.push(app.globalData.name);
        this.data.activity.prog += 1;
        const db = wx.cloud.database();
        db.collection('set').doc(this.data.id).update({
            data: {
                participates: this.data.activity.participates,
                is_participant: true,
                prog: this.data.activity.prog,
            },
            success: function(res) {
                wx.showToast({
                    title: '加入成功',
                })
                console.log("joined");
                console.log(res);
                this.initData();
            },
            fail: err => {
                console.log(err);
            }
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
        this.initData();
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