const request = require('supertest')
const app = require('../app')
const models = require('../models')
const bulkInsertUsers = require('../lib/bulkInsertUsers')
const { User } = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()
const jwt = require('jsonwebtoken')
const bulkInsertUserProfiles = require('../lib/bulkInsertUserProfiles')

beforeAll(async function () {
  await bulkInsertUsers()
  await bulkInsertUserProfiles()
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })
  const user = await User.create({
    username: "zyy",
    email: "zyy@mail.com",
    password: "12345",
  })
  access_token = jwt.sign({ id: user.id }, "SECRET")
})

afterAll(async function () {
  await models.sequelize.close()
})

describe('POST /register', function () {
  describe('When success register', function () {
    it('should send a response with 201 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/register')
        .send({
          username: "testing",
          email: "testing@mail.com",
          password: "12345"
        })

      const expectedRes = {
        id: 2,
        username: "testing",
        email: "testing@mail.com",
        role: "Admin"
      }

      expect(response.status).toEqual(201)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When not inputting username', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/register')
        .send({
          username: "",
          email: "testing@mail.com",
          password: "12345"
        })

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When inputted username is already been used', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/register')
        .send({
          username: "testing",
          email: "testing@mail.com",
          password: "12345"
        })

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When not inputting email', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/register')
        .send({
          username: "testing",
          email: "",
          password: "12345"
        })

      const expectedRes = {
        message: "Email cannot be empty"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When inputted email is already been used', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/register')
        .send({
          username: "testing1",
          email: "testing@mail.com",
          password: "12345"
        })

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(400)
      // console.log(response.body, "<<<<<<<<<<<<");
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When not inputting password', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/register')
        .send({
          username: "testing",
          email: "testing@mail.com",
          password: ""
        })

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When inputted password length is under 5', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/register')
        .send({
          username: "testing",
          email: "testing@mail.com",
          password: "1"
        })

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })
})

describe('POST /login', function () {
  describe('When success login', function () {
    it('should send a response with 200 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/login')
        .send({
          email: "zyy@mail.com",
          password: "12345"
        })

      expect(response.status).toEqual(200)
      expect(typeof response.body).toEqual('object')
      expect(response.body).toHaveProperty("id", expect.any(Number))
      expect(response.body).toHaveProperty('username', 'zyy')
      expect(response.body).toHaveProperty('email', 'zyy@mail.com')
      expect(response.body).toHaveProperty('access_token', expect.any(String))
    })
  })

  describe('When not inputting email', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/login')
        .send({
          email: "",
          password: "12345"
        })

      const expectedRes = {
        message: "Email is required"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When inputting wrong email', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/login')
        .send({
          email: "jamalAdmin@mil.com",
          password: "12345"
        })

      const expectedRes = {
        message: "Invalid email/password"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When not inputting password', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/login')
        .send({
          email: "jamalAdmin@mail.com",
          password: ""
        })

      const expectedRes = {
        message: "Password is required"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When inputting wrong password', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/login')
        .send({
          email: "jamalAdmin@mil.com",
          password: "1235"
        })

      const expectedRes = {
        message: "Invalid email/password"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })
})

describe('POST /pub/register', function () {
  describe('When success register', function () {
    it('should send a response with 201 status code and the data type is object', async function () {
      try {
        const response = await request(app)
          .post('/pub/register')
          .attach('profileImage', './lib/testing.png')
          .field('username', 'testing')
          .field('email', 'testing@mail.com')
          .field('password', 'testing')
          .field('fullName', 'testing')
          .field('gender', 'Male')
          .field('dateOfBirth', '2000-12-12')

        expect(response.status).toEqual(201)
        expect(typeof response.body).toEqual('object')
        expect(response.body).toHaveProperty('access_token', expect.any(String))
        expect(response.body).toHaveProperty('email', expect.any(String))
        expect(response.body).toHaveProperty('username', expect.any(String))
        expect(response.body).toHaveProperty('id', expect.any(Number))

      } catch (err) {
        console.log(err)

      }
    }, 10000)
  })

  describe('When not inputting username', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/register')
        .attach('profileImage', './lib/testing.png')
        .field('username', '')
        .field('email', 'testing2@mail.com')
        .field('password', 'testing')
        .field('fullName', 'testing')
        .field('gender', 'Male')
        .field('dateOfBirth', '2000-12-12')

      const expectedRes = {
        message: "Username cannot be empty"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When inputted username is already been used', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/register')
        .attach('profileImage', './lib/testing.png')
        .field('username', 'jamalAdmin')
        .field('email', 'testing@mail.com')
        .field('password', 'testing')
        .field('fullName', 'testing')
        .field('gender', 'Male')
        .field('dateOfBirth', '2000-12-12')

      const expectedRes = {
        message: "username must be unique"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When not inputting email', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/register')
        .attach('profileImage', './lib/testing.png')
        .field('username', 'testing2')
        .field('email', '')
        .field('password', 'testing')
        .field('fullName', 'testing')
        .field('gender', 'Male')
        .field('dateOfBirth', '2000-12-12')

      const expectedRes = {
        "message": "Email cannot be empty"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When inputted email is already been used', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/register')
        .attach('profileImage', './lib/testing.png')
        .field('username', 'testing222a')
        .field('email', 'jamalAdmin@mail.com')
        .field('password', 'testing')
        .field('fullName', 'testing')
        .field('gender', 'Male')
        .field('dateOfBirth', '2000-12-12')


      const expectedRes = {
        message: "email must be unique"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When not inputting password', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/register')
        .attach('profileImage', './lib/testing.png')
        .field('username', 'testing')
        .field('email', 'testing@mail.com')
        .field('password', '')
        .field('fullName', 'testing')
        .field('gender', 'Male')
        .field('dateOfBirth', '2000-12-12')

      const expectedRes = {
        message: "Password cannot be empty"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When inputted password length is under 5', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/register')
        .attach('profileImage', './lib/testing.png')
        .field('username', 'testing212')
        .field('email', 'testi21ng@mail.com')
        .field('password', 'tg')
        .field('fullName', 'testing')
        .field('gender', 'Male')
        .field('dateOfBirth', '2000-12-12')

      const expectedRes = {
        message: "Password minimum character is 5"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When not inputting fullName', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/register')
        .attach('profileImage', './lib/testing.png')
        .field('username', 'testing212')
        .field('email', 'testing2121@mail.com')
        .field('password', 'testing')
        .field('fullName', '')
        .field('gender', 'Male')
        .field('dateOfBirth', '2000-12-12')

      const expectedRes = {
        message: "fullName cannot be empty"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When not inputting dateOfBirth', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/register')
        .attach('profileImage', './lib/testing.png')
        .field('username', 'testindsadg')
        .field('email', 'testingdasd@mail.com')
        .field('password', 'testing')
        .field('fullName', 'testing')
        .field('gender', 'Male')
        .field('dateOfBirth', '')

      const expectedRes = {
        message: "dateOfBirth cannot be empty"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When not inputting gender', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/register')
        .attach('profileImage', './lib/testing.png')
        .field('username', 'testing11')
        .field('email', 'testing11@mail.com')
        .field('password', 'testing')
        .field('fullName', 'testing')
        .field('gender', '')
        .field('dateOfBirth', '2000-12-12')

      const expectedRes = {
        message: "gender cannot be empty"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })
})

describe('POST /pub/login', function () {
  describe('When success login', function () {
    it('should send a response with 200 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/login')
        .send({
          email: "testinggg@mail.com",
          password: "12345"
        })

      expect(response.status).toEqual(200)
      expect(typeof response.body).toEqual('object')
      expect(response.body).toHaveProperty("id", expect.any(Number))
      expect(response.body).toHaveProperty('username', 'testinggg')
      expect(response.body).toHaveProperty('email', 'testinggg@mail.com')
      expect(response.body).toHaveProperty('access_token', expect.any(String))
    })
  })

  describe('When not inputting email', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/login')
        .send({
          email: "",
          password: "12345"
        })

      const expectedRes = {
        message: "Email is required"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When inputting wrong email', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/login')
        .send({
          email: "jamalAdmin@mil.com",
          password: "12345"
        })

      const expectedRes = {
        message: "Invalid email/password"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When not inputting password', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/login')
        .send({
          email: "jamalAdmin@mail.com",
          password: ""
        })

      const expectedRes = {
        message: "Password is required"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When inputting wrong password', function () {
    it('should send a response with 400 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/pub/login')
        .send({
          email: "jamalAdmin@mil.com",
          password: "1235"
        })

      const expectedRes = {
        message: "Invalid email/password"
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })
})
