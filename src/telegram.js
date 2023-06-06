const { request } = require("undici");

const url = `https://api.telegram.org/bot${process.env.TELEGRAM_API}/sendMessage?chat_id=${process.env.TELEGRAM_ID}`

const sendStreamsToTg = async (streams) => {
    const joinedStreams = streams.join('\n')
    await request(url + '&text=' + encodeURIComponent(joinedStreams), { method: 'POST' })
}

module.exports = { sendStreamsToTg }