"use strict";
let Models = require("../models"); //matches index.js

const getLaunchSites = (res) => {
    //finds all users
    Models.LaunchSite.findAll()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

//takes two arguments (JSON and res obj) and creating new user using data created from request
const createLaunchSite = (data, res) => {
    Models.LaunchSite.create(data)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

//this is the controller
const updateLaunchSite = (req, res) => {
    Models.LaunchSite.update(req.body, {
        where: { id: req.params.id }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        });
}
const deleteLaunchSite = (req, res) => {
    //deletes the user matching the ID from the param
    Models.LaunchSite.destroy({
        where: { id: req.params.id }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

module.exports = {
    getLaunchSites,
    createLaunchSite,
    updateLaunchSite,
    deleteLaunchSite
};