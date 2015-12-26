var taggd;
/* file for the property-search page */
$(document).ready(function() {
	$("#hidden-property-tags-input").tagsManager({
		tagClass: "tm-tag-info"
	});
	$("#hidden-property-tags-input").tagsManager('pushTag', 'Amplio');
	$("#hidden-property-tags-input").tagsManager('pushTag', 'Luminoso');
	
	$("#hidden-main-photo-tags-input").tagsManager({
		tagClass: "tm-tag-success"
	});
	$("#hidden-main-photo-tags-input").tagsManager('pushTag', 'Comedor');
	$("#hidden-main-photo-tags-input").tagsManager('pushTag', 'Ventana');
	$("#hidden-main-photo-tags-input").tagsManager('pushTag', 'Vista al mar');
	
	$(".imgLiquidFill").imgLiquid({
		fill: true
	});
	//setSwitchImageCallback(switchImageCallback);
	var iframeSrc = "../context-module-web/index.html?propID=55";
	iframeSrc += "&lat="+-34.887689+"&lang="+-56.148128;
	
	$('<iframe>', {
		src: iframeSrc,
		id:  'map-iframe',
		frameborder: 0,
		scrolling: 'no'
	}).appendTo('#map-iframe-container');
	
	
	$('#map-iframe').attr("src", iframeSrc);
	taggd = $('#mainImage>img').taggd({
		
		align: {
			x: 'center',
			y: 'center'
		}
		},[{
			x: 0.512,
			y: 0.33,
			text: 'Huey'
		}]);
		
		
});

var switchImageCallback = function() {
	taggd.clear();
	loadPhotoTags();
	$("#mainImage").addClass("imgLiquidFill imgLiquid");
	$("#mainImage").imgLiquid({
		fill: true
	});
}

function loadPhotoTags() {
	//TODO hardcoded
	var img = $("#mainImage img").attr("src");
	$("#hidden-main-photo-tags-input").tagsManager("empty");
	
	if (img.indexOf("1") >= 0) {
		$("#hidden-main-photo-tags-input").tagsManager('pushTag', 'Comedor');
		$("#hidden-main-photo-tags-input").tagsManager('pushTag', 'Ventana');
		$("#hidden-main-photo-tags-input").tagsManager('pushTag', 'Vista al mar');
		
		taggd.setData([{
			x: 0.512,
			y: 0.33,
			text: "asdas"
		}]);
		} else if (img.indexOf("2") >= 0) {
		$("#hidden-main-photo-tags-input").tagsManager('pushTag', 'Baño');
		$("#hidden-main-photo-tags-input").tagsManager('pushTag', 'Ventana');
	} else {}
}
