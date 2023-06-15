const request = require('supertest')
const app = require('../app')
const models = require('../models')
const { User } = require('../models')
const db = require('../models')
const jwt = require('jsonwebtoken')
const bulkInsertUsers = require('../lib/bulkInsertUsers')
const bulkInsertThreads = require('../lib/bulkInsertThreads')
const bulkInsertMountains = require('../lib/bulkInsertMountain')
const queryInterface = db.sequelize.getQueryInterface()

let access_token

beforeAll(async function () {
  await bulkInsertUsers()
  await bulkInsertMountains()
  await bulkInsertThreads()
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

describe('GET /pub/threads', function () {
  describe('When success get threads data', function () {
    it('should response with 200 status code and the data type is array', async function () {

      const response = await request(app)
        .get('/pub/threads')
        .set({
          access_token: access_token
        })

      expect(response.status).toEqual(200)
      expect(Array.isArray(response.body)).toEqual(true)
      expect(typeof response.body[0]).toEqual('object')
      expect(response.body[0]).toHaveProperty('Mountain')
      expect(response.body[0]).toHaveProperty('Comments')
      expect(response.body[0]).toHaveProperty('User')
    })
  })

  // user??
  // describe('When success get threads data', function () {
  //   it('should response with 200 status code and the data type is array', async function () {

  //     const response = await request(app)
  //       .get('/pub/threads')
  //       .set({
  //         access_token: access_token
  //       })

  //     expect(response.status).toEqual(200)
  //     expect(Array.isArray(response.body)).toEqual(true)
  //     expect(typeof response.body[0]).toEqual('object')
  //     expect(response.body[0]).toHaveProperty('Mountain')
  //     expect(response.body[0]).toHaveProperty('Comments')
  //     expect(response.body[0]).toHaveProperty('User')
  //   })
  // })

  describe('When success get thread data by id', function () {
    it('should response with 200 status code and the data type is array', async function () {

      const response = await request(app)
        .get('/pub/threads/1')
        .set({
          access_token: access_token
        })

      expect(response.status).toEqual(200)
      expect(typeof response.body).toEqual('object')
      expect(response.body).toHaveProperty('Mountain')
      expect(response.body).toHaveProperty('Comments')
    })
  })

  // create thread
  // describe('When success create thread ', function () {
  //   it('should response with 201 status code and the data type is object', async function () {


  //     const response = await request(app)
  //       .post('/pub/threads')
  //       .set({
  //         access_token: access_token
  //       })
  //       .send({
  //         description: 'test',
  //         maxCapacity: 5,
  //         dateToHike: '2022-12-12',
  //         dateFinishHike: '2022-12-12',
  //         status: 'Active',
  //         MountainId: 1,
  //         AuthorId: 1,
  //         lattitude: -6.260676687588894,
  //         longitude: 106.7814295081836
  //       })

  //     const expectedRes = { message: 'Create threads successfull!' }

  //     expect(response.status).toEqual(200)
  //     expect(response.body).toEqual(expectedRes)

  //   })
  // })

  describe('When success update thread data by id', function () {
    it('should response with 200 status code and the data type is object', async function () {

      const response = await request(app)
        .put('/pub/threads/1')
        .set({
          access_token: access_token
        })
        .send({
          description: 'test',
          maxCapacity: 3,
          dateToHike: '2022-12-12',
          dateFinishHike: '2022-12-12',
          AuthorId: 1,
        },)

      const expectedRes = { "message": "Edit threads successfull!" }
      expect(response.status).toEqual(200)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When success delete thread data by id', function () {
    it('should response with 200 status code and the data type is object', async function () {

      const response = await request(app)
        .delete('/pub/threads/1')
        .set({
          access_token: access_token
        })
        .send({
          description: 'test',
          maxCapacity: 3,
          dateToHike: '2022-12-12',
          dateFinishHike: '2022-12-12',
          AuthorId: 1,
        },)

      const expectedRes = { "message": "Delete threads successfull!" }
      expect(response.status).toEqual(200)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When fail delete thread data by id (not found)', function () {
    it('should response with 404 status code and the data type is object', async function () {

      const response = await request(app)
        .delete('/pub/threads/1111')
        .set({
          access_token: access_token
        })
        .send({
          description: 'test',
          maxCapacity: 3,
          dateToHike: '2022-12-12',
          dateFinishHike: '2022-12-12',
          AuthorId: 1,
        },)

      const expectedRes = {
        "message": "Thread not found"
      }
      expect(response.status).toEqual(404)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When success creata comments ', function () {
    it('should response with 201 status code and the data type is object', async function () {

      const response = await request(app)
        .post('/pub/threads/comment')
        .set({
          access_token: access_token
        })
        .send({
          AuthorId: 1,
          ThreadId: 1,
          comment: 'test',
        })

      const expectedRes = { message: 'Add comment success fully!' }

      expect(response.status).toEqual(201)
      expect(response.body).toEqual(expectedRes)

    })
  })



})