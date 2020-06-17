const express = require('express');
const router = express.Router();
passport = require('passport')
const UserModel = require('../models/User')

//Let's say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
// router.post('/', async (req, res, next) => {
//     console.log("User-Profile Route")
//     //We'll just send back the user details and the token
//     try {
//         const user = await UserModel.findOne({ email: req.user.email })
//         res.json({
//             message: 'You made it to the secure route',
//             user,
//         })
//     } catch (err) {
//         next(err)
//     }
// });

router.get('/', (req, res) => {
    console.log("User-Profile Route")
    res.send(req.user);
});

// router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
//     console.log("User-Profile Route")
//     res.send(req.user);
// });

module.exports = router;