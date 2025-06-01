var express = require('express');
var router = express.Router();

/* GET admin. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});

/* GET dashboard */
router.get('/dashboard', function(req, res, next){
  verifyLogin(res);
  res.render('admin/dashboard',{admNome : global.adminEmail});
});

router.post('/', async function(req, res, next){
    const name = req.body.name
    const password = req.body.password
  
    const admin = await global.database.searchAdmin({name, password})
  
    global.adminCode = admin.id;
    global.adminName = admin.name;
    res.redirect('admin/dashboard');
  })

function verifyLogin(res)
{

}

module.exports = router;
