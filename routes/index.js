var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (global.userEmail && global.userEmail != "") {
    res.redirect('/browse');
  }
  res.render('index', { title: 'Welcome to FitTrack' });
});

/* LOG IN */

router.get('/login', function(req, res, next){
  res.render('login/login', {title: 'Login - FitTrack'})
})

router.post('/login', async function(req, res, next){
  const email = req.body.email
  const password = req.body.password

  const user = await global.database.searchUser({email, password})

  global.userCode = user.id; // Mudar nome do codigo para o nome no mongo
  global.userEmail = user.email; // Mudar nome do codigo para o nome no mongo
  res.redirect('/perfis');
})


module.exports = router;
