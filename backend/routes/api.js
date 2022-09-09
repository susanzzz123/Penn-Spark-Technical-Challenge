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
    res.json(tweets.splice(0, 10))
  } catch (e) {
    next(new Error('an error occured while fetching the tweets'))
  }
})

router.get('/tweets/hashtag', async (req, res, next) => {
    const { hashtag } = req.body
    try {
      const tweets = await Tweet.find({ hashtag })
      res.json(tweets)
    } catch (e) {
      next(new Error('an error occured while fetching the hashtagged tweets'))
    }
  })

router.post('/tweets/add', isAuthenticated, async (req, res, next) => {
  const { tweetText, hashtag } = req.body
  const author = req.session.username
  try {
    await Tweet.create({ tweetText, reply: '', author, hashtag })
    res.send('new tweet posted successfully')
  } catch (e) {
    next(new Error('error while creating tweet'))
  }
})

router.post('/tweets/reply', isAuthenticated, async (req, res, next) => {
  const { _id, reply } = req.body
  try {
    if (answer === '' || reply === undefined) {
      throw new Error('answer cannot be empty')
    }
    await Tweet.updateOne({ _id }, { reply })
    res.send('tweet answered successfully')
  } catch (e) {
    next(new Error('error while answering tweet'))
  }
})

router.delete('/tweets/delete', isAuthenticated, async (req, res, next) => {
  const { _id, author } = req.body
  try {
    if (author !== req.session.username) {
      throw new Error('cannot delete tweet if you are not the author')
    }
    await Tweet.deleteOne({ _id })
    res.send('tweet deleted successfully')
  } catch (e) {
    next(new Error('error while deleting tweet'))
  }
})

module.exports = router