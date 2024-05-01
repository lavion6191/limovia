const { DataTypes } = require('sequelize');
const db = require('config/db');

const ORGANIZATION_TABLE = 'organization';
const CREATED_AT = 'created_at';
const UPDATED_AT = 'updated_at';

const Organization = db.define('Organization', {
    org_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    orgName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    orgNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

    postalCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },

    city: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

}, {
    tableName: ORGANIZATION_TABLE,
    timestamps: true,
    createdAt: CREATED_AT,
    updatedAt: UPDATED_AT,
});

module.exports = Organization;
