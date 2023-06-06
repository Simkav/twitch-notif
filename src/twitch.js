const { request } = require("undici")
const getUserCodeUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=http://localhost:3000/twitch&scope=${encodeURIComponent('user:read:follows')}`

const getTokenPair = async (code) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("client_id", process.env.TWITCH_CLIENT_ID);
    urlencoded.append("client_secret", process.env.TWITCH_SECRET);
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("redirect_uri", "http://localhost:3000/twitch");
    urlencoded.append("code", code);
    const {
        body, statusCode
    } = await request('https://id.twitch.tv/oauth2/token', { method: 'POST', body: urlencoded.toString() })
    const data = await body.json()
    const result = { 'access_token': data.access_token, 'refresh_token': data.refresh_token }
    return result
}

const refreshToken = async (token) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("client_id", process.env.TWITCH_CLIENT_ID);
    urlencoded.append("client_secret", process.env.TWITCH_SECRET);
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("refresh_token", token);
    const {
        body, statusCode
    } = await request('https://id.twitch.tv/oauth2/token', { method: 'POST', body: urlencoded.toString() })
    const data = await body.json()
    const result = { 'access_token': data.access_token, 'refresh_token': data.refresh_token }
    return result
}

const getOnlineStream = async (token, id) => {
    const { body, statusCode } = await request(`https://api.twitch.tv/helix/streams/followed?user_id=${id}`, {
        headers: { 'Authorization': `Bearer ${token}`, "Client-Id": process.env.TWITCH_CLIENT_ID }
    })
    if (statusCode === 401) {
        throw new Error(401)
    }
    const { data } = await body.json()
    return data.map(el => el.user_name)
}

module.exports = { refreshToken, getTokenPair, getUserCodeUrl, getOnlineStream }
