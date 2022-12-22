// Emit skickar data till alla som lyssnar på det eventet

const io = require("socket.io")(3000, {
    cors: {
      origin: "http://localhost:3001"
    },
  })



