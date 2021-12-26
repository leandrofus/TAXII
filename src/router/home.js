var express = require('express');
var router = express.Router();

router.get('/', async(req, res) => {
    res.render('_index', { layout: false });
});

module.exports = router