const express = require('express');//fetched existing instance

const router = express.Router();
//home controller for getting the home page data from controller
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeController.home);


module.exports = router;