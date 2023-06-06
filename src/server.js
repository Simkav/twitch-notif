const http = require('node:http');

let code = null

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    if (url.searchParams.has('code')) {
        const clientCode = url.searchParams.get('code')
        code = clientCode
        console.log(code);
    }
    res.end('Pong')
})

module.exports = { server }