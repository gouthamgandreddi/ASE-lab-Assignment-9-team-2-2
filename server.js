// comment in git
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const app = express();

app.set('view engine','pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('images'));
app.use(express.static('css'));
app.use(cookieParser());

userInfo = {
    username:'Monkey D Luffy',
    password:'UMKC@123'
}

app.get('/',(req,res)=>{
    res.render('hellocyberworld',{error:''});
});

app.post('/',(req,res,next)=>{
    console.log('req ',req);
    if(req.body.username == userInfo.username && req.body.password == userInfo.password){
        res.cookie('username',req.body.username);
        res.cookie('password',req.body.password);
        console.log('req content -',req.body);
        res.render('home',{username:req.cookies.username ,password: 'click on Show password button to get password from cookie details'});

    }
    else{
        res.render('hellocyberworld',{error:'user not registered with us'});
    }
});

app.get('/userinfo',(req,res,next)=>{
    console.log('in userinfo ',req);
    console.log('Cookies: ', req.cookies);
    console.log('setting username using cookies - ',req.cookies.username);
    res.render('home',{username: req.cookies.username, password:req.cookies.password});
});

app.listen(port,()=>{
    console.log('server started');
});
