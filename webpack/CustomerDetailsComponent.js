var reflectMetadata = require("reflect-metadata");

var ng = {
	core: require("@angular/core"),
	http: require("@angular/http"),
	router: require("@angular/router")
};

var CustomerDetailsComponent = ng.core.Component({
	selector: "customer-details", 
	template: require("./CustomerDetailsComponent.html")
})
.Class({
	constructor:[
		ng.router.ActivatedRoute,
		ng.http.Http,
		function(activatedRoute, http){
			this.activatedRoute = activatedRoute;
			this.http = http;
			this.customer = null;
			this.id = null;
		}
	],
	ngOnInit: function() {
		var self = this;

		var observableFailed = function(response) {
			window.alert(response);
		}
		
	    var customerGetSuccess = function(response) {
	      self.customer = response.json().customer;
	    }

	    var routeSuccess = function(params) {
	      self.http.get(
	        "/customers/" + params['id'] + ".json"
	      ).subscribe(
	        customerGetSuccess,
	        observableFailed
	      );
	    }

		self.activatedRoute.params.subscribe(routeSuccess, observableFailed);
	}
});

module.exports = CustomerDetailsComponent;