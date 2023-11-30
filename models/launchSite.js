const { DataTypes, Model } = require('sequelize');
const dbConnect = require('../dbConnect');
const sequelizeInstance = dbConnect.Sequelize;
const Flight = require('./flight');

class LaunchSite extends Model { }

LaunchSite.init(
    {
        siteID: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        siteName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeInstance,
        modelName: 'launchsites', // use lowercase plural format
        timestamps: true,
        freezeTableName: true,
    }
);


module.exports = LaunchSite;