const mongoose = require('mongoose')
const { Schema, model } = mongoose

const tweetSchema = new Schema({
  tweetText: { type: String, required: true },
  answer: String,
  author: String,
  hashtag: String
})

const Tweet = model('Tweet', tweetSchema)

module.exports = Tweet