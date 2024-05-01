const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const color = require('config/ansi');
const { refreshSecretKey, accessSecretKey } = require('config/key');

const log = `C-Generate/`

const generate = {
    OTP: (length) => {
        try {
            if (!Number.isSafeInteger(length) || length <= 0) {
                throw new Error('Invalid OTP length');
            }

            const min = 10 ** (length - 1);
            const max = (10 ** length) - 1;

            const otp = crypto.randomInt(min, max);

            return otp;
        } catch (error) {
            console.error(`${color.red}${log}OTP${color.reset} - ERROR:${color.reset}`, error);
            throw new Error('Failed to generate OTP');
        }
    },

    refreshToken: async (userID, expiration) => {
        try {
            const token = generate.OTP(6);
            let expiresIn;

            console.log("Expiration: ", expiration)
    
            if (expiration === true || (Number.isInteger(expiration) && expiration >= 1 && expiration <= 30)) {
                expiresIn = expiration === true ? '30d' : `${expiration}d`;
            } else {
                expiresIn = '1d';
            }
    
            console.log(`${color.green}${log}RefreshToken${color.reset} - Signing with ID ${color.green}${userID}${color.reset}, exp ${color.green}${expiresIn}${color.reset}, and token ${color.green}${token}${color.reset}`);
            const payload = { 
                user: { 
                    ID: userID, 
                    OTP: token 
                }
            };
            return jwt.sign(payload, refreshSecretKey.current, { expiresIn });
        } catch (error) {
            console.error(`${color.red}${log}RefreshToken - ERROR:${color.reset}`, error);
            throw new Error('Failed to generate RefreshToken');
        }
    },

    accessToken: async (userID, OTP) => {
        try {
            console.log(`${color.green}${log}AccessToken${color.reset} - Signing with ID ${color.green}${userID}${color.reset}`);
            const ACTPayload = { 
                user: { 
                    ID: userID,
                    OTP: OTP
                }};
            return jwt.sign(ACTPayload, accessSecretKey.current, { expiresIn: '15m'});
        } catch (error) {
            console.error(`${color.red}${log}AccessToken - ERROR:${color.reset}`, error);
            throw new Error('Failed to generate AccessToken');
        }
    }
}

module.exports = generate;