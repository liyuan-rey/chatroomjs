// users.js

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.json({ id: 0, name: 'admin' });
});

module.exports = router;