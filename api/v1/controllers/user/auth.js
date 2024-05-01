const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op, fn, col } = require('sequelize');
const User = require('v1/models/user');
const Organization = require('v1/models/organization');
const OrgContactPerson = require('v1/models/orgContactPerson');
const color = require('config/ansi');
const generate = require('v1/controllers/generate');
const axios = require('axios');
const { refreshSecretKey } = require('config/key');

const log = `C-Auth/`

const authController = {
    signup: async (req, res) => {
        try {
            const { 
                format, 
                firstName, 
                title, 
                lastName, 
                orgName, 
                orgNumber, 
                ssn,
                email,
                phoneNumber,
                password,
                address, 
                postalCode, 
                city,
                remember
            } = req.body;
    
            const response = {
                result: "error",
                errors: []
            };
    
            const addError = (id, title, detail, context) => {
                response.errors.push({ id, title, detail, context });
            };
    
            // Function to validate email
            const validateEmail = async (email) => {
                const existingEmail = await User.findOne({ where: { email: email.toLowerCase() } });
    
                if (existingEmail) {
                    addError('email_in_use', 'Invalid Input', 'Email is already in use.', 'email');
                } else {
                    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
                    if (!validEmailRegex.test(email)) {
                        addError('invalid_email', 'Invalid Input', 'Invalid email format.', 'email');
                    } else {
                        return null;
                    }
                }
            };

            // Function to validate organization number
            const validateOrgNr = async (orgNr) => {

                console.log("Organization Number: ", orgNr)
                const orgNrRegex = /^[0-9]+$/; // Regular expression to match only numbers

                if (!orgNrRegex.test(orgNr)) {
                    // If orgNr contains non-numeric characters
                    addError('invalid_organization_number', 'Invalid Input', 'Organization number must contain only numbers.', 'organization_number');
                } else {
                    // If orgNr is valid
                    const existingNumber = await Organization.findOne({ where: { orgNumber: orgNr } });

                    if (existingNumber) {
                        // If the organization number already exists
                        addError('organization_number_in_use', 'Invalid Input', 'Organization number is already in use.', 'organization_number');
                    } else {
                        // If the organization number is valid and not in use
                        return null;
                    }
                }
            };

            
            // Function to validate password
            const validatePassword = async (password) => {
                // Password policy
                const passwordPolicy = {
                    minLength: 8,
                    maxLength: 48,
                    requireUppercase: true,
                    requireLowercase: true,
                    requireDigit: true,
                    requireSpecialChar: false,
                };
    
                // Check password length
                if (password.length < passwordPolicy.minLength || password.length > passwordPolicy.maxLength) {
                    addError(
                        'password_length_error', 
                        'Password Length Error', 
                        `Password must be between ${passwordPolicy.minLength} and ${passwordPolicy.maxLength} characters.`, 
                        'password'
                    );
                }
    
                // Check password complexity requirements
                const hasUppercase = /[A-Z]/.test(password);
                const hasLowercase = /[a-z]/.test(password);
                const hasDigit = /\d/.test(password);
                const hasSpecialChar = passwordPolicy.requireSpecialChar ? /[!@#$%^&*(),.?":{}|<>]/.test(password) : true;
    
                if (
                    (passwordPolicy.requireUppercase && !hasUppercase) ||
                    (passwordPolicy.requireLowercase && !hasLowercase) ||
                    (passwordPolicy.requireDigit && !hasDigit) ||
                    (passwordPolicy.requireSpecialChar && !hasSpecialChar)
                ) {
                    addError(
                        'password_complexity_error',
                        'Password Complexity Error',
                        'Password must meet the specified complexity requirements.',
                        'password'
                    );
                } else {
                    return null; // Valid password
                }
            };

            // Function to validate required fields
            const validateTitle = async () => {
                if (!title) {
                    addError('title_required', 'Required Field', 'Title must be set.', 'title');
                }
                // You can add more required fields validations here if needed
            };

            // Validate the email if format is private
            if (format === 'private') {
                await validateTitle();
                await validateEmail(email);
                await validatePassword(password);
            }

            // Validate the password if format is organization
            if (format === 'organization') {
                await validateOrgNr(orgNumber);
                await validatePassword(password);
            }
    
            // If there are any errors, return them
            if (response.errors.length > 0) {
                return res.status(400).json({
                    result: 'error',
                    errors: response.errors
                });
            }
    
            // Encrypt password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
    
            if (format === 'private') {
                // Create user for private format
                const newUser = await User.create({
                    firstName,
                    title,
                    lastName,
                    ssn,
                    email,
                    phoneNumber,
                    address,
                    postalCode,
                    city,
                    password: hashedPassword,
            });
    
                // Log registration to the terminal
                console.log(`User registered for private format: ${newUser.firstName} ${newUser.lastName}`);

                // Generate tokens
                const accessToken = await generate.accessToken(newUser.user_id);
                const refreshToken = await generate.refreshToken(newUser.user_id, remember);

                const expiration = remember;
                let expiresIn;

                if (expiration === true || (Number.isInteger(expiration) && expiration >= 1 && expiration <= 30)) {
                    expiresIn = expiration === true ? 30 : expiration;
                } else {
                    expiresIn = 1;
                }
                
                // Send success response
                return res.json({
                    result: "ok",
                    message: 'Signup successful.',
                    token: {
                        refreshToken,
                        accessToken,
                        refreshTokenEXP: expiresIn,
                    },
                    data: {
                        ID: newUser.user_id,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        phoneNumber: newUser.phoneNumber
                    }
                });
            } else if (format === 'organization') {
                // Create organization
                const newOrg = await Organization.create({
                    orgName,
                    orgNumber,
                    address,
                    postalCode,
                    city,
                    password: hashedPassword,
                });

                // Create organization contact person
                const newContactPerson = await OrgContactPerson.create({
                    org_id: newOrg.org_id,
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                });
    
                // Log registration to the terminal
                console.log(`Organization registered: ${newOrg.orgName}`);

                // Generate tokens
                const accessToken = await generate.accessToken(newOrg.org_id);
                const refreshToken = await generate.refreshToken(newOrg.org_id, remember);

                const expiration = remember;
                let expiresIn;

                if (expiration === true || (Number.isInteger(expiration) && expiration >= 1 && expiration <= 30)) {
                    expiresIn = expiration === true ? 30 : expiration;
                } else {
                    expiresIn = 1;
                }
    
                // Send success response
                return res.status(200).json({
                    result: "ok",
                    message: 'Organization signup successful.',
                    data: {
                        org: {
                            ID: newOrg.org_id,
                            Number: orgNumber,
                            Name: orgName,
                            contactPerson: {
                                ID: newContactPerson.contact_person_id,
                                firstName: newContactPerson.contact_person_firstName,
                                lastName: newContactPerson.contact_person_lastName,
                                email: newContactPerson.contact_person_email,
                                phoneNumber: newContactPerson.contact_person_phoneNumber,
                            },
                        }
                    },
                    token: {
                        refreshToken,
                        accessToken,
                        refreshTokenEXP: expiresIn,
                    }
                });
            } else {
                // Invalid format
                return res.status(400).json({ error: 'Invalid format provided.' });
            }
        } catch (error) {
            console.error('Signup error:', error);
            return res.status(500).json({ error: 'An error occurred while registering the user/organization.' });
        }
    },

    login: async (req, res) => {
        try {
            // Get user input
            const { email, password, remember } = req.body;
            const response = {
                result: "error",
                errors: []
            };
    
            // Check if there is no email or password
            if (!email) {
                response.errors.push({ id: 'no_email', title: 'Invalid Request', detail: 'No email provided.', context: 'email' });
            }
            if (!password) {
                response.errors.push({ id: 'no_password', title: 'Invalid Request', detail: 'No password provided.', context: 'password' });
            }
    
            // Check if password length is within the allowed range
            if (password && (password.length < 8 || password.length > 255)) {
                response.errors.push({ id: 'invalid_password_length', title: 'Invalid Password', detail: 'Password length should be between 8 and 255 characters.', context: 'password' });
            }
    
            if (response.errors.length > 0) {
                return res.status(400).json(response);
            }
    
            // Find the user by email
            const user = await User.findOne({
                where: { email },
                attributes: ['user_id', 'email', 'password'],
                raw: true
            });
    
            // If user not found, return authentication error
            if (!user) {
                response.errors.push({ id: 'user_not_found', title: 'Authentication Failed', detail: 'User not found.', context: 'email' });
                return res.status(401).json(response);
            }
    
            // Compare passwords
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                response.errors.push({ id: 'invalid_credentials', title: 'Authentication Failed', detail: 'Invalid credentials.', context: 'password' });
                return res.status(401).json(response);
            }
    
            // Generate tokens
            const accessToken = await generate.accessToken(user.user_id);
            const refreshToken = await generate.refreshToken(user.user_id, remember);

            const expiration = remember;
            let expiresIn;

            if (expiration === true || (Number.isInteger(expiration) && expiration >= 1 && expiration <= 30)) {
                expiresIn = expiration === true ? 30 : expiration;
            } else {
                expiresIn = 1;
            }
            
            // Log successful login
            console.log(`User UD ${user.user_id} logged in successfully.`);
            
            // Send tokens and success message
            res.json({ 
                result: 'ok',
                message: 'Login successful.',
                token: {
                    refreshToken,
                    accessToken,
                    refreshTokenEXP: expiresIn,
                },
                data: {
                    ID: user.user_id
                }
            });
    
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'An error occurred while logging in.' });
        }
    },    

    accessToken: async (req, res) => {

        // Get the REFT from request
        const refreshToken = req.body.refreshToken;

        // Check if there is actually a REFT
        if (!refreshToken) { return res.status(401).send('Access Denied. No refresh token provided.')}

        try {
            const decoded = jwt.decode(refreshToken, refreshSecretKey.current) || jwt.decode(refreshToken, refreshSecretKey.previous);

            // User ID
            const ID = decoded.user.ID;
            const OTP = decoded.user.OTP;
            console.log(`${color.green}${log}AccessToken${color.reset} - decoded: ${color.green}${JSON.stringify(decoded)}${color.reset}`);

            // Generate a new AccessToken
            const accessToken = await generate.accessToken(ID, OTP);
            console.log(`${color.green}${log}AccessToken${color.reset} - New AccessToken: ${color.green}${accessToken}${color.reset}`);

            res.json({ ID, accessToken});
        } catch (error) {
            console.error(`${color.red}${log}AccessToken - ERROR: ${color.reset}${error}`)
            return res.json({ message: 'Invalid RefreshToken', refreshToken });
        }
    },

    siteverify: async (req, res) => {
        try {
            const { recaptchaVersion, recaptchaToken } = req.body;
            const userIP = req.ip;

            console.log(`ReCAPTCHA Version: ${recaptchaVersion}`)
            console.log(`IP: ${userIP}`)

            let recaptchaResponse;
    
            if (recaptchaVersion === 'v3') {
                const recaptchaSecret = process.env.RECAPTCHA_V3_SECRET;
                recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`);
            } else if (recaptchaVersion === 'v2') {
                const recaptchaSecret = process.env.RECAPTCHA_V2_SECRET;
                recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`);
            } else {
                res.status(401).json({ message: 'Invalid reCAPTCHA version' });
                throw new Error('Invalid reCAPTCHA version provided');
            }
    
            // Handle reCAPTCHA verification response
            if (recaptchaResponse && recaptchaResponse.data.success) {
                res.status(200).json({ success: false, message: 'reCAPTCHA verification successful' });
            } else {
                res.status(400).json({ success: false, error: 'reCAPTCHA verification failed' });
            }
            
        } catch (error) {
            console.error('Error during reCAPTCHA verification:', error);
            res.status(500).json({ success: false, error: 'An error occurred during reCAPTCHA verification' });
        }
    }
}

module.exports = authController;