//load express package cho app
var express = require('express');
var app = express();
var path = require('path');
var adminRouter = express.Router();
//send our index.html file to the user for the home page
app.get('/',function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.route('/login')
    .get(function (req, res) {
        res.send('This is the login form');
        console.log(req.method, req.url);
    })
    .post(function (req, res) {
        console.log(req.method, req.url);
        res.send('Login with normal user');
    });


adminRouter.use(function (req, res, next) {
    //ghi lai request
    console.log(req.method,req.url);
    next();
});
//admin page (/admin)
adminRouter.get('/',function (req,res) {
    res.send('I am ADMIN in the dashboard!');
});
//route middleware vi tinh nang kiem tra :name
adminRouter.param('name' ,function(req, res, next, name){
    //co the lam cac thao tac kiem tra hop le
    console.log('Doing name validations on '+name);
    //once validation is done save the new item in the req
    req.name = name;
    next();
});
adminRouter.get('/hello/:name',function (req, res) {
    res.send('Hello '+req.params.name+' from /hello!');
});
adminRouter.get('/users/:name',function (req, res) {
    res.send('Hello '+req.params.name+' from /users!');
});
//post page (/admin/posts)
adminRouter.get('/posts',function (req, res) {
    res.send('I show all the posts!');
});

//apply the routes to our application
app.use('/admin',adminRouter);
//start server
app.listen(1337);
console.log('App running at port 1337');


