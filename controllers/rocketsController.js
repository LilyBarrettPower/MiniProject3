"use strict";
let Models = require("../models"); //matches index.js

const getRockets = (res) => {
    //finds all users
    Models.Rocket.findAll()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

//takes two arguments (JSON and res obj) and creating new user using data created from request
const createRocket = (data, res) => {
    Models.Rocket.create(data)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

//this is the controller
const updateRocket = (req, res) => {
    Models.Rocket.update(req.body, {
        where: { id: req.params.id }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        });
}
const deleteRocket = (req, res) => {
    //deletes the user matching the ID from the param
    Models.Rocket.destroy({
        where: { id: req.params.id }
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
}

module.exports = {
    getRockets,
    createRocket,
    updateRocket,
    deleteRocket
};