const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const JWT_SECRET = '@jwtSecret123!'

const authenticateUser = (req, res, next) => {
  try {
    const jwtToken = req.get('Authorization').split(' ')[1]
    jwt.verify(jwtToken, JWT_SECRET)
    next()
  } catch(err) {
    res.status(401).json({
      error: 'User not authenticated'
    })
  }
}

const isValidUser = (username, password) => {
  return username && username.length && password && password.length
}

router.post('/authenticate', (req, res) => {
  if (isValidUser(req.body.username, req.body.password)) {
    const data = { token: 'data-token' }
    const token = jwt.sign(data, JWT_SECRET)
    return res.json({ token })
  }

  res.status(403).json({
    error: 'Invalid credentials'
  })
})

module.exports = {
  router,
  authenticateUser
}
