$(document).ready(function(){
	$( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
	drawUsersCharacteristicsZoomableTreemap();
	drawPrimaryAttrPiechart();
});

 // Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
var drawUsersCharacteristicsZoomableTreemap = function() {

    var data = [
			  {
				"key": "20-25",
				"values": [
					{
					  "key": "Hacen Algo",
					  "value": 20
					},
					{
					  "key": "Ni Ni",
					  "value": 80
					}
				]
			  },
			  {
				"key": "30-35",
				"values": [
					{
					  "key": "Hacen Algo",
					  "values": [
					{
					  "key": "Doctor",
					  "value": 15
					},
					{
					  "key": "Helpdesk",
					  "value": 50
					},
					{
					  "key": "Makeup artist",
					  "value": 35
					}
				]
					},
					{
					  "key": "Ni Ni",
					  "value": 20
					}
				]
			  }
			];
			
			
            main(null, {key: "ABCD", values: data}, 'users-characteristics-zoomable-treemap');

}

var drawPrimaryAttrPiechart = function () {
	var chart = c3.generate({
		bindto: '#primary-attr-piechart',
	data: {
        columns: [
            ['20-25', 30],
            ['30-35', 120],
        ],
        type : 'donut'
    },
    donut: {
        title: "edad"
    }
	});
}