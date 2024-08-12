import {body, check, param, validationResult} from "express-validator";

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
        .withMessage('Password must be at least 5 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors});
        }
        next();
    }
];

export const EmailPasswordValidation = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 5})
        .withMessage('Password must be at least 5 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors});
        }
        next();
    }
];

export const NameValidation = [
    body('name')
        .notEmpty()
        .withMessage("Name input is required!")
        .isLength({min: 3, max: 32})
        .withMessage("Username is sized from 3 characters to a maximum of size 32 characters")
        .isString()
        .withMessage("String data type is required!"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors});
        }
        next();
    }
];

export const EmailValidation = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors});
        }
        next();
    }
];

export const idValidation = [
    param('id')
        .isInt()
        .withMessage('ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
];

