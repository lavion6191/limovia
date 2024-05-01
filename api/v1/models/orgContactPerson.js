const { DataTypes } = require('sequelize');
const db = require('config/db');

const ORGCONTACTPERSON_TABLE = 'orgContactPerson';
const CREATED_AT = 'created_at';
const UPDATED_AT = 'updated_at';

const OrgContactPerson = db.define('OrgContactPerson', {
    contact_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      org_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Organization',
          key: 'org_id'
        }
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
}, {
    tableName: ORGCONTACTPERSON_TABLE,
    timestamps: true,
    createdAt: CREATED_AT,
    updatedAt: UPDATED_AT,
});

module.exports = OrgContactPerson;
