// const { configDotenv } = require("dotenv");
// configDotenv()
const { server } = require("./server");
const { startLoop } = require("./util");

startLoop()

server.listen(3000, () => { console.log('server started') })