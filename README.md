# Using FRC API

## Usage

Start using the module in a simple way:

	$ npm install using-frc-api

    var FRCAPI=require('using-frc-api');
    var api=new FRCAPI('username','password','2017','v2.0');

In `new FRCAPI(username,password,season,apiVersion)`, the arguments `season` and `apiVersion` are optional, they have default values of `'2017'` and `'v2.0'`.

## Using FRC API

NOTE: for what to request or what will server respond, refer to [FRC API Docs](http://docs.frcevents2.apiary.io/)

`callback` will be passed to node-request, so it is a function with 3 paraments: 

 1. An `error` when applicable
 2. An `http.IncomingMessage` object
 3. response body

The switch `json` in configuration of request is opened, so the third arguments is a json object.

### Alliance Selection

#### Event Alliances

	api.alliance(eventCode,callback);

For example:

	api.alliance('GUSH',function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

### Awards

#### Event Awards

	api.award.awards(eventCode,data,callback);

For example:

	api.award.awards('GUSH',{
		teamNumber: 6385
	},function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

#### Award Listing

	api.award.list(callback);

For example: 

	api.award.list(function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

### Match Results

#### Event Match Results

	api.match.result(eventCode,data,callback);

For example:

	api.match.result('GUSH',{
		tournamentLevel: null,
		teamNumber: 6385,
		matchNumber: 1
	},function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

#### Score Details

	api.match.scoreDetails(eventCode,tournamentLevel,data,callback);
	
For example:

	api.match.scoreDetails('GUSH','qual',{
		teamNumber: 6385
	},function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

### Ranking

#### Event Rankings

	api.ranking.event(eventCode,data,callback);

For example:

	api.ranking.event('GUSH',{
		top: 10
	},function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

### Schedule

#### Event Schedule

	api.schedule.event(eventCode,tournamentLevel,data,callback);

For example:

	api.schedule.event('GUSH','qual',{},function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

#### Hybrid Schedule

	api.schedule.hybrid(eventCode,tournamentLevel,data,callback);

For example:

	api.schedule.hybrid('GUSH','qual',{
		start: 16,
		end: 24
	},function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

### Season Data

#### Season Summary

	api.season.summary(callback);

For example:

	api.season.summary(function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

#### Event Listings

	api.season.event(data,callback);

For example:

	api.season.event({
		eventCode: 'GUSH',
		teamNumber: 6385
	},function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

#### District Listings

	api.season.district(callback);

For example:

	api.season.district(function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

#### Team Listings

	api.season.team(data,callback);

For example:

	api.season.team({
		teamNumber: 6385
	},function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

#### Registrations

	api.season.registration(data,callback);

For example:

	api.season.registration({
		teamNumber: 6385
	},function (err,response,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});

## Make A Custom Request

	api.customRequest(callback,uri,data,method);

`callback` A callback function

`uri` Request URI, a relative path

`data` An object, will pass to the server

`method` Request method, `'GET'` or `'POST'`