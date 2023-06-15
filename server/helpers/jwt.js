const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports = {
  generateToken: (payload) => jwt.sign(payload, SECRET),
  verifyToken: (access_token) => jwt.verify(access_token, SECRET)
}
