const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const JWT_SECRET = '@jwtSecret123!'
const expires = {} //{ expiresIn: "1h" }
const sendUnauthorizedResponse = (res) => {
  res.status(401).json({
    error: 'User not authenticated'
  })
}

const sendInvalidCredentialsResponse = (res) => {
  res.status(403).json({
    error: 'Invalid credentials'
  })
}

const authenticateUser = (req, res, next) => {
  try {
    const jwtToken = req.get('Authorization').split(' ')[1]
    jwt.verify(jwtToken, JWT_SECRET, (err, decoded) => {
      if (err) {
        return sendUnauthorizedResponse(res)
      }
      next()
    })
  } catch(err) {
    sendUnauthorizedResponse(res)
  }
}

const isValidUser = (username, password) => {
  return username && username.length && password && password.length
}

router.post('/authenticate', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (isValidUser(username, password)) {
    const data = { username }
    jwt.sign(
      data,
      JWT_SECRET,
      expires,
      (err, token) => {
        if (err) {
          return sendInvalidCredentialsResponse(res)
        }
        res.json({ token })
      })
  } else {
    return sendInvalidCredentialsResponse(res)
  }
})

module.exports = {
  router,
  authenticateUser
}
