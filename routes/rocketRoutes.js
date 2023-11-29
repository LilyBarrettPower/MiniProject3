let express = require("express"); // require express
let router = express.Router(); // use express.Router
let Controllers = require("../controllers"); //index.js

router.get('/', (req, res) => {
    Controllers.rocketsController.getRockets(res);
});

router.post('/create', (req, res) => {
    Controllers.rocketsController.createRocket(req.body, res);
});

//put used to create new posts
router.put('/:id', (req, res) => {
    Controllers.rocketsController.updateRocket(req, res);
});

// delete used to delete posts 
router.delete('/:id', (req, res) => {
    Controllers.rocketsController.deleteRocket(req, res);
});

module.exports = router;