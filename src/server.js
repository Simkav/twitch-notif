const http = require('node:http');
const { sendStreams } = require('./util');

let code = null

const server = http.createServer(async (req, res) => {
    if (req.url === '/cron') {
        res.end(await sendStreams())
        return
    }
    const url = new URL(req.url, `http://${req.headers.host}`)
    if (url.searchParams.has('code')) {
        const clientCode = url.searchParams.get('code')
        code = clientCode
        console.log(code);
    }
    res.end('Pong')
})

module.exports = { server }