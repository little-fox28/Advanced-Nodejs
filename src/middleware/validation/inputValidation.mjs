import {body} from "express-validator";

export const NameValidation = [
    body('name')
        .notEmpty()
        .withMessage("Name input is required!")
        .isLength({min: 3, max: 32})
        .withMessage("Username is sized from 3 characters to a maximum of size 32 characters")
        .isString()
        .withMessage("String data type is required!")
]

export const UserValidation = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({min: 3})
        .withMessage('Name must be at least 3 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 5})
        .withMessage('Password must be at least 5 characters long')
];