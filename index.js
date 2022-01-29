const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')
const app = express()
const port = 3000
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const AUTHORIZED_DOMAINS = ['http://localhost:3000/', 'http://localhost:8080', 'http://127.0.0.1:5500']

const options = {
  origin: (origin, callback) => {
    if (AUTHORIZED_DOMAINS.includes(origin) || origin === undefined) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(options))

app.use(express.json())

app.listen(port, () => {
  console.log('RUNNING EXPRESS SERVER ON PORT:', port)
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)
