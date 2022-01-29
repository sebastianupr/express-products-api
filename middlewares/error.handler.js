function logErrors (err, req, res, next) {
  next(err)
}

function errorHandler (err, req, res, next) {
  res.status(500).json({
    error: err.message
  })
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    res.status(err.output.statusCode).json({
      error: err.output.payload
    })
  } else {
    next(err)
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
