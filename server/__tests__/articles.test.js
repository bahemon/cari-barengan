const request = require('supertest')
const app = require('../app')
const models = require('../models')
const bulkInsertArticles = require('../lib/bulkInsertArticles')
const { User } = require('../models')
const db = require('../models')
const jwt = require('jsonwebtoken')
const bulkInsertUsers = require('../lib/bulkInsertUsers')
const queryInterface = db.sequelize.getQueryInterface()

let access_token

beforeAll(async function () {
  await bulkInsertUsers()
  await bulkInsertArticles()
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

describe('POST /articles', function () {
  describe('When success add article', function () {
    it('should response 200 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/articles')
        .set('access_token', access_token)

        .attach('imageUrl', './lib/gunung.jpeg')
        .field('title', '5 Tips Mendaki Gunung Di Musim Hujan')
        .field('description', 'test')
        .field('AuthorId', 1)

      expect(response.status).toEqual(201)
    })
  })

  describe('When fail add article (dont have token)', function () {
    it('should response 401 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/articles')
        .set({
          access_token: ''
        })

      const expectedRes = {
        "message": "Invalid Token"
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When fail add article (invalid token)', function () {
    it('should response 401 status code and the data type is object', async function () {
      const response = await request(app)
        .post('/articles')
        .set({
          access_token: '1233salahtoken'
        })

      const expectedRes = {
        "message": "Invalid token"
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })

})

describe('GET /articles', function () {

  describe('When success get articles data', function () {
    it('should response 200 status code and the data type is array', async function () {
      const response = await request(app)
        .get('/articles')
        .set({
          access_token: access_token
        })

      expect(response.status).toEqual(200)
      expect(Array.isArray(response.body)).toBeTruthy()
      expect(typeof response.body[0]).toEqual('object')
      expect(response.body[0]).toHaveProperty('User', expect.any(Object))
    })
  })

  describe('When fail get articles data (dont have token)', function () {
    it('should response 401 status code and the data type is object', async function () {
      const response = await request(app)
        .get('/articles')
        .set({
          access_token: ''
        })

      const expectedRes = {
        "message": "Invalid Token"
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When fail get articles data (invalid token)', function () {
    it('should response 401 status code and the data type is object', async function () {
      const response = await request(app)
        .get('/articles')
        .set({
          access_token: '1233salahtoken'
        })

      const expectedRes = {
        "message": "Invalid token"
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When success get article data by id', function () {
    it('should response 200 status code and the data type is object', async function () {
      const response = await request(app)
        .get('/articles/1')
        .set({
          access_token: access_token
        })

      const expectedRes = {
        "id": 1,
        "title": "5 Tips Mendaki Gunung Di Musim Hujan",
        "imageUrl": "https://plus.unsplash.com/premium_photo-1667516408599-67d72068eaa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "AuthorId": 1,
        "createdAt": response.body.createdAt,
        "updatedAt": response.body.updatedAt,
        "User": {
          "id": 1,
          "username": "jamalAdmin",
          "email": "jamalAdmin@mail.com",
          "role": "Admin",
          "createdAt": response.body.User.createdAt,
          "updatedAt": response.body.User.updatedAt
        }
      }

      expect(response.status).toEqual(200)
      expect(typeof response.body).toEqual('object')
      expect(response.body).toHaveProperty("id")
      expect(response.body).toHaveProperty("title")
      expect(response.body).toHaveProperty("imageUrl")
      expect(response.body).toHaveProperty("description")
    })
  })

  describe('When fail get articles data by id (dont have token)', function () {
    it('should response 401 status code and the data type is object', async function () {
      const response = await request(app)
        .get('/articles/1')
        .set({
          access_token: ''
        })

      const expectedRes = {
        "message": "Invalid Token"
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When fail get articles data by id (invalid token)', function () {
    it('should response 401 status code and the data type is object', async function () {
      const response = await request(app)
        .get('/articles/1')
        .set({
          access_token: '1233salahtoken'
        })

      const expectedRes = {
        "message": "Invalid token"
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When article data not found', function () {
    it('should response 404 status code and the data type is object', async function () {
      const response = await request(app)
        .get('/articles/73127')
        .set({
          access_token: access_token
        })

      const expectedRes = {
        "message": "Article not found"
      }

      expect(response.status).toEqual(404)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When success get update data by id', function () {
    it('should response 200 status code and the data type is object', async function () {
      const response = await request(app)
        .put('/articles/1')
        .set({
          access_token: access_token
        })
        .send({
          title: 'edit',
          imageUrl: 'edit',
          description: 'edit'
        })

      const expectedRes = {
        "message": "Article with id 1 updated"
      }

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When fail update article data (dont have token)', function () {
    it('should response 401 status code and the data type is object', async function () {
      const response = await request(app)
        .put('/articles/1')
        .set({
          access_token: ''
        })

      const expectedRes = {
        "message": "Invalid Token"
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When fail update article data (invalid token)', function () {
    it('should response 401 status code and the data type is object', async function () {
      const response = await request(app)
        .put('/articles/1')
        .set({
          access_token: '1233salahtoken'
        })

      const expectedRes = {
        "message": "Invalid token"
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When success get delete data by id', function () {
    it('should response 200 status code and the data type is object', async function () {
      const response = await request(app)
        .delete('/articles/1')
        .set({
          access_token: access_token
        })

      const expectedRes = {
        "message": "Article with id 1 deleted"
      }

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When fail delete articles data (dont have token)', function () {
    it('should response 401 status code and the data type is object', async function () {
      const response = await request(app)
        .delete('/articles/1')
        .set({
          access_token: ''
        })

      const expectedRes = {
        "message": "Invalid Token"
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When fail delete articles data (invalid token)', function () {
    it('should response 401 status code and the data type is object', async function () {
      const response = await request(app)
        .delete('/articles/1')
        .set({
          access_token: '1233salahtoken'
        })

      const expectedRes = {
        "message": "Invalid token"
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })
})