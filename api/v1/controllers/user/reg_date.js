const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Op = Sequelize.Op;
const User = require('v1/models/user');
const color = require('config/ansi');
const generate = require('v1/controllers/generate');
const { accessSecretKey } = require('config/key');

const log = `C-RegDate/`

regDateController = {
    GET: async (req, res) => {
        try {
            // Use req.query to get parameters from the query string
            const identifier = req.query.ID;

            // Retrieve user information based on ID or username
            const user = await User.findOne({
                where: { 
                    [Op.or]: [{ user_id: identifier }, { username: identifier }] // Search by user_id or username
                },
                attributes: ['user_id', 'registration_date'] 
            });

            const regDate = user.registration_date;
            
            res.json({ regDate });
        } catch (error) {
            console.error(`${color.red}${log}GET - ERROR: ${color.reset}${error}`, error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}

module.exports = regDateController;