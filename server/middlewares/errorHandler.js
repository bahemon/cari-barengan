function errorHandler(err, req, res, next) {
  console.log(err)
  if (err.hasOwnProperty('code')) {
    res.status(err.code).json({
      message: err.message
    })
  }
  else if (err.name === 'SequelizeValidationError') {
    res.status(400).json({
      message: err.errors[0].message
    })
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      message: err.errors[0].message
    })
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      message: 'Invalid token'
    })
  } else {
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

module.exports = errorHandler