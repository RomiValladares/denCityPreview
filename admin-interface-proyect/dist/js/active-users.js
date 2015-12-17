$(document).ready(function(){
	//drawTimeseries();
	var data = [{"key":"Stream0","values":[{"x":0,"y":0.6079351976987603},{"x":1,"y":0.9957659489812959},{"x":2,"y":1.5739802007911499},{"x":3,"y":1.9068015291726788},{"x":4,"y":2.2137392050836406},{"x":5,"y":2.0950551150105143},{"x":6,"y":1.6960732513901242},{"x":7,"y":1.2467291088801262},{"x":8,"y":0.828380514022442},{"x":9,"y":0.47352028949078684},{"x":10,"y":0.3331969451774099},{"x":11,"y":0.2548404787468062},{"x":12,"y":0.14386525260496055},{"x":13,"y":0.21421603492488728},{"x":14,"y":0.22731853845159367},{"x":15,"y":0.19079646056416144},{"x":16,"y":0.2712534555784697},{"x":17,"y":0.2988210921623923},{"x":18,"y":0.4532790780117789},{"x":19,"y":0.5599275010804632},{"x":20,"y":0.6417848036322363},{"x":21,"y":0.7929823615552389},{"x":22,"y":0.9683665484503019},{"x":23,"y":1.0893116037271457},{"x":24,"y":1.1354902672051266},{"x":25,"y":1.1723803056985165},{"x":26,"y":1.1517418674779571},{"x":27,"y":1.1466502341053688},{"x":28,"y":1.0169467208617442},{"x":29,"y":0.9024088495370068},{"x":30,"y":0.7979625219590636},{"x":31,"y":0.6309002244541563},{"x":32,"y":0.47998173018572277},{"x":33,"y":0.3726031965936241},{"x":34,"y":0.3466784253439533},{"x":35,"y":0.21890544683494156},{"x":36,"y":0.2094742329024429},{"x":37,"y":0.2403449557525974},{"x":38,"y":0.2045528473983729},{"x":39,"y":0.13356248771151133},{"x":40,"y":0.19082171072587853},{"x":41,"y":0.1649280330108802},{"x":42,"y":0.13543352410125595},{"x":43,"y":0.1645665912577521}]}];
	nv.addGraph(function() {
		var chart = nv.models.lineWithFocusChart();
		
		chart.xAxis
		.tickFormat(d3.format(',f'));
		
		chart.yAxis
		.tickFormat(d3.format(',.2f'));
		
		chart.y2Axis
		.tickFormat(d3.format(',.2f'));
		
		d3.select('#active-users-single-day svg')
		.datum(data)
		.transition().duration(500)
		.call(chart);
		
		nv.utils.windowResize(chart.update);
		
		return chart;
	});
	
	var cal = new CalHeatMap();
	cal.init({
		itemSelector: "#month-heatmap",
		domain: "month",
		subDomain: "x_day",
		cellSize: 20,
		subDomainTextFormat: "%d",
		range: 1,
		displayLegend: false
	});
});
/**************************************
	* Simple test data generator
*/

function testData() {
	return stream_layers(3,128,.1).map(function(data, i) {
		return { 
			key: 'Stream' + i,
			values: data
		};
	});
}

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
