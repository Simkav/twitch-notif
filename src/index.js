// const { configDotenv } = require("dotenv");
// configDotenv()
const { server } = require("./server");
const { startLoop } = require("./util");
console.log(process.env)
startLoop()

server.listen(3000, () => { console.log('server started') })