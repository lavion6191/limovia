const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const Op = Sequelize.Op;
const User = require('v1/models/user');
const color = require('config/ansi');

const log = `C-Email/`

emailController = {
    GET: async (req, res) => {
        return "hi"
    },
    SET: async (req, res) => {
        return "hi again"
    }
}

module.exports = emailController;