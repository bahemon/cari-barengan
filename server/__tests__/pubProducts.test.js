const request = require('supertest')
const app = require('../app')
const models = require('../models')
const jwt = require('jsonwebtoken')
const bulkInsertProducts = require('../lib/bulkInsertProducts')
const { User } = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()
let access_token

beforeAll(async function () {
  await bulkInsertProducts()
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

describe('GET pub/products', function () {
  describe('When success fetch products', function () {
    it('should send a response with 200 status code', async function () {
      const response = await request(app)
        .get('/pub/products')
        .set('access_token', access_token)

      expect(response.status).toEqual(200)
      expect(Array.isArray(response.body)).toEqual(true)
      expect(response.body[0]).toHaveProperty("name")
      expect(response.body[0]).toHaveProperty("stock")
      expect(response.body[0]).toHaveProperty("imageUrl")
      expect(response.body[0]).toHaveProperty("isAvailable")
      expect(response.body[0]).toHaveProperty("price")
      expect(response.body[0]).toHaveProperty("CategoryId")
      expect(response.body[0]).toHaveProperty("StoreId")
    })
  })

  describe('When empty access token', function () {
    it('should send a response with 401 status code', async function () {
      const response = await request(app)
        .get('/pub/products')
      // .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })
})

describe('GET pub/products/:id', function () {
  describe('When success fetch products by 1', function () {
    it('should send a response with 200 status code', async function () {
      const response = await request(app)
        .get('/products/1')
        .set('access_token', access_token)

      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty("name")
      expect(response.body).toHaveProperty("stock")
      expect(response.body).toHaveProperty("imageUrl")
      expect(response.body).toHaveProperty("isAvailable")
      expect(response.body).toHaveProperty("price")
      expect(response.body).toHaveProperty("CategoryId")
      expect(response.body).toHaveProperty("StoreId")
    })
  })

  describe('When empty access token', function () {
    it('should send a response with 401 status code', async function () {
      const response = await request(app)
        .get('/pub/products')
      // .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })
})

