const express = require('express');//fetched existing instance

const router = express.Router();

const postsApi = require('../../../controllers/api/v1/posts_api.js');

router.get('/',postsApi.index);
router.delete('/:id',postsApi.destroy);

module.exports = router;