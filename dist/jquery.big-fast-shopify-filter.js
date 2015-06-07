/*
 *  jquery-bigFastShopifyFilter - vv0.0.1
 *  Designed to sort and filter products using key value pairs in tags and metafields. Performs much faster on massive collections, and includes infinite scroll pagination
 *  http://colinbrogan.info/dev/big-fast-shopify-filter
 *
 *  Made by Colin Brogan
 *  Under MIT License
 */
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
					filter_criteria: null,
					collection_handle: null,
					paginate: 20,
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


						if($(this.element).data("collection") !== undefined) {
							this.setCollectionHandle($(this.element).data("collection"));
						} else {
							return false;
						}
						/*** Retrieve data attached to instance and act appropriately */
						var fastStart = $(this.element).find("ul.product-grid").data("fast-start");
						if(fastStart !== undefined) {
							var load = fastStart;
							this.storeAllReceived(load);
						}
						/****** custom events go here ******/
						var thePrototypeExtension = this;
						$(this.element).on("loadReceived",function(event,load) {
							console.log("loadReceived");
							thePrototypeExtension.storeAllReceived(load);
							thePrototypeExtension.filter();
						});
						
				},
				/********** instance variables  ****************/
				filtered: {},
				allReceived: {},
				displayEndIndex: 0,
				collection_handle: null,
				filter_criteria: null,
				load_complete: false,
				/********** public Methods ***************/
				go: function(params) {
					console.log("go fired");
					console.log(this.collection_handle);
					this.filter_criteria = params;
					var $theElement = $(this.element);
					this.filter();
					if(this.load_complete === false) {
						var doWithEachLoad = function(load) {
							$theElement.trigger("loadReceived",load);
						};
						Shopify.Mazer.pipeInCollection.go(this.collection_handle,doWithEachLoad);
					} else {
					}
				},
				filter: function() {
					console.log("filter fired");
					/* loop through every product of this collection */
					for(var handle in this.allReceived) {
						/* leave determines whether or not a product matches all parameters and should be displayed, it begins as true. The idea being, if any current sort parameter doesn't match to the product, the product is discarded. This seems to me be the fastest means of narrowing down a listing */
						var toFiltered = true;
						/* check every url filter criteria passed */
						for(var criteria in this.filter_criteria) {
							var current_criteria_value = decodeURIComponent(this.filter_criteria[criteria]);
							if(this.settings.metafields.hasOwnProperty(criteria)) {
								for(var metafield in this.allReceived[handle].metafields) {
									var current_metafield_value = this.allReceived[handle].metafields[metafield];
									if(metafield === criteria) {
										if(current_metafield_value === current_criteria_value) {
											/* do nothing */
										} else {
											toFiltered = false;
										}
									}
								}
								
							} else if(this.settings.tagfields.hasOwnProperty(criteria)) {
								for (var tag in this.allReceived[handle].info.tags) {
									var tagPreValue = this.allReceived[handle].info.tags[tag];
									if (tagPreValue.indexOf("kvp:"+criteria) === 0) {
										var splitFields = tagPreValue.split(":");
										var field_name = splitFields[1];
										var field_value = splitFields[2];
										if(field_name === criteria) {
											if(current_criteria_value === field_value) {
												/* do nothing */
											} else {
												toFiltered = false;
											}
										}

									}
								}
							}
						}
						if(toFiltered) {
							this.filtered[handle] = this.allReceived[handle];
						}
						
					}
					console.log("filtered");
					console.log(this.filtered);
					trickleToGrid();
				},
				ceaseAll: function() {

				},
				storeAllReceived: function(load) {
					if(this.allReceived == null) {
						this.allReceived = {};
					}
					for (var handle in load.products) {
						this.allReceived[handle] = load.products[handle];
					}
				},
				getAllReceived: function() {
					return this.allReceived;
				},
				trickleToGrid: function(load) {
					for(var product in load.products) {
						renderTemplate(load.products[product]);
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
				setCollectionHandle: function(collection_handle) {
					this.collection_handle = collection_handle;
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
