# jQuery BigFastShopifyFilter, v0.9.0

### You want a good filtering system for Shopify

The current filtering solutions for a amazon-style list of product attributes is difficult if impossible to come by in Shopify. The technical term for this is a faceted search. This plugin is a solution for filtering key value pairs, defined  by tags or metafields. That's right, you've defined your custom metafield data for your products, now you can expose them as filterable options on your collection page. It can support massive numbers of products, and is fast! Even better, your clients can specify which tags or metafields to filter by in their Theme's settings (look at src/settings.html).


## Usage

There is a little bit of setup, but follow the directions below closely, and you will be ready to go:

1. Drop our liquid files in your theme:

	Add "collection.ajaxy.liquid" to your `shop/templates` directory

	Add "ajax-the-collection.liquid" to your `shop/snippets` directory

	(*** optional ***)
	If you want your client to adjust the settings of this plugin in the theme:

	Add the contents of "settings.html" to the end of your theme's `shop/config/settings.html`, or overwrite it 	directly to start from scratch

2. Add the javascript to your theme:

	Add "dist/shopify.pipeInCollection.min.js" to `shop/assets`

	Add "dist/jquery.big-fast-shopify-filter.js" to `shop/assets`

2. Include the javascript at the bottom of your collection page, after the jquery include

	```html
	<script src="{% 'Shopify.pipeInCollection.js' | asset_url %}" />

	<script src="{% 'jquery.big-fast-shopify-filter.min.js' | asset_url %}" />
	```

3. Call the plugin with Theme settings configuration (skip to 3-2 if you simply want to place hard settings on your js page):

	```
<script>

$(document).ready(function() {
		// The following settings files dumps user generated settings from the current settings.html
		// file
	 	var settings = {
			filter_values: {
				{% if settings.custom_value_1_field_name != blank %}
					'{{ settings.custom_value_1_field_name }}': { 
						"{{ settings.custom_value_1_1_value }}": {
							image: "{{ 'custom_value_1_1_image.png' | asset_url }}",
							color: "{{ settings.custom_value_1_1_color }}",
							icon_code: "{{ settings.custom_value_1_1_icon_code }}",
							label: "{{ settings.custom_value_1_1_label }}"
						},
						"{{ settings.custom_value_1_2_value }}": {
							image: "{{ 'custom_value_1_2_image.png' | asset_url }}",
							color: "{{ settings.custom_value_1_2_color }}",
							icon_code: "{{ settings.custom_value_1_2_icon_code }}",
							label: "{{ settings.custom_value_1_2_label }}"

						},
						"{{ settings.custom_value_1_3_value }}": {
							image: "{{ 'custom_value_1_3_image.png' | asset_url }}",
							color: "{{ settings.custom_value_1_3_color }}",
							icon_code: "{{ settings.custom_value_1_3_icon_code }}",
							label: "{{ settings.custom_value_1_3_label }}"
						},
						"{{ settings.custom_value_1_4_value }}": {
							image: "{{ 'custom_value_1_4_image.png' | asset_url }}",
							color: "{{ settings.custom_value_1_4_color }}",
							icon_code: "{{ settings.custom_value_1_4_icon_code }}",
							label: "{{ settings.custom_value_1_4_label }}"

						},
						"{{ settings.custom_value_1_5_value }}": {
							image: "{{ 'custom_value_1_5_image.png' | asset_url }}",
							color: "{{ settings.custom_value_1_5_color }}",
							icon_code: "{{ settings.custom_value_1_5_icon_code }}",
							label: "{{ settings.custom_value_1_5_label }}"
						},
						"{{ settings.custom_value_1_6_value }}": {
							image: "{{ 'custom_value_1_6_image.png' | asset_url }}",
							color: "{{ settings.custom_value_1_6_color }}",
							icon_code: "{{ settings.custom_value_1_6_icon_code }}",
							label: "{{ settings.custom_value_1_6_label }}"

						},
						"{{ settings.custom_value_1_7_value }}": {
							image: "{{ 'custom_value_1_7_image.png' | asset_url }}",
							color: "{{ settings.custom_value_1_7_color }}",
							icon_code: "{{ settings.custom_value_1_7_icon_code }}",
							label: "{{ settings.custom_value_1_7_label }}"
						},
						"{{ settings.custom_value_1_8_value }}": {
							image: "{{ 'custom_value_1_8_image.png' | asset_url }}",
							color: "{{ settings.custom_value_1_8_color }}",
							icon_code: "{{ settings.custom_value_1_8_icon_code }}",
							label: "{{ settings.custom_value_1_8_label }}"
						},
						"{{ settings.custom_value_1_9_value }}": {
							image: "{{ 'custom_value_1_9_image.png' | asset_url }}",
							color: "{{ settings.custom_value_1_9_color }}",
							icon_code: "{{ settings.custom_value_1_9_icon_code }}",
							label: "{{ settings.custom_value_1_9_label }}"
						}
					},
				{% endif %}
				{% if settings.custom_value_2_field_name != blank %}
					'{{ settings.custom_value_2_field_name }}': { 
						"{{ settings.custom_value_2_1_value }}": {
							image: "{{ 'custom_value_2_1_image.png' | asset_url }}",
							color: "{{ settings.custom_value_2_1_color }}",
							icon_code: "{{ settings.custom_value_2_1_icon_code }}",
							label: "{{ settings.custom_value_2_1_label }}"

						},
						"{{ settings.custom_value_2_2_value }}": {
							image: "{{ 'custom_value_2_2_image.png' | asset_url }}",
							color: "{{ settings.custom_value_2_2_color }}",
							icon_code: "{{ settings.custom_value_2_2_icon_code }}",
							label: "{{ settings.custom_value_2_2_label }}"

						},
						"{{ settings.custom_value_2_3_value }}": {
							image: "{{ 'custom_value_2_3_image.png' | asset_url }}",
							color: "{{ settings.custom_value_2_3_color }}",
							icon_code: "{{ settings.custom_value_2_3_icon_code }}",
							label: "{{ settings.custom_value_2_3_label }}"

						},
						"{{ settings.custom_value_2_4_value }}": {
							image: "{{ settings.custom_value_2_4_image.png }}",
							color: "{{ settings.custom_value_2_4_color }}",
							icon_code: "{{ settings.custom_value_2_4_icon_code }}",
							label: "{{ settings.custom_value_2_4_label }}"

						},
						"{{ settings.custom_value_2_5_value }}": {
							image: "{{ settings.custom_value_2_5_image.png }}",
							color: "{{ settings.custom_value_2_5_color }}",
							icon_code: "{{ settings.custom_value_2_5_icon_code }}",
							label: "{{ settings.custom_value_2_5_label }}"

						},
					},
				{% endif %}
				{% if settings.custom_value_3_field_name != blank %}
					'{{ settings.custom_value_3_field_name }}': { 
						"{{ settings.custom_value_3_1_value }}": {
							image: "{{ settings.custom_value_3_1_image.png }}",
							color: "{{ settings.custom_value_3_1_color }}",
							icon_code: "{{ settings.custom_value_3_1_icon_code }}",
							label: "{{ settings.custom_value_3_1_label }}"

						},
						"{{ settings.custom_value_3_2_value }}": {
							image: "{{ settings.custom_value_3_2_image.png }}",
							color: "{{ settings.custom_value_3_2_color }}",
							icon_code: "{{ settings.custom_value_3_2_icon_code }}",
							label: "{{ settings.custom_value_3_2_label }}"

						},
						"{{ settings.custom_value_3_3_value }}": {
							image: "{{ settings.custom_value_3_3_image.png }}",
							color: "{{ settings.custom_value_3_3_color }}",
							icon_code: "{{ settings.custom_value_3_3_icon_code }}",
							label: "{{ settings.custom_value_3_3_label }}"

						},
						"{{ settings.custom_value_3_4_value }}": {
							image: "{{ settings.custom_value_3_4_image.png }}",
							color: "{{ settings.custom_value_3_4_color }}",
							icon_code: "{{ settings.custom_value_3_4_icon_code }}",
							label: "{{ settings.custom_value_3_4_label }}"

						},
						"{{ settings.custom_value_3_5_value }}": {
							image: "{{ settings.custom_value_3_5_image.png }}",
							color: "{{ settings.custom_value_3_5_color }}",
							icon_code: "{{ settings.custom_value_3_5_icon_code }}",
							label: "{{ settings.custom_value_3_5_label }}"

						},
					},			
				{% endif %}
			},
			metafields: {
				{% if settings.mf_option_1_filter_enable %}
					'{{ settings.mf_option_1_field_name }}': { 
						namespace: '{{ settings.mf_option_1_ns }}',
						ui_label: '{{ settings.mf_option_1_ui_label }}',
						ui_component: '{{ settings.mf_option_1_filter_ui_component }}',
						placement: '{{ settings.mf_option_1_filter_layout }}',
					},
				{% endif %}
				{% if settings.mf_option_2_filter_enable %}
					'{{ settings.mf_option_2_field_name }}': { 
						namespace: '{{ settings.mf_option_2_ns }}',
						ui_label: '{{ settings.mf_option_2_ui_label }}',
						ui_component: '{{ settings.mf_option_2_filter_ui_component }}',
						placement: '{{ settings.mf_option_2_filter_layout }}',
					},
				{% endif %}
				{% if settings.mf_option_3_filter_enable %}
					'{{ settings.mf_option_3_field_name }}': { 
						namespace: '{{ settings.mf_option_3_ns }}',
						ui_label: '{{ settings.mf_option_3_ui_label }}',
						ui_component: '{{ settings.mf_option_3_filter_ui_component }}',
						placement: '{{ settings.mf_option_3_filter_layout }}',
					},
				{% endif %}
				{% if settings.mf_option_4_filter_enable %}
					'{{ settings.mf_option_4_field_name }}': { 
						namespace: '{{ settings.mf_option_4_ns }}',
						ui_label: '{{ settings.mf_option_4_ui_label }}',
						ui_component: '{{ settings.mf_option_4_filter_ui_component }}',
						placement: '{{ settings.mf_option_4_filter_layout }}',
					},
				{% endif %}
				{% if settings.mf_option_5_filter_enable %}
					'{{ settings.mf_option_5_field_name }}': { 
						namespace: '{{ settings.mf_option_5_ns }}',
						ui_label: '{{ settings.mf_option_5_ui_label }}',
						ui_component: '{{ settings.mf_option_5_filter_ui_component }}',
						placement: '{{ settings.mf_option_5_filter_layout }}',
					},
				{% endif %}
				{% if settings.mf_option_6_filter_enable %}
					'{{ settings.mf_option_6_field_name }}': { 
						namespace: '{{ settings.mf_option_6_ns }}',
						ui_label: '{{ settings.mf_option_6_ui_label }}',
						ui_component: '{{ settings.mf_option_6_filter_ui_component }}',
						placement: '{{ settings.mf_option_6_filter_layout }}',
					},
				{% endif %}
				{% if settings.mf_option_7_filter_enable %}
					'{{ settings.mf_option_7_field_name }}': { 
						namespace: '{{ settings.mf_option_7_ns }}',
						ui_label: '{{ settings.mf_option_7_ui_label }}',
						ui_component: '{{ settings.mf_option_7_filter_ui_component }}',
						placement: '{{ settings.mf_option_7_filter_layout }}',
					},
				{% endif %}
				{% if settings.mf_option_8_filter_enable %}
					'{{ settings.mf_option_8_field_name }}': { 
						namespace: '{{ settings.mf_option_8_ns }}',
						ui_label: '{{ settings.mf_option_8_ui_label }}',
						ui_component: '{{ settings.mf_option_8_filter_ui_component }}',
						placement: '{{ settings.mf_option_8_filter_layout }}',
					},
				{% endif %}
			},
			price: {
				{% if settings.price_filter_enable %}
					enable: true,
					ui_label: '{{ settings.price_filter_ui_label }}',
					ui_component: '{{ settings.price_filter_ui_component }}',
					placement: '{{ settings.price_filter_layout }}',
					range_splits: {{ settings.price_filter_range_splits }}
				{% else %}
					enable: false
				{% endif %}
			},
			vendor: {
				{% if settings.vendor_filter_enable %}
					enable: true,
					ui_component: '{{ settings.vendor_filter_ui_component }}',
					placement: '{{ settings.vendor_filter_layout }}'
				{% else %}
					enable: false
				{% endif %}		
			},
			type: {
				{% if settings.type_filter_enable %}
					enable: true,
					ui_component: '{{ settings.type_filter_ui_component }}',
					placement: '{{ settings.type_filter_layout }}'
				{% else %}
					enable: false
				{% endif %}			
			},
			tagfields: {
				{% if settings.tag_option_1_filter_enable %}
					'{{ settings.tag_option_1_field_name }}': { 
						ui_label: '{{ settings.tag_option_1_ui_label }}',
						ui_component: '{{ settings.tag_option_1_filter_ui_component }}',
						placement: '{{ settings.tag_option_1_filter_layout }}',
					},
				{% endif %}
				{% if settings.tag_option_2_filter_enable %}
					'{{ settings.tag_option_2_field_name }}': { 
						ui_label: '{{ settings.tag_option_2_ui_label }}',
						ui_component: '{{ settings.tag_option_2_filter_ui_component }}',
						placement: '{{ settings.tag_option_2_filter_layout }}',
					},
				{% endif %}
				{% if settings.tag_option_3_filter_enable %}
					'{{ settings.tag_option_3_field_name }}': { 
						ui_label: '{{ settings.tag_option_3_ui_label }}',
						ui_component: '{{ settings.tag_option_3_filter_ui_component }}',
						placement: '{{ settings.tag_option_3_filter_layout }}',
					},
				{% endif %}
				{% if settings.tag_option_4_filter_enable %}
					'{{ settings.tag_option_4_field_name }}': { 
						ui_label: '{{ settings.tag_option_4_ui_label }}',
						ui_component: '{{ settings.tag_option_4_filter_ui_component }}',
						placement: '{{ settings.tag_option_4_filter_layout }}',
					},
				{% endif %}
				{% if settings.tag_option_5_filter_enable %}
					'{{ settings.tag_option_5_field_name }}': { 
						ui_label: '{{ settings.tag_option_5_ui_label }}',
						ui_component: '{{ settings.tag_option_5_filter_ui_component }}',
						placement: '{{ settings.tag_option_5_filter_layout }}',
					},
				{% endif %}
				{% if settings.tag_option_6_filter_enable %}
					'{{ settings.tag_option_6_field_name }}': { 
						ui_label: '{{ settings.tag_option_6_ui_label }}',
						ui_component: '{{ settings.tag_option_6_filter_ui_component }}',
						placement: '{{ settings.tag_option_6_filter_layout }}',
					},
				{% endif %}
				{% if settings.tag_option_7_filter_enable %}
					'{{ settings.tag_option_7_field_name }}': { 
						ui_label: '{{ settings.tag_option_7_ui_label }}',
						ui_component: '{{ settings.tag_option_7_filter_ui_component }}',
						placement: '{{ settings.tag_option_7_filter_layout }}',
					},
				{% endif %}
				{% if settings.tag_option_8_filter_enable %}
					'{{ settings.tag_option_8_field_name }}': { 
						ui_label: '{{ settings.tag_option_8_ui_label }}',
						ui_component: '{{ settings.tag_option_8_filter_ui_component }}',
						placement: '{{ settings.tag_option_8_filter_layout }}',
					},
				{% endif %}
			},
		};
        console.log('On Collection Page');
        var filterInstance = $('#big-fast-shopify-filter').bigFastShopifyFilter();
        $.address
          .init(function(event) {
          }).change(function(event) {
            console.log("address change event fired");
            filterInstance.bigFastShopifyFilter('go',event.parameters);
          });
    });

</script>

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



#### [demo/](https://github.com/colinbrogan/bigFastShopifyFilter)

This link goes nowhere for now, soon it will be a Shopify theme preview, showing everything in action.

## Team

This plugin is built by Colin Brogan

[![Colin Brogan](http://github.com/colinbrogan/)](http://cbrogan.info) 


## License

[MIT License](http://zenorocha.mit-license.org/) © Colin Brogan