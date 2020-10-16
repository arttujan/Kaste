const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const questionRouter = require('./controllers/question')
const middleware = require('./utils/middleware')
//media server
const nms = require('./mediasrv/mediasrv')

nms.run();

// Taking connection to the database
mongoose.connect(config.CONNECTION_STRING, {useNewUrlParser : true, useUnifiedTopology : true})
.then(() => {
    console.log("Connected to the database")
}).catch(error => {
    console.log("Something went wrong: ", error.message)
})

// Application itself
const app = express()

//Using cross origin policy to allow access to app from other ports
app.use(cors())
// Using dist directory to serve files in root url
app.use(express.static('dist'))
// Using express json parser to avoid installing body-parser
app.use(express.json())

// Test route
app.use('/api/question', questionRouter)

// Lets handle unknown endpoints
app.use(middleware.unknownEndpoint)
// Lets export the actual application for server to launch
module.exports = app

