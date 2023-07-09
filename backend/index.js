const express = require('express')
const mongoose = require('mongoose')
const EventRouter = require('./routes/events')
const RegistrationRouter = require('./routes/registration')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use('/events', EventRouter)
app.use('/registration', RegistrationRouter)

mongoose.connect('mongodb://localhost:27017/innovator')
app.listen(8000, () => {
    console.log("server running at port 8000")
})