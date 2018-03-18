const jwt = require('jsonwebtoken')
const config = require('../config')
const publicKey = config.publicKey

var create = async function (user_indo) {
  let token = await jwt.sign({
    user: user_indo
  }, publicKey, {
    expiresIn: '24h'
  })
  return token
}
var check = async function (token) {
  if (token === undefined || token === 'undefined') {
    throw [401,'获取用户凭证失败']
  }
  try {
    let decoded = await jwt.verify(token, publicKey)
    if (decoded.user) {
      return decoded.user
    } else {
      throw [401,'用户身份过期,请尝试重新登录']
    }
  } catch(err) {
    throw [401,'用户身份认证失败,请尝试重新登录']
  }
}
module.exports = {
  create,
  check
}