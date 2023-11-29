let express = require("express"); // require express
let router = express.Router(); // use express.Router
let Controllers = require("../controllers"); //index.js

router.get('/', (req, res) => {
    Controllers.launchsitesController.getLaunchSites(res);
});

router.post('/create', (req, res) => {
    Controllers.flightsController.createLaunchSite(req.body, res);
});

//put used to create new posts
router.put('/:id', (req, res) => {
    Controllers.flightsController.updateLaunchSite(req, res);
});

// delete used to delete posts 
router.delete('/:id', (req, res) => {
    Controllers.flightsController.deleteLaunchSite(req, res);
});

module.exports = router;