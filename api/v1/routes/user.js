/*
    /v1/routes/user

    Here we got all of the user-related routes
    for the best user experience xd

*/ 

// Express
const express               = require('express');
const router                = express.Router();

// Colors
const color                 = require('config/ansi');

// Middlewares
const authMW                = require('v1/middleware/auth');
const ReCAPTCHA             = require('v1/middleware/recaptcha')

// Controllers
const authController        = require('v1/controllers/user/auth')
const emailController       = require('v1/controllers/user/email');
const passwordController    = require('v1/controllers/user/password');
const roleController        = require('v1/controllers/user/role');
const nameController        = require('v1/controllers/user/name');
const regDateController     = require('v1/controllers/user/reg_date')

// Authentication
try {
    router.post('/auth/signup', authController.signup)
    router.post('/auth/login', authController.login)
    router.post('/auth/accesstoken', authController.accessToken)
    router.post('/auth/siteverify', authController.siteverify)
} catch (error) { console.error("\nError adding auth routes:\n", error)}

// Names
try {
    router.get('/name/get', nameController.GET);
    router.post('/name/set', authMW, nameController.SET);
} catch (error) { console.error(` ${color.red}Error adding name routes\n${color.reset}`, error)}

// Email
try {
    router.get('/email/get', emailController.GET);
    router.post('/email/set', authMW, emailController.SET);
} catch (error) { console.error(` ${color.red}Error adding email routes\n${color.reset}`, error)}


// Roles
try {
    router.post('/role/get', roleController.GET);
} catch (error) { console.error(` ${color.red}Error adding role routes\n${color.reset}`, error)}

// TODO: Password
try {
    router.post('/password/set', passwordController.SET);
} catch (error) { console.error(` ${color.red}Error adding password routes\n${color.reset}`, error)}


// TODO: Email verified
try {
    router.get('/email/get', emailController.GET);
    router.post('/email/set', authMW, emailController.SET);
} catch (error) { console.error(` ${color.red}Error adding email routes\n${color.reset}`, error)}

// TODO: Registration date
try {
    router.get('/reg_date/get', regDateController.GET);
} catch (error) { console.error(` ${color.red}Error adding reg_date routes\n${color.reset}`, error)}

// Export
module.exports = router;
