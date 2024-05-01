/*
    Google ReCAPTCHA Middleware
*/

const axios = require('axios');

const siteverify = async (req, res, next) => {
    try {
        const { recaptchaVersion, recaptcha } = req.body;
        const userIP = req.ip;

        console.log("IP:", userIP)
        console.log("Version:", recaptchaVersion)
        console.log("Token:", recaptcha)

        let recaptchaResponse;

        if (recaptchaVersion === 3) {
            console.log("ReCAPTCHA is v3")
            // Verify reCAPTCHA token for v3
            const recaptchaSecret = process.env.RECAPTCHA_V3_SECRET;
            recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptcha}`);
        } else if (recaptchaVersion === 2) {
            console.log("ReCAPTCHA is v2")
            // Verify reCAPTCHA token for v2
            const recaptchaSecret = process.env.RECAPTCHA_V2_SECRET;
            recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptcha}`);
        } else {
            console.log("Invalid reCAPTCHA version")
            res.status(401).json({ message: 'Invalid reCAPTCHA version' });
            return; // End middleware execution
        }

        // Handle reCAPTCHA verification response
        if (recaptchaResponse && recaptchaResponse.data.success) {
            // Verification successful, proceed to the next middleware or route handler
            next();
        } else {
            res.status(400).json({ success: false, error: 'reCAPTCHA verification failed' });
        }
    } catch (error) {
        console.error('Error during reCAPTCHA verification:', error);
        res.status(500).json({ success: false, error: 'An error occurred during reCAPTCHA verification' });
    }
}

module.exports = siteverify;
