const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const Op = Sequelize.Op;
const User = require('v1/models/user');
const color = require('config/ansi');

const log = `C-Cover/`

coverController = {
    GET: async (req, res) => {
        try {
            // Use req.query to get parameters from the query string
            const identifier = req.query.ID;
            
            // Retrieve user information based on ID or username
            const user = await User.findOne({
                where: { 
                    [Op.or]: [{ user_id: identifier }, { username: identifier }] // Search by user_id or username
                },
                attributes: ['cover'] 
            });
    
            res.json({ cover: user ? user.cover : null });
        } catch (error) {
            console.error(`${color.red}${log}GET - ERROR: ${color.reset}${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    SET: async (req, res) => {
        return "hi again"
    }
}

module.exports = coverController;