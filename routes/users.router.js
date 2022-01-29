const express = require('express')
const router = express.Router()

const USERS = [
  'admin',
  'it-admin',
  'user-1',
  'user-2'
]

router.get('/', (req, res) => {
  res.json(USERS)
})

router.get('/paginated', (req, res) => {
  const { limit, offset } = req.query

  if (limit && offset) {
    res.json(USERS.slice(offset, limit))
  }

  res.send('Limit and offset params are required')
})

module.exports = router
