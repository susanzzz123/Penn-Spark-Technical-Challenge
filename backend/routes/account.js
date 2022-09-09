const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const User = require('../models/user')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const taken = await User.exists({ username })
    if (taken) {
      throw new Error('username is taken')
    }
    await User.create({ username, password })
    res.send('successfully created user')
  } catch (e) {
    console.log(e)
    next(new Error('username is taken/username or password cannot be empty'))
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  if (req.session.username) {
    res.send(`you are logged in as ${req.session.username}`)
  } else {
    try {
      const user = await User.findOne({ username })
      if (user === null) {
        throw new Error('user does not exist')
      } else if (password !== user.password) {
        throw new Error('incorrect password')
      } else {
        req.session.username = username
        res.send('Login was successful!')
      }
    } catch (e) {
      next(new Error('username or password is incorrect'))
    }
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session = null
  res.send('you have logged out')
})

module.exports = router