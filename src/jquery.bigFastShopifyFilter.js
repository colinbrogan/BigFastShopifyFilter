// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "bigFastShopifyFilter",
				defaults =  {
					key_value_overrides: null,
					metafields: null,
					tagfields: null,
					price: {
							enable: true,
							ui_label: "Price",
							ui_component: "range-slider",
							placement: "sidebar",
							range_splits: 4
					},
					vendor: {
							enable: true,
							ui_component: "sidebar",
							placement: "sidebar",
							one_option_hide: true,
					},
					type: {
							enable: true,
							ui_component: "checkbox-button-group",
							placement: "sidebar",
							one_option_hide: true,
					},
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		/******* Private Member Variables go here *****/
		var privateInfo = null;

		/******* Private Methods go here ******/

		var somePrivateMethod = function(info) {
			privateInfo = info;
			console.log("somePrivateMethod fired with "+privateInfo);
		};

		var renderTemplate = function(data) {
			/**** process data here ****/

			return [
			"<div>",
			data.title,
			"</div>"
			].join();
		};

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.settings).
						console.log("xD");
						console.log("Defaults Are:");
						console.log(defaults);
						console.log(this.element);
				},
				/********** instance variables  ****************/
				filtered: null,
				allRetrieved: null,
				/********** public Methods ***************/
				filter: function(params) {
					for(var param in params) {
						console.log(param+":"+params[param]);
					}
					$(this.element).trigger("loadReceived");   
				},
				trickleToGrid: function(load) {
					for(var something in load) {
						renderTemplate(load[something]);
					}
					console.log(load);
					console.log("hello");
					somePrivateMethod(load);
					console.log("trickleToGrid set someInfo2 through private method to "+privateInfo);
				},
				refresh: function() {
					console.log("refresh");
					somePrivateMethod("refresh");
				},

				/********* Public Setters ****************/
				setSomeInfo: function(info) {
					this.someInfo = info;
					console.log("Set someInfo to "+this.someInfo);
				},


				/********* Public Getters ****************/
				getSomeInfo: function() {
					return this.someInfo;
				},

				/********** Public Getters of Private Info ***************/
				getPrivateInfo: function() {
					return privateInfo;
				}

		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				if(this.data("fast-start") !== undefined) {

				}
				/****** custom events go here ******/

				this.on("loadReceived",function() {
					console.log("loadReceived Fired");
				});

				var args = arguments;

		        // Is the first parameter an object (options), or was omitted,
		        // instantiate a new instance of the plugin.
		        if (options === undefined || typeof options === "object") {
		            return this.each(function () {

		                // Only allow the plugin to be instantiated once,
		                // so we check that the element has no plugin instantiation yet
		                if (!$.data(this, "plugin_" + pluginName)) {

		                    // if it has no instance, create a new one,
		                    // pass options to our plugin constructor,
		                    // and store the plugin instance
		                    // in the elements jQuery data object.
		                    $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
		                }
		            });

		        // If the first parameter is a string and it doesn"t start
		        // with an underscore or "contains" the `init`-function,
		        // treat this as a call to a public method.
		        } else if (typeof options === "string" && options[0] !== "_" && options !== "init") {

		            // Cache the method call
		            // to make it possible
		            // to return a value
		            var returns;

		            this.each(function () {
		                var instance = $.data(this, "plugin_" + pluginName);

		                // Tests that there"s already a plugin-instance
		                // and checks that the requested public method exists
		                if (instance instanceof Plugin && typeof instance[options] === "function") {

		                    // Call the method of our plugin instance,
		                    // and pass it the supplied arguments.
		                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
		                }

		                if (options === "destroy") {
		                  $.data(this, "plugin_" + pluginName, null);
		                }
		            });

		            // If the earlier cached method
		            // gives a value back return the value,
		            // otherwise return this to preserve chainability.
		            return returns !== undefined ? returns : this;
		        }
		};

})( jQuery, window, document );
