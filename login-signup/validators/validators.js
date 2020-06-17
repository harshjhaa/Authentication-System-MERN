const isEmpty = require('is-empty')
const validator = require('validator')

module.exports.loginValidator = loginValidator = function validateLogin(data) {
    const errors = {}
    data.email = !(isEmpty(data.email)) ? data.email : "";
    data.password = !(isEmpty(data.password)) ? data.password : "";

    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required"
    }
    if (!validator.isEmpty(data.email)) {
        errors.email = "Invalid email"
    }
    return{
        errors: errors,
        isValid:isEmpty(errors)
    }
}

module.exports.registerValidator = registerValidator = function validateRegister(data) {
    const errors = {}
    data.email = !(isEmpty(data.email)) ? data.email : "";
    data.password = !(isEmpty(data.password)) ? data.password : "";
    data.name = !(isEmpty(data.name)) ? data.name : "";

    if (validator.isEmpty(data.name)) {
        errors.name = "name is required"
    }
    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required"
    }
    if (!validator.isEmpty(data.email)) {
        errors.email = "Invalid email"
    }
    return{
        errors: errors,
        isValid:isEmpty(errors)
    }
}