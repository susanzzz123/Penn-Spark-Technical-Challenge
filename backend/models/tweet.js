const mongoose = require('mongoose')
const { Schema, model } = mongoose

const tweetSchema = new Schema({
  tweetText: { type: String, required: true },
  reply: String,
  author: String,
  hashtag: { type: String, required: true }
})

const Tweet = model('Tweet', tweetSchema)

module.exports = Tweet