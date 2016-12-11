var express = require('express');


// Create a new Express application.
var app = express();

var port = process.env.port || 8080;
var address = process.env.address || '0.0.0.0';

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'Microsoft BlockchainSckool darkchain', resave: true, saveUninitialized: true }));


//authrequest
//http://192.168.99.100:8081/authorize?client_id=222222&redirect_uri=http%3A%2F%2F192.168.99.100%3A8089%2Foauth2&response_type=code&scope=all&state=xyz

//public folder 
app.use('/', express.static('public/app'));

app.get('/oauth2',
  function(req, res){
    var code = req.originalUrl;
    var r = /code=\w+/;
    if (r.test(code)){

      res.redirect("/?login=success");
    } else {
      res.redirect('/?login=false');
    }

  });

app.get('/api/list',
  function(req, res){
    res.status(200).json({list: 'list'});
  });


app.listen(port);
