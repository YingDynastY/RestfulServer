var express= require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var swig=require('swig');
var path=require('path');
var morgan=require('morgan');

mongoose.connect('mongodb://localhost:27017/test');
var app= express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'/public')));
app.use('/api',require('./routes/router'));
app.use(bodyParser.urlencoded({
	extended:true
}));

app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views',path.join(__dirname,'views'));


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.listen(3000);
console.log("Server is running on Port 3000");