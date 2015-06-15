/* Constructors for Javascript Classes */
Shopify.Mazer = Shopify.Mazer || {};
Shopify.Mazer.pipeInCollection = {
	keepGoing: true,
	doneTrack: {},
	go: function(collection,doWithEachLoad,pageStart,whenDone) {
					var me = Shopify.Mazer.pipeInCollection;
					if(pageStart == undefined) {
						pageStart = 1;
					}
					for(var i = pageStart; i <= pageStart+6; i++) {
					  		var page = "";
					  		if(i > 1) {
					  			page = "&page="+i;
					  		}
/*
					  		console.log('Shopify.Mazer.pipeInAjax: hit page '+page);
*/
							var callback = function(response) {
							  	var response = $.parseJSON(response);
							  	Shopify.Mazer.pipeInCollection.doneTrack[response.page] = true;
							  	if(Shopify.Mazer.utilities.keyCount(response.products) == 0) {
							  		me.keepGoing = false;
							  		console.log("Shopify.Mazer.pipeInCollection: Ended '"+response.handle+"' at page "+response.page);
							  	} else {
							  		doWithEachLoad(response);
							  	}
							  	var allFiredFinished = true;
							  	for(pageLog in Shopify.Mazer.pipeInCollection.doneTrack) {
							  		if(Shopify.Mazer.pipeInCollection.doneTrack[pageLog] == false) {
							  			allFiredFinished = false;
							  		}
							  	}
							  	if(allFiredFinished && me.keepGoing == false) {
							  		console.log("whenDone should attempt to fire if not undefined");
							  		if(whenDone !== undefined) {
							  			console.log("whenDone fired");
							  			console.log(whenDone);
							  			whenDone(response);
							  		}
							  	}
							  	if(Number(response.page) % 6 == 0 && me.keepGoing == true) {
							  		me.go(collection,doWithEachLoad,Number(response.page)+1);
							  	}
					  		};
							Shopify.Mazer.pipeInCollection.doneTrack[i] = false;
					  		$.get('/collections/'+collection+'?view=ajaxy'+page,function(response) {
					  			callback(response);
					  		});
				  	}
	},
	/* private methods for class */
}