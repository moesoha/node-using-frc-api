/*=============================================
Using FRC API
-----------------------------------------------
Tianhai Information Technology(T.H.I.T.)
	http://tianhai.info/
First Lemon(TrueMoe)
	https://6385true.moe/
Soha King
	https://soha.moe/
=============================================*/

var request=require('request');

var generalRequestHeader={
	'Accept': 'application/json; q=0.01',
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language': 'en,zh-CN;q=0.8,zh;q=0.6,en-US;q=0.4',
	'Cache-Control': 'no-cache',
	'Connection': 'keep-alive',
	'Content-Type': 'charset=UTF-8',
	'Pragma': 'no-cache',
	'User-Agent': 'TrueMoe_Using-FRC-API_Module/1.0'
};
var baseUrl="https://frc-api.firstinspires.org";

var api=function (username,password,season='2017',apiVersion='v2.0'){
	var authString=(new Buffer(username+":"+password)).toString('base64');
	generalRequestHeader['Authorization']='Basic '+authString;
	baseUrl+='/'+apiVersion+'/'+season;
};

function doRequest(callback,uri,data={},method="GET"){
	var requestOptions={
		headers: generalRequestHeader,
		method: method,
		json: true
	};
	var url=baseUrl+uri;
	if(method=='GET'){
		var paras=[];
		for(var key in data){
			if(object.hasOwnProperty(key)){
				paras.push(key+'='+encodeURIComponent(data[key]));
			}
		}
		url+='?'+paras.join('&');
	}else if(method=='POST'){
		requestOptions['form']=data;
	}
	requestOptions['url']=url;

	request(requestOptions,callback);
}

api.prototype.alliance=function (eventCode,callback){
	doRequest(callback,'/alliances/'+eventCode);
};

api.prototype.award={
	awards: function (eventCode,data,callback){
		doRequest(callback,'/awards/'+eventCode,data);
	},
	list: function (callback){
		doRequest(callback,'/awards/list')
	}
};

api.prototype.match={
	result: function (eventCode,data,callback){
		doRequest(callback,'/matches/'+eventCode,data);
	},
	scoreDetails: function (eventCode,tournamentLevel,data,callback){
		doRequest(callback,'/scores/'+eventCode+'/'+tournamentLevel,data);
	}
};

api.prototype.ranking={
	event: function (eventCode,data,callback){
		doRequest(callback,'/rankings/'+eventCode,data);
	}
};

api.prototype.schedule={
	event: function (eventCode,tournamentLevel,data,callback){
		if(data){
			var newData=data['tournamentLevel']=tournamentLevel;
		}
		doRequest(callback,'/schedule/'+eventCode,data);
	},
	hybrid: function (eventCode,tournamentLevel,data,callback){
		doRequest(callback,'/schedule/'+eventCode+'/'+tournamentLevel+'/hybrid',data);
	}
};

api.prototype.season={
	summary: function (callback){
		doRequest(callback,'/');
	},
	event: function (data,callback){
		doRequest(callback,'/events',data);
	},
	district: function (callback){
		doRequest(callback,'/districts');
	},
	team: function (data,callback){
		doRequest(callback,'/teams',data);
	},
	registration: function (data,callback){
		doRequest(callback,'/registrations',data);
	}
};

api.prototype.customRequest=doRequest;

module.exports=api;
