var express = require('express');
var router = express.Router();

/* GET login. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET login. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET login Exit. */
router.get('/login/:exit', function (req, res, next) {
  res.render('login', { title: 'Login', sucess: 'Check back often!' });
});

/* POST login listing. */
router.post('/new', function (req, res, next) {
  var name = req.body.nameCad;
  var lastName = req.body.firstnameCad;
  var passWord = req.body.PasswordCad;
  var confirmedPassWord = req.body.confirmedPasswordCad;
  switch (passWord) {
    case '': case null: case ' ': case undefined:
      {
        res.render('login', { title: 'Login', senha: 'password invalid!' });
        break;
      };
    case confirmedPassWord: {
      require('../db').chekUser(name, lastName, function (docs) {
        if(docs){
          res.render('login', { title: 'Login', senha: 'Registration already exists!!'});
        } else{
          require('../db').saveUser(name, lastName, passWord,
            function () { res.render('login',{title: 'Login', sucess: 'Register with success, please login!'}) });
        }  
      });
      break;
    };
    default:
      {
        res.render('login', { title: 'Login', senha: 'password invalid!' });
        break;
      };
  }
});

/* Post login db. */
router.post('/loginChat', function (req, res, next) {
  var name = req.body.nameLog;
  var lastName = req.body.firstnameLog;
  var passWord = req.body.PasswordLog;
  require('../db').chekPasswordUser(name, lastName, passWord, function (docs) {
    if(docs){
        res.cookie('login',name+' '+lastName);
        res.redirect('/chat/'+name+" "+lastName);
        return;
    } else{
      console.log(docs + 'aboroas'+name +" "+ lastName+passWord);
        res.render('login', { title: 'Login', senhaLog: 'Incorrect password or User Not registered!'});
    }  
  });
});

module.exports = router;
