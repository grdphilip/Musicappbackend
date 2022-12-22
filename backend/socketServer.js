
const io = require("socket.io")(3009, {
    cors: {
      origin: "http://localhost:3001"
    },
  })

let game
let players

