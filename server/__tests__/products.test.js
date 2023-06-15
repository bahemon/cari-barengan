const request = require('supertest')
const app = require('../app')
const models = require('../models')
const jwt = require('jsonwebtoken')
const bulkInsertProducts = require('../lib/bulkInsertProducts')
const { User } = require('../models')
const db = require('../models')
const bulkInsertStores = require('../lib/bulkInsertStores')
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
  const user = await User.create({
    username: "zyy",
    email: "zyy@mail.com",
    password: "12345",
  })
  // console.log(user, 'masuk sini');
  // console.log(access_token, "<<<<>>>");
  access_token = jwt.sign({ id: user.id }, "SECRET")
})

afterAll(async function () {
  await models.sequelize.close()
})

describe('POST /products', function () {
  describe('When success fetch products', function () {
    it('should send a response with 200 status code', async function () {
      const response = await request(app)
        .post('/products')
        // .set('access_token', access_token)
        .attach('imageUrl', './lib/testing.png')
        .field('name', 'testing')
        .field('stock', 5)
        .field('price', 10000)
        .field('CategoryId', 2)
        .field('StoreId', 2)
        .set('access_token', access_token)

      const expectedRes = {
        isAvailable: true,
        id: response.body.id,
        name: "testing",
        stock: 5,
        imageUrl: response.body.imageUrl,
        price: 10000,
        CategoryId: 2,
        StoreId: 2,
        updatedAt: response.body.updatedAt,
        createdAt: response.body.createdAt
      }

      // console.log(response.body, "<<<<<<<<")
      expect(response.status).toEqual(201)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When empty name', function () {
    it('should send a response with 400 status code', async function () {
      const response = await request(app)
        .post('/products')
        .set('access_token', access_token)
        .attach('imageUrl', './lib/testing.png')
        .field('name', '')
        .field('stock', 5)
        .field('price', 10000)
        .field('CategoryId', 2)
        .field('StoreId', 2)
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      // console.log(response.body, "<<<<<<<<")
      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When empty stock', function () {
    it('should send a response with 400 status code', async function () {
      const response = await request(app)
        .post('/products')
        // .set('access_token', access_token)
        .attach('imageUrl', './lib/testing.png')
        .field('name', 'testing')
        .field('stock', '')
        .field('price', 10000)
        .field('CategoryId', 2)
        .field('StoreId', 2)
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      // console.log(response.body, "<<<<<<<<")
      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When empty price', function () {
    it('should send a response with 400 status code', async function () {
      const response = await request(app)
        .post('/products')
        // .set('access_token', access_token)
        .attach('imageUrl', './lib/testing.png')
        .field('name', 'testing')
        .field('stock', 5)
        .field('price', '')
        .field('CategoryId', 2)
        .field('StoreId', 2)
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      // console.log(response.body, "<<<<<<<<")
      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When empty category id', function () {
    it('should send a response with 400 status code', async function () {
      const response = await request(app)
        .post('/products')
        // .set('access_token', access_token)
        .attach('imageUrl', './lib/testing.png')
        .field('name', 'testing')
        .field('stock', 5)
        .field('price', 10000)
        .field('CategoryId', '')
        .field('StoreId', 2)
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      // console.log(response.body, "<<<<<<<<")
      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When empty store id', function () {
    it('should send a response with 400 status code', async function () {
      const response = await request(app)
        .post('/products')
        // .set('access_token', access_token)
        .attach('imageUrl', './lib/testing.png')
        .field('name', 'testing')
        .field('stock', 5)
        .field('price', 10000)
        .field('CategoryId', 2)
        .field('StoreId', '')
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      // console.log(response.body, "<<<<<<<<")
      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)
    })
  })
})

describe('GET /products/stores/1', function () {
  describe('When success fetch products store by 1', function () {
    it('should send a response with 200 status code', async function () {
      const response = await request(app)
        .get('/products/stores/1')
        .set('access_token', access_token)

      expect(response.status).toEqual(200)
      // console.log(response.body, "<<<<<");
      expect(Array.isArray(response.body)).toEqual(true)
      expect(response.body[0]).toHaveProperty("name")
      expect(response.body[0]).toHaveProperty("stock")
      expect(response.body[0]).toHaveProperty("imageUrl")
      expect(response.body[0]).toHaveProperty("isAvailable")
      expect(response.body[0]).toHaveProperty("price")
    })
  })

  describe('When empty access token', function () {
    it('should send a response with 401 status code', async function () {
      const response = await request(app)
        .get('/products/1')
      // .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(401)
      // console.log(response.body, "<<<<<");
      expect(response.body).toEqual(expectedRes)
    })
  })
})

describe('GET /products/:id', function () {
  describe('When success fetch products by 1', function () {
    it('should send a response with 200 status code', async function () {
      const response = await request(app)
        .get('/products/1')
        .set('access_token', access_token)

      expect(response.status).toEqual(200)
      // console.log(response.body.message, "<<<<<");
      // expect(Array.isArray(response.body)).toEqual(true)
      expect(response.body).toHaveProperty("name")
      expect(response.body).toHaveProperty("stock")
      expect(response.body).toHaveProperty("imageUrl")
      expect(response.body).toHaveProperty("isAvailable")
      expect(response.body).toHaveProperty("price")
    })
  })

  describe('When empty access token', function () {
    it('should send a response with 401 status code', async function () {
      const response = await request(app)
        .get('/products/stores/1')
      // .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(401)
      // console.log(response.body, "<<<<<");
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When products not found', function () {
    it('should send a response with 404 status code', async function () {
      const response = await request(app)
        .get('/products/500')
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

describe('PUT /products/:id', function () {
  describe('When success update product data by id', function () {
    it('should send a response with 200 status code and updated data', async function () {
      const response = await request(app)
        .put('/products/1')
        .send({
          name: "Tenda 5 Kapasitas 6",
          stock: "3",
          price: "45000",
          AuthorId: "5",
          MountainId: "1"
        })
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When success update product stock by id', function () {
    it('should send a response with 200 status code and updated data', async function () {
      const response = await request(app)
        .put('/products/1')
        .send({
          name: "Tenda 5 Kapasitas 6",
          stock: "5",
          price: "45000",
          AuthorId: "5",
          MountainId: "1"
        })
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When success update product price by id', function () {
    it('should send a response with 200 status code and updated data', async function () {
      const response = await request(app)
        .put('/products/1')
        .send({
          name: "Tenda 5 Kapasitas 6",
          stock: "5",
          price: "50000",
          AuthorId: "5",
          MountainId: "1"
        })
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When empty name', function () {
    it('should send a response with 400 status code', async function () {
      const response = await request(app)
        .put('/products/1')
        .send({
          name: "",
          stock: "5",
          price: "50000",
          AuthorId: "5",
          MountainId: "1"
        })
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)

    })
  })


  describe('When empty stock', function () {
    it('should send a response with 400 status code', async function () {
      const response = await request(app)
        .put('/products/1')
        .send({
          name: "Tenda 5 Kapasitas 6",
          stock: "",
          price: "50000",
          AuthorId: "5",
          MountainId: "1"
        })
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)

    })
  })

  describe('When empty price', function () {
    it('should send a response with 400 status code', async function () {
      const response = await request(app)
        .put('/products/1')
        .send({
          name: "Tenda 5 Kapasitas 6",
          stock: "5",
          price: "",
          AuthorId: "5",
          MountainId: "1"
        })
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(400)
      expect(response.body).toEqual(expectedRes)

    })
  })

  describe('When empty access token', function () {
    it('should send a response with 401 status code', async function () {
      const response = await request(app)
        .get('/products/1')
      // .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })
})

describe('PATCH /products/:id', function () {
  describe('When success update product available by id', function () {
    it('should send a response with 200 status code and updated data', async function () {
      const response = await request(app)
        .patch('/products/1')
        .send({
          name: "Tenda 5 Kapasitas 6",
          stock: "3",
          price: "45000",
          AuthorId: "5",
          MountainId: "1",
          isAvailable: true,
        })
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(expectedRes)

    })
  })

  describe('When success update product available by id', function () {
    it('should send a response with 200 status code and updated data', async function () {
      const response = await request(app)
        .patch('/products/1')
        .send({
          name: "Tenda 5 Kapasitas 6",
          stock: "3",
          price: "45000",
          AuthorId: "5",
          MountainId: "1",
          isAvailable: false,
        })
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(200)
      expect(response.body).toEqual(expectedRes)

    })
  })

  describe('When empty access token', function () {
    it('should send a response with 401 status code', async function () {
      const response = await request(app)
        .patch('/products/1')
        .send({
          name: "Tenda 5 Kapasitas 6",
          stock: "3",
          price: "45000",
          AuthorId: "5",
          MountainId: "1",
          isAvailable: false,
        })
      // .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When products not found', function () {
    it('should send a response with 404 status code', async function () {
      const response = await request(app)
        .patch('/products/500')
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

describe('DELETE /products/:id', function () {
  describe('When success delete product by id', function () {
    it('should send a response with 200 status code and delete data', async function () {
      const response = await request(app)
        .delete('/products/1')
        .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(200)
      // console.log(response.body.message, "<<<<<<");
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When success delete product by id', function () {
    it('should send a response with 401 status code', async function () {
      const response = await request(app)
        .delete('/products/1')
      // .set('access_token', access_token)

      const expectedRes = {
        message: response.body.message
      }

      expect(response.status).toEqual(401)
      expect(response.body).toEqual(expectedRes)
    })
  })

  describe('When products not found', function () {
    it('should send a response with 404 status code', async function () {
      const response = await request(app)
        .delete('/products/500')
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