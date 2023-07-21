const express = require('express');//fetched existing instance

const router = express.Router();
//home controller for getting the home page data from controller
const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIp);


module.exports = router;