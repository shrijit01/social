const express = require('express');//fetched existing instance

const router = express.Router();

router.use('/posts',require('./posts'));

module.exports = router;