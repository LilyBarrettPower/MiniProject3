let express = require("express"); // require express
let router = express.Router(); // use express.Router
let Controllers = require("../controllers"); //index.js

router.get('/', (req, res) => {
    Controllers.launchSitesController.getLaunchSites(res);
});

router.post('/create', (req, res) => {
    Controllers.launchSitesController.createLaunchSite(req.body, res);
});

//put used to create new posts
router.put('/:siteID', (req, res) => {
    Controllers.launchSitesController.updateLaunchSite(req, res);
});

// delete used to delete posts 
router.delete('/:siteID', (req, res) => {
    Controllers.launchSitesController.deleteLaunchSite(req, res);
});

module.exports = router;