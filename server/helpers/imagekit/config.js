const ImageKit = require("imagekit")

const imagekit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/caribarengan"
})

module.exports = imagekit