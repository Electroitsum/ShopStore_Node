const {body, check } = require('express-validator');
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

const addProductValidate = () => {
    return [
        body('productName').notEmpty().withMessage('Product Name is invalid!'), body('productDescription').notEmpty().withMessage('Product Description is Required!'), body('productPrice').notEmpty().withMessage('Product Price is Required!'), body('productCount').notEmpty().withMessage('Product Count is Required!')
    ]
}

const cartValidator = () => {
    return [
        body('userId').notEmpty().withMessage('Invalid User-Id!'), body('productId').notEmpty().withMessage('Invalid Product-Id!')
    ]
}

module.exports = {registerValidate, loginValidate, addProductValidate, cartValidator}