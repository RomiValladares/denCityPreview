// jQuery Plugin Boilerplate
// A boilerplate for kick-starting jQuery plugins development
// version 1.3, May 07th, 2011
// by Stefan Gabos
// with help from Roger Padilla, Shinya, JohannC, Steven Black, Rob Lifford

(function($) {

    $.fn.collapsiblePanel = function(method) {

        var methods = {

            init : function(options) {
                this.collapsiblePanel.settings = $.extend({}, this.collapsiblePanel.defaults, options);
				this.collapsiblePanel.settings.selector = $(this).selector;

                return this.each(function() {
                    var $element = $(this), // reference to the jQuery version of the current DOM element
                         element = this;      // reference to the actual DOM element
                    // code goes here
                });

            },
			
			draw: function() {
					helpers.draw(this.collapsiblePanel.settings.selector);
			}

        }

        var helpers = {
			draw: function(selector) {
				$.each($(selector), function( index, value ) {
					$(this).addClass('clearfix');
					helpers.drawIcon($(this));
					$(this).next(".panel-body").hide();
				});
            },
            drawIcon: function(elem) {
                var icon = '<button class="btn btn-xs btn-default pull-right btn-toggle-collapse"><i class="fa fa-chevron-down"></i></button>';
				$(elem).find("h3").append(icon);
				$(elem).find(".btn-toggle-collapse").first().click(function(){
					var i = $(this).find("i");
					$(this).find("i").toggleClass("fa-chevron-down fa-chevron-up");
					if($(this).parents(".panel-heading").next(".panel-body").is(":visible")) {
						$(this).parents(".panel-heading").next(".panel-body").hide();
					}else {
						$(this).parents(".panel-heading").next(".panel-body").show();
					}
				});
            }
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in collapsiblePanel plugin!');
        }

    }

    $.fn.collapsiblePanel.defaults = {
        properties: [],
		id:	""
    }

    $.fn.collapsiblePanel.settings = {}

})(jQuery);