const { Profile } = require('../models')
const db = require('../models')
const { hashedPassword } = require('../helpers/bcrypt')
const queryInterface = db.sequelize.getQueryInterface()

async function bulkInsertUserProfiles() {
  await queryInterface.bulkDelete('Users', {}, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })

  await queryInterface.bulkDelete('Profiles', {}, {
    restartIdentity: true,
    cascade: true
  })

  await Profile.bulkCreate(
    [
        {
            "fullName": "Durmad Waridan",
            "dateOfBirth": "2000-12-12",
            "gender": "Male",
            "profileImage": null,
            "UserId": 1
          },
          {
            "fullName": "Maman Suherman",
            "dateOfBirth": "2000-10-31",
            "gender": "Male",
            "profileImage": null,
            "UserId": 2
          },
          {
            "fullName": "Juki Al Qobuli",
            "dateOfBirth": "1995-10-31",
            "gender": "Male",
            "profileImage": null,
            "UserId": 3
          },
          {
            "fullName": "Siti Nurbaya",
            "dateOfBirth": "1995-10-31",
            "gender": "Female",
            "profileImage": null,
            "UserId": 4
          },
          {
            "fullName": "Reyhansyah Fauzan",
            "dateOfBirth": "1995-10-31",
            "gender": "Male",
            "profileImage": null,
            "UserId": 5
          },
          {
            "fullName": "Lukman Sardi",
            "dateOfBirth": "1995-10-31",
            "gender": "Male",
            "profileImage": null,
            "UserId": 6
          }
    ]

  )
}

module.exports = bulkInsertUserProfiles