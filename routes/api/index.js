const express = require('express');//fetched existing instance

const router = express.Router();

router.use('/v1',require('./v1'));
router.use('/v2',require('./v2'));


module.exports = router;