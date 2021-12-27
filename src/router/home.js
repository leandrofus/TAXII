var express = require('express');
const session = require('express-session');
var router = express.Router();
var db = require('../db/query')
var dbName = 'taxii';
var colletionName = 'registros';
//db.verTodo(dbName, colletionName)

router.get('/', async(req, res) => {
    if (req.session.cookie.maxAge) {
        res.redirect('/carga')

    }
    res.render('_index', { layout: false });
});
router.get('/carga', async(req, res) => {
    res.render('carga', { layout: false });
})


router.post('/auth', async(req, res) => {
    var auth = await db.login(req);
    if (auth.logged == true) {
        var sess = req.session.userid = auth.userid
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        console.log(sess);
        res.render('carga', { layout: false });

    } else {
        res.render('_index', { layout: false });

    }


});
router.post('/carga', async(req, res) => {
    console.log(req.session.userid)
    var carga = await db.carga(req.body, req.session.userid);

})

module.exports = router