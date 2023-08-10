const express = require('express');//fetched existing instance

const router = express.Router();
//home controller for getting the home page data from controller
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));


// for any further routes access from here 
// router.use('routeName',require('./routerfile'));

module.exports = router;