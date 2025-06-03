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
  res.render('login/login', {title: 'Entrar - FitTrack'})
})

router.post('/login', async function(req, res, next){
  const email = req.body.email
  const password = req.body.password

  const user = await global.database.searchUser({email, password})

  global.userCode = user.id;
  global.userEmail = user.email;
  
  res.redirect('/home/training');
})

/* REGISTER */

router.get('/register', async function(req, res, next) {
  res.render('register/register', {title: "Cadastro - FitTrack"})
})

/* HOME */

router.get('/home/training', async function(req, res, next) {
  verifyLogin(res)
  res.render('training/home', {title: "FitTrack", user: global.userEmail})
})

router.get('/home/videos', async function(req, res, next) {
  res.render('videos/home', {title: "FitTrack", user: global.userEmail})
})

router.get('/home/calories', async function(req, res, next) {
  res.render('calories/home', {title: "FitTrack", user: global.userEmail})
})

function verifyLogin(res)
{
  if (!global.userEmail || global.userEmail == "")
    res.redirect('/login');
}

module.exports = router;
