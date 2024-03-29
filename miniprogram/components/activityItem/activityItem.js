// components/activityItem/activityItem.js
Component({
  /**
   * Component properties
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    handleClick() {
      wx.navigateTo({
        url: `../../pages/inforDetail/inforDeatil?id=${this.properties.item._id}`,
      })
    },
  },

  lifetimes: {
    attached() {
      let src = undefined
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
