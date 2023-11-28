const express = require('express');
const spaceXcontroller = require('../controllers/SpaceXcontroller');

const router = express.Router();

router.get('/filtered', spaceXcontroller.fetchAndFilterLaunches);

module.exports = router;