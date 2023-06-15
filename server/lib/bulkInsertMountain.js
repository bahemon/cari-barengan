const { Mountain } = require('../models')
const Sequelize = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()

async function bulkInsertMountains() {
  await queryInterface.bulkDelete('Mountains', {}, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })

  await Mountain.bulkCreate(
    [
      {
        "name": "Gunung Pangrango",
        "province": "Jawa Barat",
        "masl": 3019,
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/52/Pangrango%2C_West_Java.jpg",
        "lattitude": -6.7773,
        "longitude": 106.981
      },
      {
        "name": "Gunung Gede",
        "province": "Jawa Barat",
        "masl": 2958,
        "imageUrl": "https://asset.kompas.com/crops/HdQsWSn2cVwwYnJNFydP5LzFOyo=/0x80:960x720/750x500/data/photo/2019/10/07/5d9ac4912b4f5.jpeg",
        "lattitude": -6.78,
        "longitude": 106.98
      },
      {
        "name": "Gunung Papandayan",
        "province": "Jawa Barat",
        "masl": 2665,
        "imageUrl": "https://asset.kompas.com/crops/vgrS-pfKafSjyKGUmsIc7LBGrIA=/0x0:999x666/750x500/data/photo/2021/08/25/61263bf38df6c.jpg",
        "lattitude": -7.32,
        "longitude": 107.73
      },
      {
        "name": "Gunung Salak",
        "province": "Jawa Barat",
        "masl": 2211,
        "imageUrl": "https://upload.wikimedia.org/wikipedia/id/2/20/Salak_050408_012_bblk_resize.jpg",
        "lattitude": -6.43,
        "longitude": 106.44
      },
      {
        "name": "Gunung Ciremai",
        "province": "Jawa Barat",
        "masl": 3078,
        "imageUrl": "https://www.bandoeng.co.id/wp-content/uploads/2021/09/Harga-Tiket-Gunung-Ciremai.jpg",
        "lattitude": -6.892,
        "longitude": 108.4
      },
    ]

  )
}

module.exports = bulkInsertMountains