const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV,
})

exports.main = async (event, context) => {
  // event.userInfo 是已废弃的保留字段，在此不做展示
  // 获取 OPENID 等微信上下文请使用 cloud.getWXContext()
  delete event.userInfo
  return event
}
