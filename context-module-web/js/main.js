//icons-color = 16a600

jQuery(document).ready( function($){	
	var ajax = 'http://52.35.111.57:8080/context-module/api/';
	var iduser; var emailuser;
	
	var map;
	var myOptions = {
		zoom: 4,
		center: new google.maps.LatLng(-18.0587832, -55.4221745),
		mapTypeId: 'roadmap'
	};
	map = new google.maps.Map($('#map')[0], myOptions);
	
	//Places service initialization
	var placesService = new google.maps.places.PlacesService(map);
	
	var markers = [];
	var propertyMarkers = [];
	var placeMarkers = [];
	
	// * * * * * * * * * * * * * * *
	// Functions
	// * * * * * * * * * * * * * * *
	
	var getMarkerUniqueId= function(lat, lng) {
		return lat + '_' + lng;
	}
	
	var getLatLng = function(lat, lng) {
		return new google.maps.LatLng(lat, lng);
	};
	
	var addMarker = google.maps.event.addListener(map, 'click', function(e) {
		if($('.new_property').is(":visible")){
			var lat = e.latLng.lat(); // lat of clicked point
			var lng = e.latLng.lng(); // lng of clicked point
			$('.new_property .geoLatitude').val(lat);
			$('.new_property .geoLongitude').val(lng);
			
			if(Object.keys(markers).length != 0){
				var markerId = 'new_property';
				var marker = markers[markerId]; // find marker	
				removeMarker(marker, markerId); // remove it	
			}
			
			var markerId = 'new_property';
			var marker = new google.maps.Marker({
				position: getLatLng(lat, lng),
				map: map,
				id: 'marker_' + markerId
			});
			markers[markerId] = marker; // cache marker in markers object
		}
	});
	
	var removeMarker = function(marker, markerId) {
		marker.setMap(null); // set markers setMap to null to remove it from map
		delete markers[markerId]; // delete marker instance from markers object
	};
	
	// * * * * * * * * * * * * * * *
	// Properties
	// * * * * * * * * * * * * * * *
	
	var addPropertyMarker = function(prop) {
		var marker = new google.maps.Marker({
			position: getLatLng(prop.geoLatitude, prop.geoLongitude),
			map: map,
			id: 'property_marker_' + prop.id,
			icon: 'img/markers/property.png',
		});
		
		var infoWindow = new google.maps.InfoWindow({
			content: prop.name
		});
		
		marker.addListener('click', function() {
			infoWindow.open(map, marker);
		});
		
		propertyMarkers.push(marker);
	};
	
	var setMapOnAllProperties = function(map) {
		$.each(propertyMarkers, function (k, v) {
			v.setMap(map);
		});
	};
	
	var clearPropertyMarkers = function() {
		setMapOnAllProperties(null);
	};
	
	var showPropertyMarkers = function() {
		setMapOnAllProperties(map);
	};
	
	function deletePropertyMarkers() {
		clearPropertyMarkers();
		propertyMarkers = [];
	};
	
    // * * * * * * * * * * * * * * *
	// URL param
	// * * * * * * * * * * * * * * *
	var getURLParameter = function (sParam)
	{
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) 
		{
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) 
			{
				return sParameterName[1];
			}
		}
	};
	//gets the url parameter that is sent from the property detail iframe
	var propId = getURLParameter("propID");
	if(typeof propId !== "undefined") {
		console.log("map main params:"+"lat="+getURLParameter("lat") +"lang="+getURLParameter("lang"));
		var prop = {geoLatitude:getURLParameter("lat"), geoLongitude:getURLParameter("lang"), id:propId};
		$("#header").remove();
		$("#map").css("top",0);
		$("#map").css("height","100%");
		
		addPropertyMarker(prop);
		map.set("center", new google.maps.LatLng(prop.geoLatitude, prop.geoLongitude));
	}
	
	// * * * * * * * * * * * * * * *
	// Places
	// * * * * * * * * * * * * * * *
	
	function markPlaceType(type) {
		
		var serviceTypes = [];
		switch(type) {
			case "food":
			serviceTypes = ["convenience_store", "department_store", "food", "grocery_or_supermarket", "home_goods_store", "meal_delivery", "meal_takeaway", "restaurant", "store"];
			break;
			
			case "bakery":
			serviceTypes = ["bakery"];
			break;
			
			case "school":
			serviceTypes = ["school"];
			break;
			
			case "doctor":
			serviceTypes = ["dentist", "doctor", "health", "hospital", "pharmacy", "physiotherapist", "veterinary_care"];
			break;
			
			case "transport":
			serviceTypes = ["bus_station", "subway_station", "taxi_stand", "train_station"];
			break;
			
			case "kinder":
			break;
		};
		
		var centerLocation = map.getCenter();
		
		var request = {
			location: centerLocation,
			radius: 10000,
			types: serviceTypes
		};
		
		placesService.nearbySearch(request, function(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				$.each(results, function (k, v){
					var marker = new google.maps.Marker({
						map: map,
						position: v.geometry.location,
						icon: 'img/markers/'+type+'.png',
						type: type
					});
					
					var infoWindow = new google.maps.InfoWindow({
						content: "<p>" + v.name + "</p>"
					});
					
					marker.addListener('click', function() {
						infoWindow.open(map, marker);
					});
					
					placeMarkers.push(marker);
				});
			};
		});	
	};
	
	function showPlaceMarkerType(type) {
		$.each(placeMarkers, function (k, v) {
			if (v.type == type) {
				v.setMap(map);
			};
		});
	};
	
	function deletePlaceMarkerType(type) {
		for (var i = placeMarkers.length - 1; i >= 0; i--) {
			var place = placeMarkers[i];
			
			if (place.type == type) {
				place.setMap(null);
				placeMarkers.splice(i, 1);
			};
		};
	};
	
	// * * * * * * * * * * * * * * *
	// End Functions
	// * * * * * * * * * * * * * * *
	
	var bounds = google.maps.event.addListener(map, 'idle', function(e) {
		var bounds = map.getBounds();
		var latSW = bounds.getSouthWest().lat();
		var lonSW = bounds.getSouthWest().lng();
		var latNE = bounds.getNorthEast().lat();
		var lonNE = bounds.getNorthEast().lng();
		
		$.ajax({
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			method: "POST",
			url: ajax+'properties/viewport',
			data: JSON.stringify({
				"latitudeSW": latSW,
				"longitudeSW": lonSW,
				"latitudeNE": latNE,
				"longitudeNE": lonNE
			}),
			success: function(data){
				$.each(data, function (k, v) {
					addPropertyMarker(v);
				});
			},
			error: function(){ console.log('Error on properties/viewport'); }
		});
	});
	
	$('.usercp').on('click', function(e){
		e.stopPropagation();
		$('.user_navbar').slideToggle();
	});
	
	$('#password').val('');
	
	$('#register-form, #login_form').validate({
        errorElement: 'div', //default input error message container
        errorClass: 'red', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: ""
	});
	
	$('.close').on('click', function(){
		$('.widget').fadeOut();
	});
	
	$('#login_form').on('submit',function(e){
		e.preventDefault();
		$('#login_form input[type=text],#login_form input[type=password]').css('border','1px solid transparent');
		$.ajax({
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			method: "POST",
			url: ajax+'login',
			data: JSON.stringify({
				'email': $('#login_form .name').val(),
				'password': $('#login_form .password').val()
			}),
			success: function(data){
				$('.signin').fadeOut().promise().done( function(){
					if (typeof data.id !== 'undefined') iduser = data.id;
					if (typeof data.email !== 'undefined') emailuser = data.email;
					if (typeof data.email !== 'undefined') $('.usercp .name').text(data.email); //replace with name
					if (typeof data.image !== 'undefined') $('.usercp .avatar img').attr('src', data.image); else $('.usercp .avatar img').attr('src', 'img/avatar/no-image.png');
					$('.usercp').fadeIn();
				});	
			},
			error: function(){
				$('#login_form input[type=text],#login_form input[type=password]').css('border','1px solid red');
			}
		});
		
	});
	
	$('.user_navbar li').on('click', function(){
		var action = $(this).attr('rel');
		switch(action){
			case 'logout':
			$('.widget').fadeOut();
			$('.signin .name,.signin .password').val('');
			$('.usercp').fadeOut().promise().done( function(){
				$('.signin').fadeIn();
			});
			break;
			case 'user_profile':
			$.ajax({
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				method: "GET",
				url: ajax+'/users/'+iduser,
				success: function(data){
					$('.widget').fadeOut().promise().done( function(){
						$('.'+action+' .name,.'+action+' .email.'+action+' .date-of-birth').html('');
						if (typeof data.name !== 'undefined') $('.'+action+' .name').text(data.name);
						if (typeof data.email !== 'undefined') $('.'+action+' .email').text(data.email);
						if (typeof data.dateOfBirth !== 'undefined') $('.'+action+' .date-of-birth').text(data.dateOfBirth);
						if (typeof data.image !== 'undefined') $('.'+action+' .image img').attr('src', data.image); else $('.'+action+' .image img').attr('src', 'img/avatar/no-image.png');
						$.ajax({
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							method: "GET",
							url: ajax+'properties/user/'+iduser,
							success: function(data){
								var properties = '';
								$.each(data, function (k, v) {
									properties += '<li rel="';
									if (typeof v.id !== 'undefined') properties += v.id;
									properties += '">';
									if (typeof v.name !== 'undefined') properties += v.name;
									properties += '</li>';
								});
								$('.property_list').html(properties);
								$('.'+action).fadeIn();
							},
							error: function(){}
						});
					});	
				},
				error: function(){}
			});
			break;
			default:
			$('.widget').fadeOut().promise().done( function(){
				$('#new_property input[type="text"]').val('');
				$('.'+action).fadeIn();
			});
			break;
		}
	});
	
	$('body').on('click', '.property_list li', function(){
		property = $(this).attr('rel');
		$('.widget').fadeOut().promise().done( function(){
			$.ajax({
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				method: "GET",
				url: ajax+'properties/'+property,
				success: function(data){
					//Fill in property details
					$('.property .name,.property .description,.property .address,.property .geoLatitude,.property .geoLongitude,.property .area').html('');
					if (typeof data.name !== 'undefined') $('.property .name').text(data.name);
					if (typeof data.description !== 'undefined') $('.property .description').text(data.description);
					if (typeof data.address !== 'undefined') $('.property .address').text(data.address);
					if (typeof data.geoLatitude !== 'undefined') $('.property .geoLatitude').text(data.geoLatitude);
					if (typeof data.geoLongitude !== 'undefined') $('.property .geoLongitude').text(data.geoLongitude);
					if (typeof data.area !== 'undefined') $('.property .area').text(data.area);
					$('.property').fadeIn();
					
					//Center map on property
					map.setZoom(19);
					map.setCenter(new google.maps.LatLng(data.geoLatitude, data.geoLongitude));
				},
				error: function(){
					console.log('Error on property/{id}');
				}
			});
			
		});
	});
	
	$('body').on('submit', '#new_property', function(e){
		e.preventDefault();
		$.ajax({
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			method: "POST",
			url: ajax+'properties',
			data: JSON.stringify({
				'name': $('#new_property .name').val(),
				'description': $('#new_property .description').val(),
				'address': $('#new_property .address').val(),
				'geoLatitude': $('#new_property .geoLatitude').val(),
				'geoLongitude': $('#new_property .geoLongitude').val(),
				'user': {
					'id': iduser,
					'email': emailuser
				},
				'monthlyRent': $('#new_property .monthly-rent').val(),
				'numBedrooms': $('#new_property .num-bedrooms').val(),
				'numBathrooms': $('#new_property .num-bathrooms').val(),
				'area': $('#new_property .area').val(),
			}),
			success: function(data){
				$('.user_navbar [rel="user_profile"]').trigger('click');
				var markerId = 'new_property';
				var marker = markers[markerId]; // find marker
				removeMarker(marker, markerId); // remove it
				addPropertyMarker(data);
			},
			error: function(){}
		});
	});
	
	$('.user_navbar [rel="user_profile"]').click(function(event){
		event.stopPropagation();    
	});
	
	
	$('.services li .img').click(function(event) {
		var serviceType = $(this).attr("rel");
		
		if ($(this).hasClass("active")) {
			deletePlaceMarkerType(serviceType);
			} else {
			markPlaceType(serviceType);
		};
		
		$(this).toggleClass("active");
	});
});



