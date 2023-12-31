'use strict'
const Flight = require('./flight') //require the model
const Rocket = require('./rocket')

async function init() {
    console.log('Starting model synchronization');
    try {
        await Flight.sync();
        console.log('Flight model synchronized');
        await Rocket.sync();
        console.log('Rocket model synchronized');
        console.log('Models synchronized successfully');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
}

init();

module.exports = {
    Flight, //export the model
    Rocket
};