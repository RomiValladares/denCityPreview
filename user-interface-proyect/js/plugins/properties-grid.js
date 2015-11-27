// jQuery Plugin Boilerplate
// A boilerplate for kick-starting jQuery plugins development
// version 1.3, May 07th, 2011
// by Stefan Gabos
// with help from Roger Padilla, Shinya, JohannC, Steven Black, Rob Lifford

(function($) {

    $.fn.propertiesGrid = function(method) {

        var methods = {

            init : function(options) {
                this.propertiesGrid.settings = $.extend({}, this.propertiesGrid.defaults, options);
				this.propertiesGrid.settings.id = $(this).attr("id");
                return this.each(function() {
                    var $element = $(this), // reference to the jQuery version of the current DOM element
                         element = this;      // reference to the actual DOM element
                    // code goes here
                });

            },

            setProperties: function(properties) {
				this.propertiesGrid.defaults.properties = properties;
				helpers.drawAllProperties(this.propertiesGrid.settings.id, properties);
            }

        }

        var helpers = {
            drawAllProperties: function(id, properties) {
                var grid = "";
				
				$.each(properties, function( index, value ) {
					grid += helpers.getPropertyHtml(value);
				});
				
				$("#"+id).html(grid);
            },
			getPropertyHtml: function(property) {
				$("#property-template").find(".property-name").text(property.title);
				$("#property-template").find(".property-price").text(property.price);
				
				if(property.isPopular)
					$("#property-template").find(".ribbon").show();
				else
					$("#property-template").find(".ribbon").hide();
					
				return $("#property-template").html();
			}
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in propertiesGrid plugin!');
        }

    }

    $.fn.propertiesGrid.defaults = {
        properties: [],
		id:	""
    }

    $.fn.propertiesGrid.settings = {}

})(jQuery);