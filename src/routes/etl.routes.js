const express = require('express');
const router = express.Router();

const {etlInserts} = require('../controller/etl.controller');

router.get('/', etlInserts);

module.exports = router;