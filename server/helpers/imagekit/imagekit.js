const FormData = require('form-data')
const axios = require('axios')

async function imageKitHandle(input) {
  try {
    const form = new FormData()

    form.append('file', input.buffer, {
      filename: input.originalname
    })
    form.append('fileName', input.originalname)

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY_ENCODED

    const { data } = await axios({
      method: 'POST',
      url: 'https://upload.imagekit.io/api/v1/files/upload',
      data: form,
      headers: {
        Authorization: 'Basic ' + privateKey
      }
    })

    return data
  } catch (err) {
    console.log(err)
  }
}

module.exports = imageKitHandle
