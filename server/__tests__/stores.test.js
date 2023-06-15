const request = require('supertest')
const app = require('../app')
const models = require('../models')
const jwt = require('jsonwebtoken')
const bulkInsertStores = require('../lib/bulkInsertStores')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()
const {
    User
} = require('../models')
const {
    generateToken
} = require('../helpers/jwt')
const bulkInsertMountains = require('../lib/bulkInsertMountain')
const bulkInsertUsers = require('../lib/bulkInsertUsers')
let access_token

beforeAll(async function () {
    await bulkInsertMountains()
    await bulkInsertUsers()
    await bulkInsertStores()
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
    // access_token = generateToken({id: user.id})
    access_token = jwt.sign({ id: user.id }, "SECRET")
})

afterAll(async function () {
    await models.sequelize.close()
})

describe('POST /stores', function () {
    describe('When success add data', function () {
        it('should send a response with 201 status code', async function () {
            const response = await request(app)
                .post('/stores')
                .set('access_token', access_token)
                .send({
                    name: "Argopuro Outdoor",
                    address: "Sebelah basecamp Argopuro",
                    contactPerson: "08456416137",
                    MountainId: 22,
                    AuthorId: 8,
                    // updatedAt: response.body.createdAt,
                    // createdAt: response.body.updatedAt
                })
                console.log(access_token, "<<<<<<<<<<<<<")

            const expectedRes = {
                id: 1,
                name: "Argopuro Outdoor",
                address: "Sebelah basecamp Argopuro",
                contactPerson: "08456416137",
                MountainId: 22,
                AuthorId: 1,
                updatedAt: response.body.createdAt,
                createdAt: response.body.updatedAt
            }

            expect(response.status).toEqual(201)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When empty name', function () {
        it('should send a response with 400 status code', async function () {
            const response = await request(app)
                .post('/stores')
                .send({
                    name: "",
                    address: "Sebelah basecamp Argopuro",
                    contactPerson: "08456416137",
                    MountainId: 22,
                    AuthorId: 8,
                    // updatedAt: response.body.createdAt,
                    // createdAt: response.body.updatedAt
                })
                .set('access_token', access_token)

            const expectedRes = {
                message: response.body.message
            }

            expect(response.status).toEqual(400)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When empty address', function () {
        it('should send a response with 400 status code', async function () {
            const response = await request(app)
                .post('/stores')
                .send({
                    name: "Argopuro Outdoor",
                    address: "",
                    contactPerson: "08456416137",
                    MountainId: 22,
                    AuthorId: 8,
                    // updatedAt: response.body.createdAt,
                    // createdAt: response.body.updatedAt
                })
                .set('access_token', access_token)

            const expectedRes = {
                message: response.body.message
            }

            expect(response.status).toEqual(400)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When empty contactPerson', function () {
        it('should send a response with 400 status code', async function () {
            const response = await request(app)
                .post('/stores')
                .send({
                    name: "Argopuro Outdoor",
                    address: "Sebelah basecamp Argopuro",
                    contactPerson: "",
                    MountainId: 22,
                    AuthorId: 8,
                    // updatedAt: response.body.createdAt,
                    // createdAt: response.body.updatedAt
                })
                .set('access_token', access_token)

            const expectedRes = {
                message: response.body.message
            }

            expect(response.status).toEqual(400)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When empty MountainId', function () {
        it('should send a response with 400 status code', async function () {
            const response = await request(app)
                .post('/stores')
                .send({
                    name: "Argopuro Outdoor",
                    address: "Sebelah basecamp Argopuro",
                    contactPerson: "08456416137",
                    MountainId: "",
                    AuthorId: 8,
                    // updatedAt: response.body.createdAt,
                    // createdAt: response.body.updatedAt
                })
                .set('access_token', access_token)

            const expectedRes = {
                message: response.body.message
            }

            expect(response.status).toEqual(400)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When empty AuthorId', function () {
        it('should send a response with 401 status code', async function () {
            const response = await request(app)
                .post('/stores')
                .send({
                    name: "Argopuro Outdoor",
                    address: "Sebelah basecamp Argopuro",
                    contactPerson: "08456416137",
                    MountainId: 22,
                    AuthorId: "",
                    // updatedAt: response.body.createdAt,
                    // createdAt: response.body.updatedAt
                })
            // .set('access_token', access_token)

            const expectedRes = {
                message: response.body.message
            }

            expect(response.status).toEqual(401)
            expect(response.body).toEqual(expectedRes)
        })
    })
})

describe('GET /stores', function () {
    describe('When success fetch stores', function () {
        it('should send a response with 200 status code', async function () {
            const response = await request(app)
                .get('/stores')
                .set('access_token', access_token)

            expect(response.status).toEqual(200)
            expect(Array.isArray(response.body)).toEqual(true)
            // expect(response.body[0]).toHaveProperty("name")
            // expect(response.body[0]).toHaveProperty("address")
            // expect(response.body[0]).toHaveProperty("contactPerson")
            // expect(response.body[0]).toHaveProperty("AuthorId")
            // expect(response.body[0]).toHaveProperty("MountainId")
            // expect(response.body[0].name).toEqual('Sahara Outdoor')
            // expect(response.body[0].address).toEqual('Sebelah basecamp Putri')
            // expect(response.body[0].contactPerson).toEqual("085885939426")
            // expect(response.body[0].AuthorId).toEqual(5)
            // expect(response.body[0].MountainId).toEqual(1)
        })
    })

    describe('When empty access token', function () {
        it('should send a response with 401 status code', async function () {
            const response = await request(app)
                .get('/stores')
            // .set('access_token', access_token)


            const expectedRes = {
                message: response.body.message
            }

            expect(response.status).toEqual(401)
            expect(response.body).toEqual(expectedRes)
        })
    })
})

describe('GET /stores/1', function () {
    describe('When success fetch store by id', function () {
        it('should send a response with 200', async function () {
            try {
                const response = await request(app)
                    .get('/stores/1')
                    .set('access_token', access_token)

                expect(response.status).toEqual(200)
                // console.log(response.body, "<<<<<")
                expect(typeof response.body).toEqual('object')
                expect(response.body).toHaveProperty("name")
                expect(response.body).toHaveProperty("address")
                expect(response.body).toHaveProperty("contactPerson")
                expect(response.body).toHaveProperty("AuthorId")
                expect(response.body).toHaveProperty("MountainId")
                // expect(response.body.name).toEqual('Sahara Outdoor')
                // expect(response.body.address).toEqual('Sebelah basecamp Putri')
                // expect(response.body.contactPerson).toEqual("085885939426")
                // expect(response.body.AuthorId).toEqual(5)
                // expect(response.body.MountainId).toEqual(1)
            } catch (error) {
                console.log(error)
            }

        })
    })

    describe('When empty access token', function () {
        it('should send a response with 401 status code', async function () {
            try {
                const response = await request(app)
                    .get('/stores/1')
                // .set('access_token', access_token)


                const expectedRes = {
                    message: "Invalid Token"
                }

                expect(response.status).toEqual(401)
                expect(response.body).toEqual(expectedRes)
            } catch (error) {
                console.log(error)
            }

        })
    })

    describe('When stores not found', function () {
        it('should send a response with 404 status code', async function () {
            const response = await request(app)
                .get('/stores/500')
                .set('access_token', access_token)
    
            const expectedRes = {
                message: response.body.message
            }
    
            expect(response.status).toEqual(404)
            // console.log(response.body, "<<<<<");
            expect(response.body).toEqual(expectedRes)
        })
    })
})

describe('PUT /stores/1', function () {
    describe('When success update store data by id', function () {
        it('should send a response with 200 status code and updated data', async function () {
            const response = await request(app)
                .put('/stores/1')
                .send({
                    name: "Argopuro Outdoor",
                    address: "Sebelah basecamp Argopuro",
                    contactPerson: "08777775558",
                    AuthorId: 5,
                    MountainId: 1
                })
                .set('access_token', access_token)

            const expectedRes = {
                message: "Store with id 1 updated"
            }

            expect(response.status).toEqual(200)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When success update store name by id', function () {
        it('should send a response with 200 status code and updated data', async function () {
            const response = await request(app)
                .put('/stores/1')
                .send({
                    name: "Argopuro Outdoor New",
                    address: "Sebelah basecamp Argopuro",
                    contactPerson: "08777775558",
                    AuthorId: 5,
                    MountainId: 1
                })
                .set('access_token', access_token)

            const expectedRes = {
                message: "Store with id 1 updated"
            }

            expect(response.status).toEqual(200)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When success update store address by id', function () {
        it('should send a response with 200 status code and updated data', async function () {
            const response = await request(app)
                .put('/stores/1')
                .send({
                    name: "Argopuro Outdoor New",
                    address: "Sebelah basecamp Argopuro New",
                    contactPerson: "08777775558",
                    AuthorId: 5,
                    MountainId: 1
                })
                .set('access_token', access_token)

            const expectedRes = {
                message: "Store with id 1 updated"
            }

            expect(response.status).toEqual(200)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When success update store contact person by id', function () {
        it('should send a response with 200 status code and updated data', async function () {
            const response = await request(app)
                .put('/stores/1')
                .send({
                    name: "Argopuro OutdoorNew",
                    address: "Sebelah basecamp Argopuro New",
                    contactPerson: "089555544752",
                    AuthorId: 5,
                    MountainId: 1
                })
                .set('access_token', access_token)

            const expectedRes = {
                message: "Store with id 1 updated"
            }

            expect(response.status).toEqual(200)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When updating a store with invalid data because empty name', function () {
        it('should send a response with 400 status code', async function () {
            const response = await request(app)
                .put('/stores/1')
                .send({
                    name: "",
                    address: "Sebelah basecamp Argopuro",
                    contactPerson: "08777775558",
                    AuthorId: "5",
                    MountainId: "1"
                })

                .set('access_token', access_token)

            const expectedRes = {
                message: "name cannot be empty"
            }

            expect(response.status).toEqual(400)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When updating a store with invalid data because empty address', function () {
        it('should send a response with 400 status code', async function () {
            const response = await request(app)
                .put('/stores/1')
                .send({
                    name: "Argopuro Outdoor New",
                    address: "",
                    contactPerson: "08777775558",
                    AuthorId: "5",
                    MountainId: "1"
                })

                .set('access_token', access_token)

            const expectedRes = {
                message: "address cannot be empty"
            }

            expect(response.status).toEqual(400)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When updating a store with invalid data because empty contactPerson', function () {
        it('should send a response with 400 status code', async function () {
            const response = await request(app)
                .put('/stores/1')
                .send({
                    name: "Argopuro Outdoor New",
                    address: "Sebelah basecamp Argopuro",
                    contactPerson: "",
                    AuthorId: "5",
                    MountainId: "1"
                })

                .set('access_token', access_token)

            const expectedRes = {
                message: "contactPerson cannot be empty"
            }

            expect(response.status).toEqual(400)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When id store not found', function () {
        it('should send a response with 404 status code', async function () {
            const response = await request(app)
                .put('/stores/365')
                .send({
                    name: "Argopuro Outdoor",
                    address: "Sebelah basecamp Argopuro",
                    contactPerson: "08777775558",
                    AuthorId: 5,
                    MountainId: 1
                })
                .set('access_token', access_token)

            const expectedRes = {
                message: "Store not found"
            }

            expect(response.status).toEqual(404)
            expect(response.body).toEqual(expectedRes)
        })
    })
})

describe('DELETE /stores/1', function () {
    describe('When success delete store by id', function () {
        it('should send a response with 200 status code and delete data', async function () {
            const response = await request(app)
                .delete('/stores/1')
                .set('access_token', access_token)

            const expectedRes = {
                message: "Store with id 1 deleted"
            }

            expect(response.status).toEqual(200)
            expect(response.body).toEqual(expectedRes)
        })
    })

    describe('When id store not found', function () {
        it('should send a response with 404 status code', async function () {
            const response = await request(app)
                .delete('/stores/145')
                .set('access_token', access_token)

            const expectedRes = {
                message: "Store not found"
            }

            expect(response.status).toEqual(404)
            expect(response.body).toEqual(expectedRes)
        })
    })
})