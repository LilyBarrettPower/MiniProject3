const { DataTypes, Model } = require('sequelize');
const dbConnect = require('../dbConnect');
const sequelizeInstance = dbConnect.Sequelize;
const Rocket = require('./rocket');
const LaunchSite = require('./launchSite');

class Flight extends Model { }

Flight.init(
    {
        flightNumber: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        launchDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payloadType: {
            type: DataTypes.STRING,
        },
        launchSuccess: {
            type: DataTypes.BOOLEAN,
        },
        landSuccess: {
            type: DataTypes.BOOLEAN,
        },
        videoLink: {
            type: DataTypes.STRING,
        },
        rocketID: {
            type: DataTypes.STRING,
            references: {
                model: Rocket,
                key: 'rocketID',
            },
        },
        siteID: {
            type: DataTypes.STRING,
            references: {
                model: LaunchSite,
                key: 'siteID',
            },
        },
    },
    {
        sequelize: sequelizeInstance,
        modelName: 'flights', // use lowercase plural format
        timestamps: true,
        freezeTableName: true,
    }
);

Flight.belongsTo(Rocket, { foreignKey: 'rocketID', targetKey: 'rocketID' });
Flight.belongsTo(LaunchSite, { foreignKey: 'siteID', targetKey: 'siteID' });


module.exports = Flight;