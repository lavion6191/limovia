/*

    /v1/controllers/statistics/users

    Gets the total amount of users

*/

const Sequelize             = require('sequelize');
const jwt                   = require('jsonwebtoken');
const Op                    = Sequelize.Op;
const User                  = require('v1/models/user');
const color                 = require('config/ansi');

const userStatsController = {
    GET: async (req, res) => {
        try {
            // Get total number of users
            const totalUsers = await User.count();

            return res.json({
                result: "ok",
                message: 'Total number of users retrieved successfully.',
                data: {
                    totalUsers: totalUsers
                }
            });
        } catch (error) {
            console.error("Error retrieving total users:", error);
            return res.status(500).json({
                result: "error",
                message: "Failed to retrieve total number of users."
            });
        }
    }
}

module.exports = userStatsController;