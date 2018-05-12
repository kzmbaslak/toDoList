var express = require('express');
var app = express();
var fs = require('fs');

app.get('/listele', function(request,response){
	//response.send('İşleri Listele');
	fs.readFile('is.json','utf8',function(err,data){
		console.log(data);
		response.end(data);
	});
});
app.get('/ekle', function(request,response){
	//response.end('İş ekle');
	
	var yeniIs = {
		"0":{
			"isim":request.query.isim,
			"oncelik":request.query.oncelik,
		}
	};
	fs.readFile('is.json','utf8',function(err,data){
		//console.log(data);
		data = JSON.parse(data);
		var id = "i" + (data["i0"].oncelik + 1);
		data["i0"].oncelik++;
		data[id] = yeniIs["0"];
		console.log(data);
		data = JSON.stringify(data);
		response.end(data);
		fs.writeFile('is.json',data,function(err){
			console.log('dosya eklendi');
		});
	});
});
app.get('/sil', function(request,response){
	response.end('İş sil');
	fs.readFile('is.json','utf8',function(err,data){
		data = JSON.parse(data);
		console.log(data);
		delete data["i"+request.query.id];
		console.log(data);
		console.log('silindi');
		fs.writeFile('is.json',JSON.stringify(data),function(err){
			
		});
	});
});

var server = app.listen(8000, function(){
	console.log('sunucu çalışıyor');
});