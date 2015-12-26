var singleDayChart;//ref to nvd3 detail chart
var cal;
$(document).ready(function(){
	
	nv.addGraph(function() {
		singleDayChart = nv.models.lineWithFocusChart();
		var data = [];
		var tickMultiFormat = d3.time.format.multi([
            ["%-I:%M%p", function(d) { return d.getMinutes(); }], // not the beginning of the hour
            ["%-I%p", function(d) { return d.getHours(); }], // not midnight
            ["%b %-d", function(d) { return d.getDate() != 1; }], // not the first of the month
            ["%b %-d", function(d) { return d.getMonth(); }], // not Jan 1st
            ["%Y", function() { return true; }]
		]);
        singleDayChart.xAxis
		.tickPadding(10)
		.tickFormat(function (d) { return tickMultiFormat(new Date(d)); })
        ;
		console.log("LINE CHART DATA "+JSON.stringify(data));
		singleDayChart.yAxis
		.tickFormat(d3.format("d"));
		
		singleDayChart.y2Axis
		.tickFormat(d3.format("d"));
		
		singleDayChart.x2Axis
		.tickPadding(10)
		.tickFormat(function (d) { return tickMultiFormat(new Date(d)); })
        ;
		
		d3.select('#active-users-single-day svg')
		.datum(data)
		.transition().duration(500)
		.call(singleDayChart);
		
		nv.utils.windowResize(singleDayChart.update);
		
		return singleDayChart;
	});
	
	//so that the charts redraw
	$("#main-active-users-charts").on('shown.bs.collapse', function(){
		window.dispatchEvent(new Event('resize'));
	});
	drawTimeseries();
	
	
	
	
	
	$("#hidden-days-tags-input").tagsManager({tagClass:"tm-tag-info", tagsContainer:"#div-days-tags"});
	
	$("#collapseTwo").panelUtils({type:"date", idPrefix:"active-users"});
	$("#active-users-btn-search").click(function() {
		getActiveUsersChart();
	});
	
	getActiveUsersChart();
});
function getActiveUsersChart() {
	var filters = getActiveUsersFilters();
	$.blockUI({
		css : {
			border : 'none',
			padding : '15px',
			backgroundColor : '#000',
			'-webkit-border-radius' : '10px',
			'-moz-border-radius' : '10px',
			opacity : .5,
			color : '#fff'
		},
		message : "cargando..."
	});
	$
	.ajax({
		type : "POST",
		url : "http://localhost:8080/dencity/api/adminmetrics/activeusersmetrics",
		contentType : "application/json",
		data : JSON.stringify(filters),
		success : function(data) {
			$.unblockUI();
			console.log("server response: "+JSON.stringify(data));
			if(data !=null && data.data !=null){
				setHeatmapData(data.data.summary.data);
				}else{
				setHeatmapData({});
			}
		},
		failure : function(errMsg) {
			$.unblockUI();
			alert(errMsg);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$.unblockUI();
			alert(jqXHR + textStatus + errorThrown);
		}
	});
}

function setHeatmapData(caldata){
	if(cal == undefined){		
		console.log("CALENDAR DATA: "+JSON.stringify(caldata));
		cal = new CalHeatMap();
		cal.init({
			itemSelector: "#month-heatmap",
			domain: "month",
			subDomain: "x_day",
			data:caldata,
			start: new Date(),
			cellSize: 30,
			range: 1,
			previousSelector: "#month-heatmap-prev-btn",
			nextSelector: "#month-heatmap-next-btn",
			domainLabelFormat: function(date) {
				moment.lang("es");
				return moment(date).format("MMMM").toUpperCase();
			},
			subDomainDateFormat:  function(date) {
				return moment(date).format("LL"); // Use moment.js library to translate date
			},
			subDomainTextFormat: "%d",
			subDomainTitleFormat: {
				empty: "Sin datos para el {date}",
				filled: " {count} visitas para el {date}"
			},
			displayLegend: false
		});
	}else{
		cal.update(caldata);
	}
}

function getActiveUsersFilters() {
	var fromTime = $("#active-users-input-from-time").datepicker("getDate");
	var toTime = $("#active-users-input-to-time").datepicker("getDate");
	
	return {
		fromTime : fromTime,
		toTime : toTime
	};
}
function dummyCalData() {
	var calData = {};
	$.each(globalData, function(i, val){
		var d =new Date(val.value);
		
		var secEpoch=Math.floor(d.getTime() / 1000);
		calData[""+secEpoch] = 1;
	});
	return calData;
}

var drawTimeseries = function(caldata) {
	var domEl = 'timeseries';
	
	var brushEnabled = false;
	globalData=dummyData();
	
	console.log("TIMESERIES DATA:"+JSON.stringify(globalData));
	
	timeseries(domEl, globalData, brushEnabled, "%d/%m/%y", {width: parseFloat($(".timeseries").css("width")) - 30, height:parseFloat($(".timeseries").css("height")), margin:null});
	
	$("#active-users-timeseries .x.axis text").unbind("click").bind("click", function(){
		$("#hidden-days-tags-input").tagsManager('pushTag', $( this ).text());
		$("#div-days-tags .tm-tag").addClass("pull-right");
		var data =d3.select('#active-users-single-day svg').datum();
		data.push({key:$( this ).text(),"values":[{"x":1425096000000,"y":6},{"x":1425096600000,"y":2}]});
		console.log(JSON.stringify(d3.select('#active-users-single-day svg').datum()));
		d3.select('#active-users-single-day svg')
		.datum(data)
		.transition().duration(500)
		.call(singleDayChart);
		
		nv.utils.windowResize(singleDayChart.update);
	});
}

function dummyData() {
	var data= [];
	//llena 6 dias hasta hoy
	for(var i = 5;  i>=0; i--) {
		var date = new Date();
		var prevDate = new Date();
		prevDate.setDate(date.getDate() - i);
		
		var nOfVisitsDay = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
		for(var b = 0;  b <= nOfVisitsDay; b++){
			prevDate.setHours(Math.floor(Math.random() * (23 - 1 + 1)) + 1);
			data.push({'value': new Date(prevDate).getTime()});
		}
	}
	return data;
}