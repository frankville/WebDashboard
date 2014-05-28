var http = require('http');
var express = require('express');
var app = express();
var connect = require('connect');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sessionStore = new connect.session.MemoryStore();
var crypto = require('crypto');
var mysql = require("mysql");
var sessionSecret = 'wielkiSekret44';
var sessionKey = 'connect.sid';
var server;

var db = mysql.createConnection({
    host: "localhost",
    user: "1",
    password:"1",
    database: "lancaster_test"
});

db.connect(function(err){
    if (err) console.log(err)
})


function generatePassword(str){
    var passwd = crypto.createHash('sha256').update(str, 'base64').digest('hex').slice(0,30);
    return passwd;
}



function validateLogin(username, password, callback){
    //var passwd = generatePassword(password);
    db.query('SELECT idusuario FROM usuarios WHERE nusuario = ? AND pusuario = ?' , [username, password], callback);
}


// configuration passport.js and server
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// verify user and password
var p = new LocalStrategy(
    function (username, password, done) {
        validateLogin(username,password,
            function(err, results) {
            if (!err){
                if (results[0] == null){
                    return done(null, false);
                }

                return done(null, {
                    username: username,
                    password: password
                });
            }
            else
                console.log(err);    
        });
    }
);

passport.use(p);

app.use(express.cookieParser());
app.use(express.urlencoded());
app.use(express.session({
    store: sessionStore,
    key: sessionKey,
    secret: sessionSecret
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',express.static(__dirname));
app.get('/', function(req, res) {
   
});

app.get('/isLogged', function(req, res) {
    if(req.isAuthenticated()){
         res.send(req.user.username);
    }else{
        res.send("");
    }
});


app.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/'
    }),
    function(req,res){
        res.send(req.user.username);
    }
);

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
server = http.createServer(app);

var onAuthorizeSuccess = function (data, accept) {
    accept(null, true);
};

var onAuthorizeFail = function (data, message, error, accept) {
    if (error) {
        throw new Error(message);
    }
    accept(null, false);
};

server.listen(2012, function () {
    console.log('server escuchando en el http://localhost:2012/');
});