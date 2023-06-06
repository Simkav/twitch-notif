const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb(process.env.CYCLIC_DB)

const tokensColl = db.collection("tokens")
const streamsColl = db.collection('streams')

const createSet = (col) => async (key, value) => await col.set(key, value)
const createGet = (col) => async (key) => {
    const data = await col.get(key)
    if (data === null) return null
    const { updated, created, ...returnData } = data.props
    return returnData
}


const tokens = { get: createGet(tokensColl), set: createSet(tokensColl) }
const streams = { get: createGet(streamsColl), set: createSet(streamsColl) }

module.exports = { tokens, streams }