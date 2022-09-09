const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Tweet = require('../models/tweet')

const router = express.Router()

router.get('/status', (req, res) => {
  res.send(req.session.username)
})

router.get('/tweets', async (req, res, next) => {
  try {
    const tweets = await Tweet.find()
    res.json(tweets)
  } catch (e) {
    next(new Error('an error occured while fetching the tweets'))
  }
})

router.post('/tweets/add', isAuthenticated, async (req, res, next) => {
  const { tweetText, hashtag, tweetImg, created_at } = req.body
  const author = req.session.username
  try {
    await Tweet.create({ tweetText, tweetImg, author, hashtag, created_at })
    res.send('new tweet posted successfully')
  } catch (e) {
    next(new Error('error while creating tweet'))
  }
})

router.delete('/tweets/delete', isAuthenticated, async (req, res, next) => {
  const { _id, author } = req.body
  try {
    if (author !== req.session.username) {
      res.send('wrong person lol')
      throw new Error('cannot delete tweet if you are not the author')
    }
    await Tweet.deleteOne({ _id })
    res.send('tweet deleted successfully')
  } catch (e) {
    console.log(e)
    next(new Error('error while deleting tweet'))
  }
})

module.exports = router