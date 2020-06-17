const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const passport = require('passport')
const usersRouter = require('./routes/users')
const profileRouter = require('./routes/user-profile')
const getUsersRouter = require('./routes/user-list')

const mongoURL = "mongodb+srv://jha:jha@cluster-demo-1-agxfu.mongodb.net/bus-booking-db-v1?retryWrites=true&w=majority"

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected with mongodb ONLINE !!!!!!!!')
    })
    .catch(err => {
        if (err) throw err
    })

require('./config/passport')
app.use('/user', usersRouter)

app.use(passport.authenticate('jwt', { session: false }))
app.use('/profile', profileRouter)
app.use('/get-users', getUsersRouter)


const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening on port " + port))

module.exports = app;