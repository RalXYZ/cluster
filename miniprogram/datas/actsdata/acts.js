function sortTime(a,b)
{
  return a.time-b.time;
}
var json=[

  {
    "title":'找人写bug',
    "src":'../../image/pindan.png',
    "type": "拼单",
    "detail": "我是写bug小能手，找几个人陪我写bug，地点zjg机房，bug写的好的人速来",
    "founder": "T-Bug",
    "time": '2021-01-16',
    "sex":1,
    "prog":[
      true,true,false,false
    ]
  },
  {
    'title':'找妹子拼车',
    "src":'../../image/pinche.png',
    "type": "拼车",
    "detail": "我想去西湖看人，找几个小伙伴和我一起去看人吧，最好是女生",
    "founder": "Zjg交谊花",
    "date": '2021-01-15',
    "time": '14:55',
    "sex": 0,
    "prog":[
      1,1,1,0,0,0,0
    ]
  },
  {
    'title':'找大佬补天',
    "src":'../../image/zixi.png',
    "type": "自习",
    "detail": "找微积分大佬带我自习，孩子要补天了，可bg奶茶",
    "founder": "Zjg咸鱼",
    "time": 16,
    "sex": 1,
    "prog":[
      1,1,0,0,0
    ]
  },
  {
    'title':'找男生一起吃海底捞',
    "src":'../../image/jucan.png',
    "type": "聚餐",
    "detail": "我肚子饿了，想吃海底捞，想要两个男同学陪我去海底捞吃饭饭，球球啦T.T",
    "founder": "Green-Tea",
    "time": 6,
    "sex":0,
    "prog":[
      0,0
    ]
  },
  {
    'title':'激情复联四局',
    "src":'../../image/dianying.png',
    "type": "电影",
    "detail": "想去看复仇者联盟4，想找几个漫威粉一起去看，男生优先",
    "founder": "Marve1",
    "time": 26,
    "sex":1,
    "prog":[
      true,true,false,false,false,false
    ]
  },
  {
    'title':'激情lol局',
    "src":'../../image/game.png',
    "type": "游戏",
    "detail": "找几个兄弟来一起打lol，我中路贼强，打野最好会玩一点，能跟我联动起来",
    "founder": "SKT T1 Faker",
    "time": 6,
    "sex":1,
    "prog":[
      true,true,true,true,false
    ]
  },
  {
    'title':'人类一败涂地局',
    "src":'../../image/game.png',
    "type": "游戏",
    "detail": "有小姐姐和我一起玩人类一败涂地嘛，我身法很强，过不去了可以扒在我身上那种",
    "founder": "里逸zZ",
    "time": 46,
    "sex":1,
    "prog":[
      true,true
    ]
  },
  {
    'title':'美赛组队局',
    "src":'../../image/qita.png',
    "type": "其他",
    "detail": "有人想组队打美赛嘛，最好要有一些数学建模基础的",
    "founder": "ZLLLZ",
    "time": 39,
    "sex":0,
    "prog":[
      true,true,false
    ]
  },
  
]
json.sort(sortTime);
module.exports = {
  acts: json
}


