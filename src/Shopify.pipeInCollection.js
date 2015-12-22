/* Constructors for Javascript Classes */
Shopify.Mazer = Shopify.Mazer || {};
Shopify.Mazer.pipeInCollection = {
	keepGoing: true,
	doneTrack: [],
	loadIn: [],
	loadBatch: 0,
	go: function(collection,doWithEachLoad,pageStart,whenDone) {
					console.log("Starting new pipeInCollection with promises");
					var me = Shopify.Mazer.pipeInCollection;
					me.loadIn = [];
					if(pageStart == undefined) {
						pageStart = 1;
					}
					var promises = [];
					for(var i = pageStart; i <= pageStart+6; i++) {
					  		var page = "";
					  		if(i > 1) {
					  			page = "&page="+i;
					  		}
							var callback = function(response) {
							  	Shopify.Mazer.pipeInCollection.doneTrack[response.page] = true;
							  	if(Shopify.Mazer.utilities.keyCount(response.products) == 0) {
							  		me.keepGoing = false;
							  	} else {
							  		doWithEachLoad(response);
							  	}
							  	var allFiredFinished = true;
					  		};
							Shopify.Mazer.pipeInCollection.doneTrack[i] = false;
							// fire 7 simaltaneous ajax requests
							promises.push(
						  		$.ajax('/collections/'+collection+'?view=ajaxy'+page)
						  	);
						  	var arrLength = me.loadIn.push(
						  		jQuery.Deferred()
						  	);

						  	promises[i - pageStart].done(function(response) {
						  			var response = $.parseJSON(response);
						  			// make sure 6 returned requests fire callback in sequential page order, rather than "when-they-come-in"
						  			switch((response.page - 1) % 7) {
						  				case 0:
						  					callback(response);
						  					console.log("Load in on page "+response.page)
						  					me.loadIn[0].resolve();
						  					break;
						  				case 1:
						  					$.when(me.loadIn[0]).done(function(data) {
						  						callback(response);
						  						console.log("Load in on page "+response.page)
						  						me.loadIn[1].resolve();
						  					});
						  					break;
						  				case 2:
						  					$.when(me.loadIn[0],me.loadIn[1]).done(function(data) {
						  						callback(response);
						  						console.log("Load in on page "+response.page)
						  						me.loadIn[2].resolve();
						  					});
						  					break;
						  				case 3:
						  					$.when(me.loadIn[0],me.loadIn[1],me.loadIn[2]).done(function(data) {
						  						callback(response);
						  						console.log("Load in on page "+response.page)
						  						me.loadIn[3].resolve();
						  					});
						  					break;
						  				case 4:
						  					$.when(me.loadIn[0],me.loadIn[1],me.loadIn[2],me.loadIn[3]).done(function(data) {
						  						callback(response);
						  						console.log("Load in on page "+response.page)
						  						me.loadIn[4].resolve();
						  					});
						  					break;
						  				case 5:
						  					$.when(me.loadIn[0],me.loadIn[1],me.loadIn[2],me.loadIn[3],me.loadIn[4]).done(function(data) {
						  						callback(response);
						  						console.log("Load in on page "+response.page)
						  						me.loadIn[5].resolve();
						  					});
						  					break;
						  				case 6:
						  					$.when(me.loadIn[0],me.loadIn[1],me.loadIn[2],me.loadIn[3],me.loadIn[4],me.loadIn[5]).done(function(data) {
						  						callback(response);
						  						console.log("Load in on page "+response.page)
						  						me.loadIn[6].resolve();
						  					});
						  					break;
						  			}

						  	});
				  	}
				  	$.when(me.loadIn[0],me.loadIn[1],me.loadIn[2],me.loadIn[3],me.loadIn[4],me.loadIn[5],me.loadIn[6]).done(function( data, textStatus, jqXHR ) {
			

						me.loadBatch = me.loadBatch + 1;
						if(me.keepGoing == false) {
					  		if(whenDone !== undefined) {
					  			console.log("All loads are in");
					  			whenDone(data);
					  		}
						} else {
							me.loadIn = [];
							me.go(collection,doWithEachLoad,(7*me.loadBatch+1),whenDone);
						}
					});


	},
	/* private methods for class */
}