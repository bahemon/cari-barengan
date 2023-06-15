const request = require('supertest')
const app = require('../app')
const bulkInsertMountains = require('../lib/bulkInsertMountain')
const models = require('../models')
const { User } = require('../models')
const db = require('../models')
const jwt = require('jsonwebtoken')
const queryInterface = db.sequelize.getQueryInterface()

let access_token


beforeAll(async function () {
  await bulkInsertMountains()
  const user = await User.create({
    username: "zyy",
    email: "zyy@mail.com",
    password: "12345",
  })
  access_token = jwt.sign({ id: user.id }, "SECRET")
})

afterAll(async function () {
  await queryInterface.bulkDelete('Users', {}, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })
  await models.sequelize.close()
})

describe('GET /mountains', function () {
  describe('When success get mountains data', function () {
    it('should response 200 status code and the data type is array', async function () {
      const response = await request(app)
        .get('/mountains')
        .set({
          access_token: access_token
        })

      expect(response.status).toEqual(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(typeof response.body[0]).toEqual('object')
      expect(response.body[0]).toHaveProperty('id', 1)
      expect(response.body[0]).toHaveProperty('name', 'Gunung Pangrango')
      expect(response.body[0]).toHaveProperty('province', 'Jawa Barat')
      expect(response.body[0]).toHaveProperty('imageUrl', expect.any(String))
      expect(response.body[0]).toHaveProperty('location', expect.any(Object))
    })
  })

  describe('When failed get mountains data (dont have token)', function () {
    it('should response with 401 status code and the data type is object', async function () {
      const response = await request(app)
        .get('/mountains')
        .set({
          access_token: ''
        })

      const expectedRes = {
        message: 'Invalid Token'
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When failed get mountains data (invalid token)', function () {
    it('should response with 401 status code and the data type is object', async function () {
      const response = await request(app)
        .get('/mountains')
        .set({
          access_token: '1salahtoken'
        })

      const expectedRes = {
        message: 'Invalid token'
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })
})