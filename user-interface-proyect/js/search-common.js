/* file for common stuff for every search */
$( document ).ready(function() {
	$("#hidden-tags-input").tagsManager().tagsManager('pushTag','Inmuebles');
	$("#hidden-tags-input").tagsManager().tagsManager('pushTag','Alquiler');
	$("#div-static-tags .tm-tag").addClass("col-md-12");
	$("#dynamic-tags-input").tagsManager({tagClass:"tm-tag-info", tagsContainer: "#dynamic-tags-container"});
	testAjax();
   //buildCategoriesMenu();
});

function testAjax() {
	var obj = {value:800, curency:{id:2, symbol:'c', name:'peso'}};
	  $.ajax({
        type: "POST",
        url: "http://localhost:8080/dencity/api/users/getSomethingWithFilterModel",
        data: obj,
        contentType: "application/json",
        dataType: "json",
        success: function(data){
			console.log(data);
		},
        failure: function(errMsg) {
            console.log(errMsg);
        },
		error: function(jqXHR,  textStatus,  errorThrown ) {
            console.log(jqXHR +  textStatus + errorThrown);
        }
  });
}

//
function buildCategoriesMenu() {
	var categories = getMenuCategories();
	
	var categoriesHtml = buildCategoriesMenuHtml(categories);
	
	$("#categories-menu").html(categoriesHtml);
}

function buildCategoriesMenuHtml(categories) {
	if (categories == null || categories.length == 0)
		return "";
	var html = "";
	
	$.each(categories, function( i, category ) {
		html += buildCategoryHtml(category);
	});
	
	return html;
}

function buildCategoryHtml(category) {
	if(!category) return "";
	
	var html = '<li>';
	html += '<a href="'+ (category.href ? category.href : '#') +'">' + category.name;
	if(category.totalItems) html+= '<span class="badge pull-right">'+ category.totalItems + '</span>';
	html += '</a>';
	
	//child categories
		if (category.subCategories != null || category.subCategories.length > 0){
			html += '<ul>';
			$.each(category.subCategories, function( i, category ) {
				html += buildCategoryHtml(category);
			});
				html += '</ul>';
		}
	
	return html += '</li>';
}

//calls the web service for getting menu categories
//TODO
function getMenuCategories() {
	//$.ajax...
	var categories = [	{name: "Productos",
						subCategories: []
						},
						{name: "Inmuebles",
						subCategories: [{name: "Alquiler",
						subCategories: []
						}, {name: "Venta",
						subCategories: []
						}, {name: "Alquiler Temporal",
						subCategories: []
						}]
						}
					];
	
	return categories;
}