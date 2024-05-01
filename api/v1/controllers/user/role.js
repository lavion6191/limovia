const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const User = require('v1/models/user');
const color = require('config/ansi');
const { accessSecretKey } = require('config/key');

const log = `C-Role/`

const roleController = {
    GET: async (req, res) => {
        try {
            // Use req.query to get parameters from the query string
            const ACT       = req.body.ACT;
            const decoded   = jwt.decode(ACT, accessSecretKey);
            const ID        = decoded.user.ID;
            
            // Use the ID parameter to retrieve user information
            const user = await User.findOne({
                where: { user_id: ID },
                attributes: ['role_id']
            });

            const RID = user.role_id;
            
            console.log("RID: ", RID)
            res.json({ ID, RID });
        } catch (error) {
            console.error(`${color.red}${log}GET - ERROR: ${color.reset}${error}`, error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    SET: async (req, res) => {
        try {
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    

    DEL: async (req, res) => {
        try {
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = roleController;