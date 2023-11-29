const SpaceXLibrary = require('../libraries/SpaceXlibrary');
const { Flight, Rocket, LaunchSite } = require('../models'); 

const spaceXfetch = new SpaceXLibrary();

const populateDatabase = async (req, res) => {
    try {
        const spaceXData = await spaceXfetch.fetchSpaceData();
        const parsedData = spaceXfetch.parseAndFilterData();

        await Flight.sync({ force: true }); // Force table creation on each run, remove in production
        await Rocket.sync({ force: true });
        await LaunchSite.sync({ force: true });

        await Flight.bulkCreate(parsedData, { updateOnDuplicate: ['launchDate'] });
        console.log('Data inserted into Flight table');
        
        const rocketData = parsedData.map(launch => ({
            rocketID: launch.rocketID,
            rocketType: launch.rocketType,
        }));
        await Rocket.bulkCreate(rocketData, { updateOnDuplicate: ['rocketID'] });
        console.log('Data inserted into Rocket table');

        // Bulk create data for LaunchSite table
        const launchSiteData = parsedData.map(launch => ({
            siteID: launch.siteID,
            siteName: launch.siteName,
        }));
        await LaunchSite.bulkCreate(launchSiteData, { updateOnDuplicate: ['siteID'] });
        console.log('Data inserted into LaunchSite table');

        res.status(200).json({ message: 'Data inserted into the database successfully' });
    } catch (error) {
        console.error('Error processing request:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    populateDatabase
};