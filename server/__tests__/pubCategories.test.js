const request = require('supertest')
const app = require('../app')
const bulkInsertCategories = require('../lib/bulkInsertCategories')
const models = require('../models')
const { User } = require('../models')
const db = require('../models')
const jwt = require('jsonwebtoken')
const bulkInsertUsers = require('../lib/bulkInsertUsers')
const queryInterface = db.sequelize.getQueryInterface()

let access_token

beforeAll(async function () {
  await bulkInsertUsers()
  await bulkInsertCategories()
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

describe('GET /pub/categories', function () {
  describe('When success get categories data', function () {
    it('should response with 200 status code and the data type is array', async function () {

      const response = await request(app)
        .get('/pub/categories')
        .set({
          access_token: access_token
        })


      expect(response.status).toEqual(200)
      expect(Array.isArray(response.body)).toEqual(true)
      expect(typeof response.body[0]).toEqual('object')
      expect(response.body[0]).toHaveProperty('id', expect.any(Number))
      expect(response.body[0]).toHaveProperty('name', expect.any(String))

    })
  })

  describe('When failed get categories data (dont have token)', function () {
    it('should response with 401 status code and the data type is array', async function () {
      const response = await request(app)
        .get('/pub/categories')
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

  describe('When failed get categories data (invalid token)', function () {
    it('should response with 401 status code and the data type is array', async function () {
      const response = await request(app)
        .get('/pub/categories')
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

  describe('When success get category data by id', function () {
    it('should response with 200 status code and the data type is object', async function () {
      const response = await request(app)
        .get('/pub/categories/1')
        .set({
          access_token: access_token
        })

      const expectedRes = {
        "id": 1,
        "name": "Tent",
        "createdAt": "2023-04-04T18:30:07.083Z",
        "updatedAt": "2023-04-04T18:30:07.083Z"
      }


      expect(response.status).toEqual(200)

    })
  })

  describe('When failed get category data by id (dont have token)', function () {
    it('should response with 401 status code and the data type is array', async function () {
      const response = await request(app)
        .get('/pub/categories/1')
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

  describe('When failed get category data by id (invalid token)', function () {
    it('should response with 401 status code and the data type is array', async function () {
      const response = await request(app)
        .get('/pub/categories/1')
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
