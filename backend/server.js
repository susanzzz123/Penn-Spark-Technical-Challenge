const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')
const cors = require('cors')

const account = require('./routes/account')
const api = require('./routes/api')

const app = express()
const port = process.env.PORT || 3000

const MONGO_URI = process.env.MONGODB_URI ||
'mongodb+srv://Susan:Susanzzz123@cluster0.ehvmi.mongodb.net/?retryWrites=true&w=majority'

//connect to database
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'twitter-replica'
})

app.use(express.json())

app.use(express.static('dist')) // set the static folder

app.use(cookieSession({
  name: 'session',
  keys: ['pineapple'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(cors({ credentials: true, origin: 'http://localhost:1234' }))

app.use('/account', account)
app.use('/api', api)

// error handling
app.use((err, req, res, next) => {
  res.status(500).send(`Something broke! Reason: ${err.message}`)
})

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Start listening for requests
app.listen(port, () => {
  console.log('Listening on port ' + port)
})