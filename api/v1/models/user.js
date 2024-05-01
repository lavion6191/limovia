const { DataTypes } = require('sequelize');
const db = require('config/db');

const USER_TABLE = 'users';
const CREATED_AT = 'created_at';
const UPDATED_AT = 'updated_at';

const User = db.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    title: {
        type: DataTypes.ENUM('Ms.', 'Mr.'),
        allowNull: false,
    },

    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },

    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },

    ssn: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },

    postalCode: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },

    city: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },

}, {
    tableName: USER_TABLE,
    timestamps: true,
    createdAt: CREATED_AT,
    updatedAt: UPDATED_AT,
});

module.exports = User;