const { streams, tokens } = require("./db")
const { sendStreamsToTg } = require("./telegram")
const { getOnlineStream } = require("./twitch")

const updateTokens = async () => {
    const { refresh_token } = await tokens.get('simkav')
    const newTokens = await refreshToken(refresh_token)
    await tokens.set('simkav', newTokens)
}

const handleStreams = async (onlineStreams = []) => {
    const { streams: oldStreamsData } = await streams.get('simkav')
    const oldStreams = oldStreamsData.split(',')
    await streams.set('simkav', { streams: onlineStreams.join(',') })
    const newStremas = onlineStreams.filter((stream) => !oldStreams.includes(stream))
    return newStremas
}


const sendStreams = async () => {
    console.log('start sendStream');
    const { access_token } = await tokens.get('simkav')
    let onlineStreams = []
    try {
        onlineStreams = await getOnlineStream(access_token, process.env.TWITCH_USER_ID)
    } catch (e) {
        if (e.message = 401) {
            await updateTokens()
            sendStreams()
        }
    }
    const updatedStremas = await handleStreams(onlineStreams)
    if (updatedStremas.length) await sendStreamsToTg(updatedStremas)
    console.log(updatedStremas)
    return updatedStremas.join(',')
}


const startLoop = () => {
    console.log('loop started');
    const id = setInterval(sendStreams, 1_000 * 100 * 1)
    return () => clearInterval(id)
}

module.exports = { startLoop, sendStreams }