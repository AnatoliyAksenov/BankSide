var express = require('express');
var helmet = require('helmet');

// Create a new Express application.
var app = express();

var port = process.env.port || 8080;
var address = process.env.address || '0.0.0.0';

var cookieSession = require('cookie-session');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

// app.use(require('express-session')({ 
//   secret: 'RosEuroBank developers the best of the best!', 
//   resave: true, 
//   saveUninitialized: true,
//   name : 'sessionId',
//   maxAge: 24 * 60 * 60 * 1000
// }));

app.use(cookieSession({
  name: 'session',
  keys: ['kkkey  1','iejdkj3 2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


//authrequest
//http://192.168.99.100:8081/authorize?client_id=222222&redirect_uri=http%3A%2F%2F192.168.99.100%3A8089%2Foauth2&response_type=code&scope=all&state=xyz

app.use(helmet());
app.disable('x-powered-by');

app.use('/',express.static('public/app'));

app.post('/api/userdata/save', function(req, res){
  var firstname = req.body.firstname;
  var middlename = req.body.middlename;
  var lastname = req.body.lastname;
  var passport = req.body.passport;
  var user = {};
  user.firstname = firstname;
  user.middlename = middlename;
  user.lastname = lastname;
  user.passport = passport;
  user.step = 2;
  req.session.user = user;
  res.status(200).json({result: "Success"});
});

app.get('/api/userdata', function(req, res){
  var user = req.session.user;
  res.status(200).json(user);
});

app.post('/api/userdata/card/add', function(req, res){
  var cardnumber = req.body.cardnumber;
  req.session.user.cardnumber = cardnumber;
  req.session.step = 3;
  req.session.user.step = 3;
  res.status(200).json({result: "Success"});
});

app.get('/api/userdata/card', function(req, res){
  var cardnumber = req.session.user.cardnumber;
  res.status(200).json({cardnumber: cardnumber});
});

app.get('/oauthcomplete',
  function(req, res){
    var code = req.originalUrl;
    var r = /code=(\w+)/;

    if (r.test(code)){
      req.session.user.step = 3;
      req.session.authcode = req.originalUrl.match(r)[1];
      res.redirect("/?login=success");
    } else {
      req.session.user.step = 2;
      req.session.authcode = null;
      res.redirect('/?login=false');
    }

  });

app.get('/api/list',
  function(req, res){
    res.status(200).json({list: 'list'});
  });

app.listen(port, function(){
  console.log(`listening localhost:${port}`);
});
