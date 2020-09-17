// Getting configuration via dotenv library
require('dotenv').config()

// Getting db connectionstring and port from environment variables
let CONNECTION_STRING = process.env.CONNECTION_STRING
let PORT = process.env.PORT

// Exporting
module.exports = {
    CONNECTION_STRING,
    PORT
}