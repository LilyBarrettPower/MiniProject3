const SpaceXLibrary = require('../libraries/SpaceXlibrary');
const { Flight, Rocket, LaunchSite } = require('../models');

const spaceXfetch = new SpaceXLibrary();

const populateDatabase = async (req, res) => {
    try {
        const spaceXData = await spaceXfetch.fetchSpaceData();

        // await Rocket.sync({ force: true });
        // await Flight.sync({ force: true }); // Force table creation on first run, remove in production
      

        
        await Promise.all(spaceXData.map(async (launch) => {
            const [rocket, created] = await Rocket.findOrCreate({
                where: { rocketID: launch.rocket.rocket_id },
                defaults: {
                    rocketType: launch.rocket.rocket_type,
                },
            });

            console.log(`Rocket ${rocket.rocketID} ${created ? 'created' : 'already exists'}`);
        }));

        // await Rocket.bulkCreate(spaceXData.map(launch => ({
        //     rocketID: launch.rocket.rocket_id,
        //     rocketType: launch.rocket.rocket_type,
        // })), { updateOnDuplicate: ['rocketID'] });

        console.log('Data inserted into Rocket table');


        await Promise.all(spaceXData.map(async (launch) => {
            const [flight, created] = await Flight.findOrCreate({
                where: { flightNumber: launch.flight_number },
                defaults: {
                    launchDate: launch.launch_date_local,
                    payloadType: launch.payloads && Array.isArray(launch.payloads) ? launch.payloads[0].payload_type : null,
                    launchSuccess: launch.launch_success,
                    landSuccess: launch.land_success,
                    videoLink: launch.links.video_link,
                    rocketID: launch.rocket.rocket_id,
                    rocketType: launch.rocket.rocket_type,
                    siteID: launch.launch_site.site_id,
                    siteName: launch.launch_site.site_name
                },
            });
            console.log(`Flight ${flight.flightNumber} ${created ? 'created' : 'already exists'}`);
        }));
        // Bulk create data for Flight table
        // await Flight.bulkCreate(spaceXData.map(launch => ({
        //     flightNumber: launch.flight_number,
        //     launchDate: launch.launch_date_local,
        //     payloadType: launch.payloads && Array.isArray(launch.payloads) ? launch.payloads[0].payload_type : null,
        //     launchSuccess: launch.launch_success,
        //     landSuccess: launch.land_success,
        //     videoLink: launch.links.video_link,
        //     rocketID: launch.rocket.rocket_id,
        //     rocketType: launch.rocket.rocket_type,
        //     siteID: launch.launch_site.site_id,
        //     siteName: launch.launch_site.site_name,
        // })), { updateOnDuplicate: ['launchDate'] });

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