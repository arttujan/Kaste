const http = require('http')
const app = require('./app')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config .PORT, () => {
    console.log(`Website available at http://localhost:${config.PORT}`)
    console.log(`RTMP started on rtmp://localhost:${config.MEDIACONF.rtmp}`)
    console.log(`Steam admin panel available at http://localhost:${config.MEDIACONF.http.port}/admin`)
})