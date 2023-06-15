const { Product } = require('../models')
const db = require('../models')
const bulkInsertStores = require('./bulkInsertStores')
const queryInterface = db.sequelize.getQueryInterface()

async function bulkInsertProducts() {
  await queryInterface.bulkDelete('Products', {}, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })

  await Product.bulkCreate(
    [
      {
        "name": "Tenda 5 Kapasitas 5",
        "stock": 3,
        "imageUrl": "https://cf.shopee.co.id/file/de063753602c998f80ca08f2094324e2",
        "isAvailable": true,
        "price": 45000,
        "CategoryId": 1,
        "StoreId": 1
      },
      {
        "name": "Jaket bulu angsa",
        "stock": 2,
        "imageUrl": "https://images.tokopedia.net/img/cache/500-square/hDjmkQ/2022/4/23/647a17e7-0bd8-45b7-a669-46369a733d09.jpg",
        "isAvailable": true,
        "price": 15000,
        "CategoryId": 2,
        "StoreId": 1
      },
      {
        "name": "Cooking set",
        "stock": 5,
        "imageUrl": "https://www.jakartanotebook.com/images/products/72/1020/58559/2/astagear-panci-masak-cooking-set-camping-outdoor-7-pcs-ds-308-black-27.jpg",
        "isAvailable": true,
        "price": 10000,
        "CategoryId": 3,
        "StoreId": 1
      },
      {
        "name": "Carrier 65L",
        "stock": 3,
        "imageUrl": "https://images.tokopedia.net/img/cache/500-square/product-1/2020/1/18/84785352/84785352_0d87f83e-75cb-4343-9562-7a486921b642_1333_1333",
        "isAvailable": true,
        "price": 20000,
        "CategoryId": 4,
        "StoreId": 1
      },
      {
        "name": "Sleeping bag bulu angsa",
        "stock": 5,
        "imageUrl": "https://images.tokopedia.net/img/cache/500-square/product-1/2018/9/19/2286335/2286335_86fe0bd3-9101-472c-bf49-01fefbd5541d_800_800.jpg",
        "isAvailable": true,
        "price": 15000,
        "CategoryId": 5,
        "StoreId": 1
      },
      {
        "name": "Trekking pole",
        "stock": 5,
        "imageUrl": "https://cdn11.bigcommerce.com/s-hgn1l9sh63/images/stencil/1000w/attribute_rule_images/6367_source_1664949985.png",
        "isAvailable": true,
        "price": 12000,
        "CategoryId": 6,
        "StoreId": 1
      }
    ]
  )
}
module.exports = bulkInsertProducts
