const express = require('express');//fetched existing instance
const router = express.Router();

const passport = require('passport');//fetched existing instance
//home controller for getting the home page data from controller
const usersController = require('../controllers/users_controller');

router.get('/profile/:id',usersController.profile);//passport.checkAuthentication
router.post('/update/:id',usersController.update);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

/* CREATING USER IN DATABASE */
router.post('/create',usersController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'users/sign-in'}
),usersController.createSession)

router.get('/sign-out',usersController.destroySession);

module.exports = router;