const nodemailer = require('nodemailer');

const sendEmailController = {
    email: async (sender, recipient, subject, body) => {
        const transporter = nodemailer.createTransport({
            sendmail: true,
            path: '/usr/sbin/sendmail',
        });

        const mail = {
            from: sender,
            to: recipient,
            subject: subject,
            text: body,
        };

        transporter.sendMail(mail, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Failed to send OTP via email' });
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }
}

modules.export = sendEmailController;