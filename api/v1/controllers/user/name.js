
const Sequelize             = require('sequelize');
const bcrypt                = require('bcrypt');
const jwt                   = require('jsonwebtoken');
const Op                    = Sequelize.Op;
const User                  = require('v1/models/user');
const color                 = require('config/ansi');
const generate              = require('v1/controllers/generate');
const { refreshSecretKey }  = require('config/key');

// Log name
const log = `C-Name/`

nameController = {
    GET: async (req, res) => {
        try {
            const identifier = req.query.ID;
            const user = await User.findOne({
                where: { 
                    [Op.or]: [{ user_id: identifier }]
                },
                attributes: ['user_id', 'title', 'firstName', 'lastName'] 
            });
    
            if (!user) { return res.status(404).json({ error: 'User not found' })}
    
            res.status(200).json({ 
                result: "ok",
                message: "Retrieved users first and last name",
                data: {
                    ID: user.user_id,
                    title: user.title,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        } catch (error) {
            console.error(`${color.red}${log}GET - ERROR: ${color.reset}${error}`, error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },    

    SET: async (req, res) => {
        try {
            // Authentication
            const ACT = req.body.ACT;
            const decoded = jwt.decode(ACT, accessSecretKey.current) || jwt.decode(ACT, accessSecretKey.previous);

            // Retrieve user information based on ID or username
            const user = await User.findOne({
                where: { 
                    [Op.or]: [{ user_id: identifier }, { username: identifier }] // Search by user_id or username
                },
                attributes: ['user_id', 'username', 'display_name'] 
            });
            
            await User.update(
                { 
                    username: req.file.filename, 
                    last_updated: currentDate 
                },
                { 
                    where: { 
                        user_id: decoded.user.ID 
                    } 
                }
            );
    
            res.json({ message: 'Avatar updated successfully' });
        } catch (error) {
            console.error(`${color.red}${log}SET - ERROR: ${color.reset}${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = nameController;