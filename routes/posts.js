const express = require('express');//fetched existing instance
const router = express.Router();
const passport = require('passport');

const postController = require("../controllers/posts_controller");


router.post('/create',passport.checkAuthentication,postController.create);

module.exports = router;