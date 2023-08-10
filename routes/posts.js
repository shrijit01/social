const express = require('express');//fetched existing instance
const router = express.Router();

const postController = require("../controllers/posts_controller");


router.post('/create',postController.create);

module.exports = router;