const multer = require('multer');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { accessSecretKey } = require('../../config/key');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const ACT = req.body.ACT;
        let decoded;
        try {
            decoded = jwt.decode(ACT, accessSecretKey.current);
        } catch (error) {
            decoded = jwt.decode(ACT, accessSecretKey.previous);
        }

        const userID = decoded.user.ID;
        const uploadPath = path.resolve('/meow/www/cdn/public/avatars/', String(userID));

        console.log('Multer: Destination path:', uploadPath);

        // Delete existing files
        if (fs.existsSync(uploadPath)) {
            console.log('Multer: Existing files found:', fs.readdirSync(uploadPath));
            fs.readdirSync(uploadPath).forEach((file) => {
                const filePath = path.join(uploadPath, file);
                fs.unlinkSync(filePath);
                console.log('Multer: Deleted existing file:', filePath);
            });
        }

        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
            console.log('Multer: Directory created:', uploadPath);

            // Change ownership of the directory to www-data
            fs.chownSync(uploadPath, 'www-data', 'www-data');
            console.log('Multer: Ownership changed to www-data');

            // Set permissions to rwxrwx---
            fs.chmodSync(uploadPath, 0o770);
            console.log('Multer: Permissions set to rwxrwx---');
        }

        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        //const fileExt = path.extname(file.originalname);
        const avatarName = file.originalname.substring(0, 32);
        /*const finalFileName = avatarName + fileExt;
        console.log('Multer: Original filename:', file.originalname);
        console.log('Multer: File extension:', fileExt);
        console.log('Multer: Avatar name:', avatarName);
        console.log('Multer: Final file name:', finalFileName);*/
        cb(null, avatarName);
    },
});

// Configure avatar upload middleware with increased file size limit
const avatarUpload = multer({
    storage: storage,
    limits: {
        fileSize: 64 * 1024 * 1024, // 64 MB in bytes
    },
}).single('IMG');

module.exports = (req, res, next) => {
    avatarUpload(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!req.file) {
            console.error('Multer: No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log('Multer: Image uploaded successfully');
        console.log('Multer: Proceeding to the next middleware or controller');
        next(); // Proceed to the next middleware or controller
    });
};
