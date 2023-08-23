const {body } = require('express-validator');
const registerValidate = () => {
    return [
        body('email').isEmail().withMessage('Email is invalid!'), body('name').notEmpty().withMessage('Name is invalid!'), body('password').notEmpty().withMessage('Password is invalid!')
    ]
}
const loginValidate = () => {
    return [
        body('email').isEmail().withMessage('Email is invalid!'), body('password').notEmpty().withMessage('Invalid credentials!')
    ]
}

module.exports = {registerValidate, loginValidate}