// Getting configuration via dotenv library
require('dotenv').config()

// Getting db connectionstring and port from environment variables
let CONNECTION_STRING = process.env.CONNECTION_STRING
let PORT = process.env.PORT
let MEDIACONF = {
    rtmp: {
      port: process.env.RTMP_PORT,
      chunk_size: process.env.CHUNK_SIZE,
      gop_cache: process.env.GOP_CACHE,
      ping: process.env.PING,
      ping_timeout: process.env.PING_TIME_OUT
    },
    http: {
      port: process.env.MEDIA_HTTP,
      allow_origin: process.env.ALLOW_ORIGIN
    }
  };
  

// Exporting
module.exports = {
    CONNECTION_STRING,
    PORT,
    MEDIACONF
}