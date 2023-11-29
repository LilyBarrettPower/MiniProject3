
const SpaceXlibrary = require('../libraries/SpaceXlibrary');
const populateDBcontroller = require('./populateDBcontroller');

const spaceXfetch = new SpaceXlibrary();

const fetchAndFilterLaunches = async (req, res) => {
    try {
        const spaceXData = await spaceXfetch.fetchSpaceData();

        const filteredLaunches = spaceXData.map(launch => {

            const payloadType = launch.payloads && Array.isArray(launch.payloads) ? launch.payloads[0].payload_type : null;
                
            return {
                flightNumber: launch.flight_number,
                launchDate: launch.launch_date_local,
                payloadType: payloadType,
                launchSuccess: launch.launch_success,
                landSuccess: launch.land_success,
                videoLink: launch.links.video_link,
                rocketID: launch.rocket.rocket_id,
                rocketType: launch.rocket.rocket_type,
                siteID: launch.launch_site.site_id,
                siteName: launch.launch_site.site_name,
            }
});
        res.status(200).json(filteredLaunches);
    } catch (error) {
        console.error('Error processing request:', error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
};

const populateDB = async (req, res) => {
    try {
        await populateDBcontroller.populateDatabase(req, res);
    } catch (error) {
        console.error("error populating database: ", error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    fetchAndFilterLaunches,
    populateDB
}