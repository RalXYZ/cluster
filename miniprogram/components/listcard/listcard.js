// component/listcard/listcard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    viewAct: function() {
      console.log("点击");
      wx.navigateTo({
        url: `../inforDetail/inforDeatil?id=${this.properties.item._id}`
      })
    },
  },

  lifetimes: {
    attached() {
      let src = undefined
      console.log(this.properties.item)
      var progArray = []
      for (var i = 0; i < this.properties.item.sum; i++) {
        if (i <= this.properties.item.prog) {
          progArray.push(true);
        } else {
          progArray.push(false);
        }
      }
      console.log(progArray);
      this.setData({
        progArray: progArray
      })
      switch(this.properties.item.type) {
        case("聚餐"):
          src = "https://i.loli.net/2021/01/10/UF2wrqmQDVzb5kd.png";
          break;
        case("自习"):
          src = "https://i.loli.net/2021/01/10/8I9tNuAp7RlS14U.png";
          break;
        case("游戏"):
          src = "../../images/game.png";
          break;
        case("拼单"):
          src = "../../images/pindan.png";
          break;
        case("电影"):
          src = "../../images/movie.png";
          break;
        case("拼车"):
          src = "../../images/car.png";
          break;
        case("其他"):
          src = "../../images/other.png";
          break;
      }
      this.setData({
        src: src
      })
    },
  }
})
