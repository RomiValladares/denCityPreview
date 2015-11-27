$(document).ready(function(){
	drawTimeseries();
});

var drawTimeseries = function() {
	var domEl = 'timeseries';

	var todayAtMidday = new Date();
	todayAtMidday.setHours(12); 
	console.log(todayAtMidday);

	var data = [];
	//llena 10 dias hasta hoy
	for(var i = 10;  i>=0; i--) {
		var date = new Date();
		var prevDate = new Date();
		prevDate.setDate(date.getDate() - i);
		
		var nOfVisitsDay = Math.floor(Math.random() * (50 - 6 + 1)) + 6;
		for(var b = 0;  b <= nOfVisitsDay; b++){
			prevDate.setHours(Math.floor(Math.random() * (23 - 1 + 1)) + 1);
			console.log(prevDate.toLocaleString());
			data.push({'value': new Date(prevDate)});
		}
	}

	var brushEnabled = false;

	timeseries(domEl, data, brushEnabled, "%d/%m/%y", {width: parseFloat($(".timeseries").css("width")) - 30, height:parseFloat($(".timeseries").css("height")), margin:null});
}
