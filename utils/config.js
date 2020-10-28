// Getting configuration via dotenv library
require('dotenv').config()

// Getting db connectionstring and port from environment variables
let CONNECTION_STRING = process.env.CONNECTION_STRING
let PORT = process.env.PORT
let MEDIACONF = {
    logtype: 3,
    rtmp: {
      port: Number(process.env.RTMP_PORT),
      chunk_size: Number(process.env.CHUNK_SIZE),
      gop_cache: Boolean(process.env.GOP_CACHE),
      ping: Number(process.env.PING),
      ping_timeout: Number(process.env.PING_TIMEOUT)
    },
    http: {
      port: Number(process.env.MEDIA_HTTP),
      allow_origin: Number(process.env.ALLOW_ORIGIN),
      mediaroot: './dist/media'
    },
    auth: {
        api : Boolean(process.env.ENABLED),
        api_user: process.env.USER,
        api_pass: process.env.PASSWD,
      },
      trans: {
        ffmpeg: '/usr/bin/ffmpeg',
        tasks: [
          {
            app: 'live',
            vc: "copy",
            vcParam: [],
            ac: "aac",
            acParam: ['-ab', '64k', '-ac', '1', '-ar', '44100'],
            rtmp:true,
            rtmpApp:'live2',
            hls: true,
            hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
            dash: true,
            dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
          }
        ]
      }
  };
  

// Exporting
module.exports = {
    CONNECTION_STRING,
    PORT,
    MEDIACONF
}