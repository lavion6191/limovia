const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Op = Sequelize.Op;
const User = require('v1/models/user');
const color = require('config/ansi');
const generate = require('v1/controllers/generate');
const { accessSecretKey } = require('config/key');

const log = `C-Theme/`

themeController = {
    GET: async (req, res) => {
        return "hi"
    },
    SET: async (req, res) => {
        return "hi again"
    }
}

module.exports = themeController;