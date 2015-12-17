$(document).ready(function() {
	$('#from-day-container .input-group.date').datepicker({
		autoclose : true,
		todayHighlight : true,
		format : 'dd/mm/yyyy'
	});
	$.each($('#from-day-container .input-group.date'), function(index, value) {
		$(this).datepicker('update', new Date());
	});
	// default dates, today - 7 days
	var d = new Date();
	d.setDate(d.getDate() - 5);
	$("#input-from-time").datepicker("setDate", d);
	$("#input-to-time").datepicker("setDate", new Date());
	$("#btn-search-registered-users").click(function() {
		getRegisteredUsersChart();
	});
	getRegisteredUsersChart();
	// buildCategoriesMenu();
});

function getRegisteredUsersChart() {
	var filters = getRegisteredUsersFilters();
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
				url : "http://localhost:8080/dencity/api/adminmetrics/registeredusersmetrics",
				contentType : "application/json",
				data : JSON.stringify(filters),
				success : function(data) {
					$.unblockUI();
					loadRightPanel(data);
					drawRegisteredUsersChart(data);
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

function getRegisteredUsersFilters() {
	var fromTime = $("#input-from-time").datepicker("getDate");
	var toTime = $("#input-to-time").datepicker("getDate");

	return {
		fromTime : fromTime,
		toTime : toTime
	};
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
var drawRegisteredUsersChart = function(data) {

	var chart = c3.generate({
		bindto : '#registered-users-chart',
		data : {
			x : 'x',
			columns : [
					$.merge([ 'x' ], data.data.detail.xAxis.values),
					$.merge([ 'TotalUsuarios' ],
							data.data.detail.values[0].values),
					$.merge([ 'NuevosUsuarios' ],
							data.data.detail.values[1].values) ],
			axes : {
				NuevosUsuarios : 'y',
				TotalUsuarios : 'y2'
			},
			types : {
				NuevosUsuarios : 'bar' // ADD
			}
		},
		axis : {
			x : {
				type : 'timeseries',
				tick : {
					format : '%Y-%m-%d'
				}
			},
			y : {
				label : {
					text : 'Nuevos Usuarios',
					position : 'outer-middle'
				}
			},
			y2 : {
				show : true,
				label : {
					text : 'Total Usuarios',
					position : 'outer-middle'
				},
				tick : 10
			}
		}
	});
}

// sets the new data on the right panel
function loadRightPanel(data) {
	if (data != null && data.data != null && data.data.summary != null) {
		$("#span-registered-total").text(data.data.summary.total);
		$("#span-peak-day").text(data.data.summary.peak);
	} else {
		$("#span-registered-total").text("-");
		$("#span-peak-day").text("-");
	}
}
