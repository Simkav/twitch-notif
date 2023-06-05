const http = require('node:http');

const server = http.createServer((req, res) => {
    res.end('Pong')
})

module.exports = { server }