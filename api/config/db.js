// server/config/db.jsx

const Sequelize = require("sequelize");
require('dotenv').config({ path: __dirname + '/.env' });

const DB_HOST = process.env.DB_HOST || '127.0.0.1'; // Use 127.0.0.1 or localhost
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

if (!DB_NAME || !DB_USER || !DB_PASS) {
    console.error("Missing database configuration");
    process.exit(1);
}

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect: "mariadb",
    dialectModule: require('mariadb'),
    host: DB_HOST, // Use the IP address or hostname of your MySQL server
    port: 3306, // Default MySQL port
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = db;