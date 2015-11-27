$(document).ready(function(){
console.log(window.location);
	$('#from-day-container .input-group.date').datepicker({
		 autoclose: true,
		 todayHighlight: true,
		 format: 'dd/mm/yyyy'
	});
		$.each($('#from-day-container .input-group.date'), function( index, value ) {
	  $(this).datepicker('update', new Date());
	});
	drawRegisteredUsersChart();
});

 // Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
var drawRegisteredUsersChart = function() {

var chart = c3.generate({
    bindto: '#registered-users-chart',
    data: {
      columns: [
        ['TotalUsuarios', 50, 70, 80, 120, 135, 160],
        ['NuevosUsuarios', 50, 20, 10, 40, 15, 25]
      ],
      axes: {
        NuevosUsuarios: 'y',
		TotalUsuarios: 'y2'
      },
      types: {
        NuevosUsuarios: 'bar' // ADD
      }
    },
    axis: {
      y: {
        label: {
          text: 'Nuevos Usuarios',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true,
        label: {
          text: 'Total Usuarios',
          position: 'outer-middle'
        },
		tick: 10,
		max: 200
      }
    }
});
}

