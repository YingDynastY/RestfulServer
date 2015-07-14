var express=require('express');
var router=express.Router();
var moment=require('moment');
var url=require('url');
var swig=require('swig');
var http=require('http');
var mongoose=require('mongoose');
var Data=require('../models/data');

router.get('/index',function(req,res){
	res.render('index');
});
router.get('/data',function(req,res){

	res.render("intro");

});

router.get('/data:value',function(req,res){

	res.send('value:'+req.params.value);
	var temp=req.params.value;
	var date=new Date();
	date=moment(date).format('lll');

	mongoose.model('Data').create({
		value:temp,
		date:date
	},function(err){
		if(err){
			res.send("There was a problem");
		}else{
			console.log("Data Uploaded"+temp);
			console.log("Time:"+date);
		}
	});

});

router.get('/draw',function(req,res){
	mongoose.model('Data').find({},'',(function(err, value){
    res.send(value);
    }));
});

router.get('/find',function(req,res){
 
	mongoose.model('Data').find({}, '-_id', function (err, value) {
		res.render('RawData',{values:value});
	});
	// var template = swig.compileFile('./views/RawData.html');
 //    var output=template({
 //  		values:value
 //    });
	
});
router.get('/delete',function(req,res){
	mongoose.model('Data').remove({},function(err,removed)
	{
		res.send("data cleared");
	});
});


router.get('/visual',function(req,res){
	res.render("visualization");
});

module.exports=router;