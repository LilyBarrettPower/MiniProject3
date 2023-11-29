const { DataTypes, Model } = require('sequelize');
const dbConnect = require('../dbConnect');
const sequelizeInstance = dbConnect.Sequelize;
const Flight = require('./flight');

class Rocket extends Model {}

Rocket.init(
    {
        rocketID: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        rocketType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeInstance,
        modelName: 'rockets', // use lowercase plural format
        timestamps: true,
        freezeTableName: true,
    }
);

// Rocket.hasMany(Flight, { foreignKey: 'rocketID', sourceKey: 'rocketID' });

module.exports = Rocket;