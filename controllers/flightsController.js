"use strict";
let Models = require("../models"); //matches index.js

const getFlights = (res) => {
    //finds all users
    Models.Flight.findAll()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

//takes two arguments (JSON and res obj) and creating new user using data created from request
const createFlight = (data, res) => {
    Models.Flight.create(data)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

//this is the controller
const updateFlight = (req, res) => {
    Models.Flight.update(req.body, {
        where: { id: req.params.id }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        });
}
const deleteFlight = (req, res) => {
    //deletes the user matching the ID from the param
    Models.Flight.destroy({
        where: { id: req.params.id }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

module.exports = {
    getFlights,
    createFlight,
    updateFlight,
    deleteFlight
};