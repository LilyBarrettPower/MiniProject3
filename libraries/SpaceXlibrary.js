class SpaceXlibrary {
    constructor() {
        this.launches = [];
    }

    async fetchSpaceData() {
        try {
            this.launches = await this.retrieveSpaceData();
            return this.launches;
        } catch (error) {
            throw error;
        } 
    } 

    async retrieveSpaceData() {
        try {
            const apiURL = 'https://api.spacexdata.com/v2/launches';
            const response = await fetch(apiURL);

            if (!response.ok) {
                throw new Error('fetch unsuccessful');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}
 
module.exports = SpaceXlibrary;