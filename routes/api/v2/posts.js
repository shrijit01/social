const express = require('express');//fetched existing instance

const router = express.Router();

const postsApi = require('../../../controllers/api/v2/posts_api.js');

router.get('/',postsApi.index);

module.exports = router;