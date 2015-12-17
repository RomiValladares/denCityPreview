/* file for the property-search page */
$(document).ready(function () {
  $("#properties-grid").propertiesGrid();
  $("#properties-grid").propertiesGrid("setProperties", [{
    title: "Propiedad en Pocitos, tercer piso",
    price: "$ 25000",
  }, {
    title: "Apartamento Piso Alto, Kitchennete, Centro",
    price: "$ 16000",
    isPopular: true
  }, {
    title: "Casa Av. Italia",
    price: "$ 9000"
  }, {
    title: "Propiedad en Pocitos, tercer piso",
    price: "$ 25000",
  }, {
    title: "Apartamento Piso Alto, Kitchennete, Centro",
    price: "$ 16000",
    isPopular: true
  }, {
    title: "Casa Av. Italia",
    price: "$ 9000"
  }, {
    title: "Propiedad en Pocitos, tercer piso",
    price: "$ 25000",
  }, {
    title: "Apartamento Piso Alto, Kitchennete, Centro",
    price: "$ 16000",
    isPopular: true
  }, {
    title: "Casa Av. Italia",
    price: "$ 9000"
  }]);
  getLocations();

  //adds a toggable button
  $(".panel-heading.collapsible").collapsiblePanel();
  $(".panel-heading.collapsible").collapsiblePanel("draw");

  $("#btn-search-properties").click(function () {
    getProperties();
  });

  $("#panel-tag-divider").hide();
  $("#hidden-filter-tags-input").tagsManager({
    tagClass: "tm-tag-success"
  });

  //numeric only for price range
  $("#input-from-price").jStepper({
    minValue: 0,
    maxValue: 10000000,
    minLength: 0
  });
  $("#input-to-price").jStepper({
    minValue: 0,
    maxValue: 10000000,
    minLength: 0
  });
  //numeric only for room quantity
  $("#input-room-quantity").jStepper({
    minValue: 0,
    maxValue: 20,
    minLength: 0
  });

  $("#menu-rooms li a").click(function () {
    $(this).parents(".input-group-btn").find('.selection').text($(this).text());
    $(this).parents(".input-group-btn").find('.selection').val($(this).text());
  });
});

//PROPERTIES
function getProperties() {
  var filters = getPropertySearchFilters();
  displayPropertySearchFilters(filters);



  $.blockUI({
    message: "cargando..."
  });
  setTimeout(function () {
    $.unblockUI();
  }, 2000);
}

//PROPERTIES FILTERS
function getPropertySearchFilters() {
  var locations = getSelectedLocations();
  var priceRange = getPriceRange();
  var conditions = getConditions();

  return {
    locations: locations,
    priceRange: priceRange,
    conditions: conditions
  };
}

function displayPropertySearchFilters(filters) {
  var showTagDivider = false;
  $.each(filters, function (prop, value) {
    if (value != null) {
      showTagDivider = true;
      if (value.constructor === Array) {
        $.each(value, function (i, val) {
          $("#hidden-filter-tags-input").tagsManager('pushTag', val.name);

        });
      } else {
        //TODO improve this
        switch (prop) {
        case "priceRange":
          if (value.fromPrice != "") $("#hidden-filter-tags-input").tagsManager('pushTag', "De: " + value.fromPrice);
          if (value.toPrice != "") $("#hidden-filter-tags-input").tagsManager('pushTag', "A: " + value.toPrice);
          showTagDivider = value.fromPrice != "" || value.toPrice != "";
          break;
        default:
          break;
        }
      }
    }
  });
  $("#div-filter-tags .tm-tag").addClass("col-md-12");
  $("#div-filter-tags .tm-tag-remove").addClass("pull-right");

  showTagDivider ? $("#panel-tag-divider").show() : $("#panel-tag-divider").hide();
}

//CONDITIONS
function getConditions() {
  var selected = [];
  $('#div-condition-checkboxes input:checked').each(function () {
    selected.push({
      name: $(this).data('name'),
      code: $(this).data('code')
    });
  });

  return selected;
}

//LOCATIONS

function getLocations() {
  var locations = [{
    name: 'Aguada',
    code: '1'
  }, {
    name: 'Atahualpa',
    code: '2'
  }, {
    name: 'B. De Carrasco',
    code: '3'
  }, {
    name: 'Bella Vista',
    code: '4'
  }, {
    name: 'Brazo Oriental',
    code: '5'
  }, {
    name: 'Buceo',
    code: '6'
  }, {
    name: 'Carrasco',
    code: '7'
  }, {
    name: 'Carrasco Norte',
    code: '8'
  }, {
    name: 'Centro',
    code: '9'
  }, {
    name: 'Cerrito',
    code: '10'
  }, {
    name: 'Cerro',
    code: '11'
  }, {
    name: 'Ciudad Vieja',
    code: '12'
  }, {
    name: 'Cno. Carrasco',
    code: '13'
  }, {
    name: 'Cno. Maldonado',
    code: '14'
  }, {
    name: 'Colon',
    code: '15'
  }, {
    name: 'Cordon',
    code: '16'
  }, {
    name: 'Goes',
    code: '17'
  }, {
    name: 'Jacinto Vera',
    code: '18'
  }, {
    name: 'La Blanqueada',
    code: '19'
  }, {
    name: 'La Comercial',
    code: '20'
  }, {
    name: 'La Teja',
    code: '21'
  }, {
    name: 'Las Acacias',
    code: '22'
  }, {
    name: 'Lezica',
    code: '23'
  }, {
    name: 'Malvin',
    code: '24'
  }, {
    name: 'Malvin Norte',
    code: '25'
  }, {
    name: 'Maroñas',
    code: '26'
  }, {
    name: 'Maroñas Curva',
    code: '27'
  }, {
    name: 'Más opciones',
    code: '28'
  }, {
    name: 'Nuevo Paris',
    code: '29'
  }, {
    name: 'Palermo',
    code: '30'
  }, {
    name: 'Parque Batlle',
    code: '31'
  }, {
    name: 'Parque Rodo',
    code: '32'
  }, {
    name: 'Peñarol',
    code: '33'
  }, {
    name: 'Piedras Blancas',
    code: '34'
  }, {
    name: 'Pocitos',
    code: '35'
  }, {
    name: 'Pocitos Nuevo',
    code: '36'
  }, {
    name: 'Prado',
    code: '37'
  }, {
    name: 'Punta Carretas',
    code: '38'
  }, {
    name: 'Punta Gorda',
    code: '39'
  }, {
    name: 'Punta Rieles',
    code: '40'
  }, {
    name: 'Reducto',
    code: '41'
  }, {
    name: 'Sayago',
    code: '42'
  }, {
    name: 'Tres Cruces',
    code: '43'
  }, {
    name: 'Union',
    code: '44'
  }, {
    name: 'Villa Biarritz',
    code: '45'
  }, {
    name: 'Villa Española',
    code: '46'
  }, ]

  //this goes inside ajax success
  $("#location-list").html(buildLocationsHtml(locations));
  $('#location-list').btsListFilter('#location-input', {
    itemChild: 'span',
    cancelNode: false
  });
  $('#location-list a').unbind("click").click(function () {
    if (!$(this).hasClass('active')) {
      $("#location-selected").val($("#location-selected").val() + $(this).find('span').text() + ", ");
    } else {
      var finalText = $('#location-selected').val().replace(($(this).find('span').text() + ", "), "");
      $('#location-selected').val(finalText);
    }
    $(this).toggleClass("active");
  });
}
//
function buildLocationsHtml(locations) {
  var html = '';

  $.each(locations, function (i, val) {
    html += '<a data-code="' + val.code + '" class="list-group-item"><span>' + val.name + '</span></a>';
  });
  return html;
}


//LOCATION FILTER
function getSelectedLocations() {
  var selectedElems = $("#location-list a.active");
  var selectedLocations = [];
  $.each($(selectedElems), function (i, val) {
    selectedLocations.push({
      code: $(val).data("code"),
      name: $(val).children("span").text()
    });
  });
  return selectedLocations;
}

//PRICE RANGE FILTER
function getPriceRange() {
  var fromPrice = $("#input-from-price").val();
  var toPrice = $("#input-to-price").val();

  return {
    fromPrice: fromPrice,
    toPrice: toPrice
  };
}