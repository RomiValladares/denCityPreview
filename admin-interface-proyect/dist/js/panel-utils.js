// jQuery Plugin Boilerplate
// A boilerplate for kick-starting jQuery plugins development
// version 1.3, May 07th, 2011
// by Stefan Gabos
// with help from Roger Padilla, Shinya, JohannC, Steven Black, Rob Lifford

(function($) {
	
    $.fn.panelUtils = function(method) {
		
        var methods = {
			
            init : function(options) {
                this.panelUtils.settings = $.extend({}, this.panelUtils.defaults, options);
				this.panelUtils.settings.id = $(this).attr("id");
				if(options !=null && options.type !=null){
					helpers.drawPanel(this.panelUtils.settings.id, options.type, options.idPrefix);
				}
                return this.each(function() {
                    var $element = $(this), // reference to the jQuery version of the current DOM element
					element = this;      // reference to the actual DOM element
                    // code goes here
				});
				
			},
		}
		
        var helpers = {
            drawPanel: function(id, type, idPrefix) {
                var panel = "";
				
				switch(type) {
					case "date":
					panel = helpers.getDatePanel(idPrefix);
					break;
					default:
					panel = "";
				}
				
				$("#"+id).html(panel);
				
				//events
				switch(type) {
					case "date":
					helpers.setDatePanelEvents(idPrefix);
					break;
					default:
					break;
				}
				
			},
			
			//DATE PANEL
			getDatePanel:function(idPrefix){
				var $panel = $('<div>').addClass('panel-body');
				$container = $('<div>').addClass('container-fluid').appendTo($panel);
				//first row
				var $row = helpers.makeRow(idPrefix+"-input-from-time", "Desde"); 
				$row.appendTo($container);
				//second row
				$row = helpers.makeRow(idPrefix+"-input-to-time", "Hasta"); 
				$row.appendTo($container);
				//third row
				$row = $('<div>').addClass('row top-margin-row').append(helpers.makeButton(idPrefix+"-btn-search"));
				$row.appendTo($container);
				return $panel;
			},
			makeRow:function(inputId, label){
				var $row = $('<div>').addClass('row top-margin-row');
				//Desde/from label
				$('<div>').addClass('col-md-4').append("<label>"+label+":</label>").appendTo($row);
				//input TODO remove the hardcoded parts
				$('<div>').addClass('input-group date col-md-8').append('<input id="'+inputId+'" type="text" class="form-control"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>').appendTo($row);
				return $row;
			},
			makeButton:function(buttonId){
				return '<button id="'+buttonId+'" type="submit" class="btn btn-primary pull-right"> <span class="fa fa-search" aria-hidden="true"></span></button>';
			},
			
			//DATE PANEL EVENTS
			setDatePanelEvents:function(idPrefix){
				// default dates, today - 7 days
				var d = new Date();
				d.setDate(d.getDate() - 5);
				$("#"+idPrefix+"input-from-time").datepicker("setDate", d);
				$("#"+idPrefix+"input-to-time").datepicker("setDate", new Date());

			}
		}
		
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
			} else {
            $.error( 'Method "' +  method + '" does not exist in panelUtils plugin!');
		}
		
	}
	
    $.fn.panelUtils.defaults = {
        type: "",
		id:	""
	}
	
    $.fn.panelUtils.settings = {}
	
})(jQuery);