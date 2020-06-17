const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: 'string', required: true },
    // lName: { type: 'string', required: true },
    email: { type: 'string', required: true },
    // userId: { type: 'string', required: true },
    password: { type: 'string', required: true },
    mobile: { type: 'string', required: true },
    // gender: { type: 'string', required: true },
    // dob: { type: Date, default: Date.now, required: true },
})

module.exports = Users = mongoose.model('UsersData', UserSchema);