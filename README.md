# jQuery Boilerplate [![Build Status](https://github.com/colinbrogan/bigFastShopifyFilter.git)](https://github.com/colinbrogan/bigFastShopifyFilter.git) ![Bower Version](https://github.com/colinbrogan/bigFastShopifyFilter.git)

### You want a good filtering system for Shopify

The current filtering solutions for a amazon-style list of product attributes is difficult if impossible to come by. The technical term for this is a faceted search. This plugin is a solution for filtering key value pairs, defined  by tags or metafields. That's right, you've defined your custom metafield data for your products, now you can expose them as filterable options on your collection page. It can support massive numbers of products, and is fast! Even better, your clients can specify which tags or metafields to filter by.


## Usage

There is a little bit of setup, but follow the directions below closely, and you will be ready to go:

1. Drop our liquid files in your theme:

	Add "collection.ajaxy.liquid" to your `shop/templates` directory

	Add "ajax-the-collection.liquid" to your `shop/snippets` directory

	(*** optional ***)
	If you want your client to adjust the settings of this plugin in the theme:

	Add the contents of "settings.html" to the end of your theme's `shop/config/settings.html`, or overwrite it 	directly to start from scratch

2. Add our javascript to your theme:

	Add "dist/shopify.pipeInCollection.min.js" to `shop/assets`

	Add "dist/jquery.big-fast-shopify-filter.js" to `shop/assets`

2. Include the javascript at the bottom of your collection page, after the jquery include

	```html
	<script src="{% 'Shopify.pipeInCollection.js' | asset_url %}" />

	<script src="{% 'jquery.big-fast-shopify-filter.min.js' | asset_url %}" />
	```

3. Call the plugin:

	```ht
	$("#").defaultPluginName({
		propertyName: "a custom value"
	});
	```
4. Include the markup in your collection page

	```html
	<div id="big-fast-shopify-filter" data-collection="{{ collection.handle }}">
		<!-- include this wherever you want your options to list out -->
	    <div id="options-go-here"></div>

	     <!-- 
	     	this is your product-grid, the data-fast-start attribute gives the plugin an immediate load of products to filter, so you don't have to wait on the first ajax call to display products
	     -->
		    <ul class="product-grid" data-fast-start='{% include "ajax-the-collection" %}'>

		    <!-- if you want your products to list when js is disabled in their browser, add the noscript wrapper on your liquid, it will be taken over and replaced by the plugin when js is enabled -->
		      <noscript>
		        {% for product in collection.products %}
					<li>
					<!-- your product liquid here
		            </li>
		        {% endfor %}
		        </noscript>
		    </ul>
	</div>
	```

	You can include other markup as your theme sees fit, but essentially you need a wrapper with the id "big-fast-shopify-filter" and a data-collection attribute, and an element with an id of "options-go-here" somewhere inside that wrapper, along with the "ul.product-grid" list



#### [demo/](https://github.com/jquery-boilerplate/boilerplate/tree/master/demo)

Contains a simple HTML file to demonstrate your plugin.

## Team

This plugin is built by Colin Brogan

[![Colin Brogan](http://github.com/colinbrogan/)](http://cbrogan.info) 


## License

[MIT License](http://zenorocha.mit-license.org/) © Colin Brogan