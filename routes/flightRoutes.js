let express = require("express"); // require express
let router = express.Router(); // use express.Router
let Controllers = require("../controllers"); //index.js

router.get('/', (req, res) => {
    Controllers.flightsController.getFlights(res);
});

router.post('/create', (req, res) => {
    Controllers.flightsController.createFlight(req.body, res);
});

//put used to create new posts
router.put('/:flightNumber', (req, res) => {
    Controllers.flightsController.updateFlight(req, res);
});

// delete used to delete posts 
router.delete('/:flightNumber', (req, res) => {
    Controllers.flightsController.deleteFlight(req, res);
});

module.exports = router;