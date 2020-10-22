const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const questionRouter = require('./controllers/question')
const middleware = require('./utils/middleware')
//media server
const nms = require('./mediasrv/mediasrv')

nms.run();

nms.on('preConnect', (id, args) => {
    console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
    // let session = nms.getSession(id);
    // session.reject();
  });
  
  nms.on('postConnect', (id, args) => {
    console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
  });
  
  nms.on('doneConnect', (id, args) => {
    console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
  });
  
  nms.on('prePublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    // let session = nms.getSession(id);
    // session.reject();
  });
  
  nms.on('postPublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  });
  
  nms.on('donePublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  });
  
  nms.on('prePlay', (id, StreamPath, args) => {
    console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    // let session = nms.getSession(id);
    // session.reject();
  });
  
  nms.on('postPlay', (id, StreamPath, args) => {
    console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  });
  
  nms.on('donePlay', (id, StreamPath, args) => {
    console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  });

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

