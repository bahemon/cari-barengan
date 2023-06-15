const { comparedPassword } = require('../../helpers/bcrypt')
const { generateToken } = require('../../helpers/jwt')
const { User, Profile } = require('../../models')

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body
      console.log(req.body)

      const newAdmin = await User.create({
        username,
        email,
        password,
        role: 'Admin'
      })

      await Profile.create({
        fullName: newAdmin.username + ' Admin',
        dateOfBirth: '2023-03-04',
        gender: 'Male',
        profileImage: 'https://tinyurl.com/vbptbj33',
        UserId: newAdmin.id
      })

      res.status(201).json({
        id: newAdmin.id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      console.log(req.body)

      if (!email) {
        throw { code: 400, message: 'Email is required' }
      }

      if (!password) {
        throw { code: 400, message: 'Password is required' }
      }

      const user = await User.findOne({
        where: { email }
      })

      if (!user) {
        throw { code: 400, message: 'Invalid email/password' }
      }

      const isValidPassword = comparedPassword(password, user.password)

      if (!isValidPassword) {
        throw { code: 400, message: 'Invalid email/password' }
      }

      const access_token = generateToken({
        id: user.id
      })

      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        access_token
      })
    } catch (err) {
      console.log(req.body)

      console.log(err)
      next(err)
    }
  }
}


module.exports = UserController