var http = require("https");
var express = require('express');
var app = require('express')();
var cors = require('cors');
var bodyParser = require('body-parser');
var request = require("request");

var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.post('/token', function (req, res,next) {  
 // req.body.text = `${req.body.text} from Nodejs`;
  res.end(req.body.toString());//[object]
  var tokens = req.body.token_type.toString()+' '+req.body.access_token.toString()
  console.log('t= '+req.toString())
  localStorage.setItem('token', tokens)
})
var type_token = localStorage.getItem('token');
var options1 = { 
                 method: 'GET', 
                 url: 'https://api.medium.com/v1/me',
                 headers: { authorization:  type_token} 
};

request(options1, function (error, response, body) {
if (error) throw new Error(error);
app.get('/app/user',cors(),function(req,res){
  res.send(body);
  })
})

app.post('/iduser', function (req, res) {
//   req.body.text = `${req.body.text} from Nodejs`;
   res.send(req.body)
   var id = req.body.data.id.toString()//
   console.log('iduser= '+req.body.data.id)//id

       localStorage.setItem('iduser', id);
       
})//iduser
var iduser = localStorage.getItem('iduser')
var options2 = { 
                  method: 'GET',
                  url: 'https://api.medium.com/v1/users/'+iduser+'/publications',
                  headers: { authorization: type_token } 
};

request(options2, function (error, response, body) {
if (error) throw new Error(error);
//   //console.log('publication= '+body);
app.get('/app/publication',cors(),function(req,res){
   res.send(body);
   });
});

      var server = app.listen(3000,function(){
      console.log("Crud server listen at http://%s%s 3000");
      })
