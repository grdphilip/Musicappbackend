require('dotenv').config()


//Socket io låter sessionen vara kvar

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//Allows us to use any middleware we want
app.use(express.json())

const roomsRouter = require('./routes/rooms')
app.use('/rooms', roomsRouter)


app.listen(3000, () => console.log('Server has started'))
