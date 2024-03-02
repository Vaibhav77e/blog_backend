const express = require('express');

const router = express.Router();

const {searchFunction} = require('../controllers/searchController/searchController');

router.route('/blog/search').get(searchFunction);

module.exports = router;