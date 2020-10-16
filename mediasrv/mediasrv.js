const NodeMediaSrv = require('node-media-server')
const config = require('../utils/config')

module.exports = new NodeMediaSrv(config.MEDIACONF)

