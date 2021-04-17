var express = require('express');
var router = express.Router();
var TUser = require('../models/tuser');
var SUser = require('../models/Suser');

router.get('/', function (req, res, next) {
	return res.render('home.ejs');
});


router.get('/teacherReg', function (req, res, next) {
	return res.render('teacherReg.ejs');
});

router.get('/studentReg', function (req, res, next) {
	return res.render('studentReg.ejs');
});

router.post('/teacherReg', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;

	if( !personInfo.email || !personInfo.firstname ||  !personInfo.lastname || !personInfo.gender || !personInfo.number || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			TUser.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					TUser.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new TUser({
							unique_id:c,
							email:personInfo.email,
							firstname:personInfo.firstname,
							lastname:personInfo.lastname,
							gender:personInfo.gender,
							number:personInfo.number,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

router.post('/studentReg', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if( !personInfo.email || !personInfo.firstname ||  !personInfo.lastname || !personInfo.gender || !personInfo.number || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			SUser.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					SUser.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new SUser({
							unique_id:c,
							email:personInfo.email,
							firstname:personInfo.firstname,
							lastname:personInfo.lastname,
							gender:personInfo.gender,
							number:personInfo.number,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.get('/loginStud', function (req, res, next) {
	return res.render('loginStud.ejs');
});


router.post('/login', function (req, res, next) {
	//console.log(req.body);
	TUser.findOne({email:req.body.email},function(err,data){
		if(data){
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

router.post('/loginStud', function (req, res, next) {
	//console.log(req.body);
	SUser.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});


router.get('/profile', function (req, res, next) {
	console.log("profile");
	TUser.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			return res.render('data.ejs', {"name":data.lastname,"email":data.email});
		}
	});
});

router.get('/profileStud', function (req, res, next) {
	console.log("profileStud");
	SUser.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			return res.render('dataStud.ejs', {"name":data.lastname,"email":data.email});
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	TUser.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

router.get('/forgetpassStud', function (req, res, next) {
	res.render("forgetpassStud.ejs");
});

router.post('/forgetpassStud', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	SUser.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});


module.exports = router;