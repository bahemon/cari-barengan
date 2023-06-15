const { User } = require('../models')
const db = require('../models')
const { hashedPassword } = require('../helpers/bcrypt')
const queryInterface = db.sequelize.getQueryInterface()

async function bulkInsertUsers() {
  await queryInterface.bulkDelete('Users', {}, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })

  await queryInterface.bulkDelete('Profiles', {}, {
    restartIdentity: true,
    cascade: true
  })

  await User.bulkCreate(
    [
      {
        username: "jamalAdmin",
        email: "jamalAdmin@mail.com",
        password: hashedPassword("12345"),
        role: "Admin"
      },
      {
        username: "mamandajek",
        email: "mamandajek@mail.com",
        password: hashedPassword("12345"),
        role: "Hiker"
      },
      {
        username: "jukiAlqobuli",
        email: "jukiAlqobuli@mail.com",
        password: hashedPassword("12345"),
        role: "Hiker"
      },
      {
        username: "Sitinurbaya",
        email: "Sitinurbaya@mail.com",
        password: hashedPassword("12345"),
        role: "Hiker"
      },
      {
        username: "reyPendaki",
        email: "reyPendaki@mail.com",
        password: hashedPassword("12345"),
        role: "Hiker"
      },
      {
        username: "lukmanSardi",
        email: "lukmanSardi@mail.com",
        password: hashedPassword("12345"),
        role: "Hiker"
      }
    ]

  )
}

module.exports = bulkInsertUsers