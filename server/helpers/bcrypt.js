const bcrypt = require('bcryptjs')

module.exports = {
  hashedPassword: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
  comparedPassword: (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword)
}

