// pages/inforDetail/inforDeatil.js

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        btn: {
            value: '我要参加',
            state: false
        },
        imgSrc: [
            '../../images/icons/male2.svg','../../images/icons/female3.svg'
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const {id} = options;
        this.setData({
            id: id,
        })
    },

    initData() {
        const db = wx.cloud.database();
        db.collection('set').doc(this.data.id).get({
            success: res => {
                    console.log(res)
                db.collection('user_info').where({
                    _openid: res.data._openid
                }).get({
                    success: r => {
                        wx.cloud.callFunction({
                            name: 'openid'
                        }).then( openid_res =>{
                            console.log(r);
                            if(r.data[0].sex == "male") {
                                this.setData({
                                    sex: 1,
                                })
                            } else if (r.data[0].sex == "female") {
                                this.setData({
                                    sex: 0,
                                })
                            }
                            this.setData({
                                cached_founder: res.data.founder,
                                cached_sex_raw: res.data.sex,
                                sex_raw: r.data[0].sex,
                                founder: r.data[0].name,
                                tel: r.data[0].tel,
                                sum: res.data.sum,
                                participates: res.data.participates,
                                type: res.data.type,
                                headline: res.data.headline,
                                detail: res.data.detail,
                                date: res.data.date,
                                time: res.data.time,
                                region: res.data.region,
                                prog: res.data.prog,
                            })
                            var crtNum = 0;
                            crtNum += this.data.prog;
                            if (this.data.sum == crtNum) {
                                this.setData({
                                    "btn.state": true,
                                    "btn.value": "已满员"
                                })
                            } else if (res.data._openid == openid_res.result.openid) {
                                this.setData({
                                    "btn.state": true,
                                    "btn.value": "您是发起者"
                                }) 
                            } else if (res.data.participates_openid != undefined && res.data.participates_openid.indexOf(openid_res.result.openid) != -1) {
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
                        })
                    }
                })
            },
          fail: err => {
            console.log("Error: Get set openid failed");
            console.log(err);
          }
        })
    },

    handleJoin() {
        wx.cloud.callFunction({
            name: 'openid'
        }).then( openid_res =>{
            if (this.data.participates == undefined) {
                this.data.participates = []
            }
            if (this.data.participates_openid == undefined) {
                this.data.participates_openid = []
            }
            this.data.participates.push(app.globalData.name);
            this.data.participates_openid.push(openid_res.result.openid);
            this.data.prog += 1;
            const db = wx.cloud.database();
            db.collection('set').doc(this.data.id).update({
                data: {
                    participates: this.data.participates,
                    participates_openid: this.data.participates_openid,
                    prog: this.data.prog,
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
        if (this.data.cached_founder != this.data.founder || 
            this.data.cached_sex_raw != this.data.sex_raw) {
                const db = wx.cloud.database();
                db.collection('set').doc(this.data.id).update({
                    data: {
                        founder: this.data.founder,
                        sex: this.data.sex_raw,
                    }
                })
            }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading();
        this.initData();
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