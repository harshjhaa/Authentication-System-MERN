const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const Users = require('../models/User')

const router = express.Router();

const verifyToken = (req, res, next) => {
    //Get the auth header
    const bearerHeader = req.headers['authorization']
    //check if bearerHeader undefined
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        //Forbidden
        res.sendStatus(403)
    }
}

router
    .post('/register', async (req, res) => {
        // const { errors, isValid } = validator.registerValidator(req.body)
        // if (!isValid) {
        //     res.status(404).json(errors)
        // }
        let hashPassword = await bcrypt.hash(req.body.password, 10)
        const registerNewUser = {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hashPassword,
        }
        try {
            Users.find({ email: req.body.email }, (err, foundUser) => {
                if (!foundUser) {
                    console.log("koi dikkat h shayd")
                    res.send("koi dikkat h shayd")
                } else {
                    if (err) {
                        console.log(err)
                        res.status(500).send()
                    }
                    else {
                        if (foundUser.length === 0) {
                            const newUser = new Users(registerNewUser)
                            newUser.save((err) => {
                                if (err) throw err
                                res.send("Registration successful")
                            })
                        }
                        else {
                            res.send("Email already exists")
                        }
                    }
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    })

    .post('/login', async (req, res, next) => {
        console.log("Route")
        passport.authenticate('login', async (err, user, info) => {
            console.log("Inside Route Auhtenticate")
            try {
                if (err || !user) {
                    res.status(401).json({ message: info.message })
                    return
                }
                req.login(user, { session: false }, async (error) => {
                    if (error) return next(error)
                    const payload = {
                        id: user._id,
                        email: user.email,
                        name: user.name
                    }
                    jwt.sign({ payload }, keys.secretOrKey, /* { expiresIn: '15s' }, */(err, token) => {
                        if (err) throw err
                        res.json({
                            token
                        })
                    })
                })
            } catch (error) {
                return next(error);
            }
        })(req, res, next)
    })

    // .get('/login', (req, res) => {
    //     // const { errors, isValid } = validator.loginValidator(req.body)
    //     // if (!isValid) {
    //     //     res.status(404).json(errors)
    //     // }
    //     try {
    //         Users.findOne({ email: req.body.email }, async (err, user) => {
    //             if (!user) {
    //                 res.send("User not found")
    //             } else {
    //                 if (err) {
    //                     console.log(err)
    //                     res.status(500).send()
    //                 }
    //                 else {
    //                     // let hashedPassword = await bcrypt.compare(req.body.password, user.password)
    //                     bcrypt
    //                         .compare(req.body.password, user.password)
    //                         .then((isMatch) => {
    //                             if (!isMatch) {
    //                                 res.status(400).json({ "Password": "Wrong Password" })
    //                             } else {
    //                                 const payload = {
    //                                     id: user.id,
    //                                     name: user.name
    //                                 }
    //                                 jwt.sign({ payload }, keys.secretOrKey, { expiresIn: '15s' }, (err, token) => {
    //                                     if (err) throw err
    //                                     res.json({
    //                                         success: true,
    //                                         token
    //                                     })
    //                                 })
    //                             }
    //                         })
    //                 }
    //             }
    //         })
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // })

    .post('/posts', verifyToken, (req, res) => {
        jwt.verify(req.token, keys.secretOrKey, (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {
                res.json({
                    message: 'Post Created',
                    authData
                })
            }
        })
    })

module.exports = router;