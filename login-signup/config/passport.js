const bcrypt = require('bcrypt')
const keys = require('./keys')
const LocalStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const UserModel = require('../models/User')

const opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
}

passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
    UserModel.findOne({ _id: jwt_payload.payload.id }, (err, user) => {
        // console.log(user)
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            console.log("User not found")
            return done(null, false);
            // or you could create a new account
        }
    });
}));

passport.use('login', new LocalStrategy({ usernameField: 'email'/*, passwordField: 'password' */ }, async (email, password, done) => {
    // console.log(email, password)
    console.log("Passport LOGIN")
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            done(null, false, { message: 'Wrong Password' })
        }
        return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
        return done(error);
    }
}));

// module.exports = passport => {
//     passport.use(
//         new jwtStrategy(opts, (payload, done) => {
//             Users.findById(payload.id)
//                 .then((user) => {
//                     if (user) {
//                         return done(null, user)
//                     } else {
//                         return done(null, false)
//                     }
//                 })
//                 .catch((err) => console.log(err))
//         })
//     )
// }