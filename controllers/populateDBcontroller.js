const SpaceXLibrary = require('../libraries/SpaceXlibrary');
const { Flight, Rocket, LaunchSite } = require('../models');

const spaceXfetch = new SpaceXLibrary();

const populateDatabase = async (req, res) => {
    try {
        const spaceXData = await spaceXfetch.fetchSpaceData();

        // await Rocket.sync({ force: true });
        // await LaunchSite.sync({ force: true });
        // await Flight.sync({ force: true }); // Force table creation on first run, remove in production
      

        // Bulk create data for Rocket table
        await Rocket.bulkCreate(spaceXData.map(launch => ({
            rocketID: launch.rocket.rocket_id,
            rocketType: launch.rocket.rocket_type,
        })), { updateOnDuplicate: ['rocketID'] });

        console.log('Data inserted into Rocket table');

        // Bulk create data for LaunchSite table
        await LaunchSite.bulkCreate(spaceXData.map(launch => ({
            siteID: launch.launch_site.site_id,
            siteName: launch.launch_site.site_name,
        })), { updateOnDuplicate: ['siteID'] });

        console.log('Data inserted into LaunchSite table');

        // Bulk create data for Flight table
        await Flight.bulkCreate(spaceXData.map(launch => ({
            flightNumber: launch.flight_number,
            launchDate: launch.launch_date_local,
            payloadType: launch.payloads && Array.isArray(launch.payloads) ? launch.payloads[0].payload_type : null,
            launchSuccess: launch.launch_success,
            landSuccess: launch.land_success,
            videoLink: launch.links.video_link,
            rocketID: launch.rocket.rocket_id,
            rocketType: launch.rocket.rocket_type,
            siteID: launch.launch_site.site_id,
            siteName: launch.launch_site.site_name,
        })), { updateOnDuplicate: ['launchDate'] });

        console.log('Data inserted into Flight table');
        res.status(200).json({ message: 'Data inserted into the database successfully' });
    } catch (error) {
        console.error('Error processing request:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    populateDatabase
};