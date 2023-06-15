const request = require('supertest')
const app = require('../app')
const models = require('../models')
const jwt = require('jsonwebtoken')
const bulkInsertTransactionDetail = require('../lib/bulkInsertTransactionDetail')
const bulkInsertTransaction = require('../lib/bulkInsertTransaction')

const {
    User
} = require('../models')
const db = require('../models')
const bulkInsertProducts = require('../lib/bulkInsertProducts')
const bulkInsertStores = require('../lib/bulkInsertStores')
const bulkInsertUsers = require('../lib/bulkInsertUsers')
const queryInterface = db.sequelize.getQueryInterface()
let access_token

beforeAll(async function () {
    await bulkInsertUsers()
    await bulkInsertStores()
    await bulkInsertProducts()
    await bulkInsertTransaction()
    await bulkInsertTransactionDetail()
    const user = await User.create({
        username: "zyy",
        email: "zyy@mail.com",
        password: "12345",
    })
    access_token = jwt.sign({
        id: user.id
    }, "SECRET")
})

afterAll(async function () {
    await queryInterface.bulkDelete('Users', {}, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
    await models.sequelize.close()
})

describe('GET /transactions', function () {
    describe('When success fetch transaction', function () {
        it('should send a response with 200 status code', async function () {
            const response = await request(app)
                .get('/transactions')
                .set('access_token', access_token)

            expect(response.status).toEqual(200)
            expect(Array.isArray(response.body)).toEqual(true)
            console.log(response.body, "><<<<<<<<<<<<<")
            expect(response.body[0]).toHaveProperty("startToRent")
            expect(response.body[0]).toHaveProperty("finishToRent")
            expect(response.body[0]).toHaveProperty("totalFee")
            expect(response.body[0]).toHaveProperty("status")
            expect(response.body[0]).toHaveProperty("AuthorId")
            expect(response.body[0]).toHaveProperty("createdAt")
            expect(response.body[0]).toHaveProperty("updatedAt")
        })
    })

    describe('When empty access token', function () {
        it('should send a response with 401 status code', async function () {
            const response = await request(app)
                .get('/transactions')
                .set('access_token', '')

            const expectedRes = {
                message: response.body.message
            }

            expect(response.status).toEqual(401)
            expect(response.body).toEqual(expectedRes)
        })
    })
})

describe('GET /transactions/:id', function () {
    describe('When success fetch transaction', function () {
        it('should send a response with 200 status code', async function () {
            const response = await request(app)
                .get('/transactions')
                .set('access_token', access_token)

            expect(response.status).toEqual(200)
            expect(Array.isArray(response.body)).toEqual(true)
            expect(response.body[0]).toHaveProperty("startToRent")
            expect(response.body[0]).toHaveProperty("finishToRent")
            expect(response.body[0]).toHaveProperty("totalFee")
            expect(response.body[0]).toHaveProperty("status")
            expect(response.body[0]).toHaveProperty("AuthorId")
            expect(response.body[0]).toHaveProperty("createdAt")
        })
    })

    describe('When empty access token', function () {
        it('should send a response with 401 status code', async function () {
            const response = await request(app)
                .get('/transactions/1')
            // .set('access_token', access_token)

            const expectedRes = {
                message: response.body.message
            }

            expect(response.status).toEqual(401)
            expect(response.body).toEqual(expectedRes)
        })
    })
})

describe('PATCH /transactions/:id', function () {
    describe('When success updated status transaction', function () {
        it('should send a response with 200 status code', async function () {
            const response = await request(app)
                .patch('/transactions/1')
                .send({
                    status: "Paid"
                })
                .set('access_token', access_token)

            const expectedRes = {
                message: response.body.message
            }

            expect(response.status).toEqual(200)
            expect(response.body).toEqual(expectedRes)
        })
    })


    describe('When transaction not found', function () {
        it('should send a response with 404 status code', async function () {
            const response = await request(app)
                .patch('/transactions/550')
                .set('access_token', access_token)

            const expectedRes = {
                message: response.body.message
            }

            expect(response.status).toEqual(404)
            expect(response.body).toEqual(expectedRes)
        })
    })
})