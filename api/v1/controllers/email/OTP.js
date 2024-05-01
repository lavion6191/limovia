const User = require('../../models/user');
const nodemailer = require('nodemailer');
const generate = require("../generate")
const send = require("./send")

const otpController = {
    send: async (req, res) => {
        // Get REFT
        const REFT = req.body.REFT;
        const decodedREFT = jwt.decode(REFT, secretKey);
        const userID = decodedREFT.user.id;

        // Find the user by their ID
        const user = await User.findOne({
            where: { id: userID },
            attributes: ['id', 'email', 'email_verified']
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.email_verified) {
            // Generate 6-digit OTP
            const OTP = generate.OTP(6);

            // Set the expiration time
            const OTPExpiration = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes
            
            // Update database
            await User.update(
                {
                    email_otp: OTP,
                    email_otp_exp: OTPExpiration,
                },
                {
                    where: { id: userID },
                }
            );
            
            // Simple mail
            const mail = {
                from: 'noreply@invalsia.com',
                to: user.email,
                subject: 'Verify email pretty please <3',
                text: OTP,
            }

            // Send OTP
            send(mail)
        }
    },

    verify: async (req, res) => {
        // Get REFT
        const REFT = req.body.REFT;
        const decodedREFT = jwt.decode(REFT, secretKey);
        const userId = decodedREFT.user.id;

        // Get inputOTP
        const inputOTP = req.body.inputOTP;

        // Find the user by their ID
        const user = await User.findOne({
            where: { id: userId },
            attributes: ['id', 'email', 'email_otp', 'email_otp_exp']
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if OTP is valid and not expired
        if (user.email_otp === inputOTP && user.email_otp_exp > new Date()) {
            // Clear OTP and OTP expiration in the database
            await User.update(
                {
                    email_otp: null,
                    email_otp_exp: null,
                    email_verified: true,
                },
                {
                    where: { id: userId },
                }
            );
            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }
    }
}