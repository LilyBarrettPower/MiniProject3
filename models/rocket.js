const { DataTypes, Model } = require('sequelize');
const dbConnect = require('../dbConnect');
const sequelizeInstance = dbConnect.Sequelize;

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


module.exports = Rocket;