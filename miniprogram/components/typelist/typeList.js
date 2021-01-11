// component/typelist/typeList.js
const app=getApp();
var index;
Component({
  /**
   * 组件的属性列表
   */
  behaviors: ['wx://component-export'],
  properties: {
    item:{
      type: Object,
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
    handleClick: function(){
      /* var i;
      for(i=0;i<8;i++)
      {
        app.globalData.typeArray[i]='#ebd4d4';
      }
      app.globalData.typeArray[this.properties.item.index]='#EDEDED'; */
/*       if(app.globalData.typeArray[this.properties.item.index]==1)
      {
        this.setData({
          color: '#EDEDED'
        })
      }
      else{
        this.setData({
          color: '#ebd4d4'
        })
      } */
      console.log(this.properties.item.index);
      console.log(app.globalData.typeArray);
      var typeDetail=this.properties.item.type;
      this.triggerEvent('myevent', {typeDetail:typeDetail},{});
      /* console.log(typeDetail); */
    }
  }
})
