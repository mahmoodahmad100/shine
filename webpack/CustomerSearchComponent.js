var reflectMetadata = require("reflect-metadata");

var ng = {
	core: require("@angular/core"),
	http: require("@angular/http"),
	router: require("@angular/router")
};

var CustomerSearchComponent = ng.core.Component({
	selector: "customer-search", 
	template: require("./CustomerSearchComponent.html")
})
.Class({
	constructor: [
		ng.http.Http,
		ng.router.Router,
		function(http, router){
			this.http = http;
			this.router = router;
			this.keywords  = null;
			this.customers = null; 

			this.Results = [
				{
					first_name: "first 1",
					last_name: "last 1",
					username: "test1",
					email: "test1@test.com",
					created_at: "2020-02-02"
				},
				{
					first_name: "first 2",
					last_name: "last 2",
					username: "test2",
					email: "test2@test.com",
					created_at: "2020-02-02"
				},
				{
					first_name: "first 3",
					last_name: "last 3",
					username: "test3",
					email: "test3@test.com",
					created_at: "2020-02-02"
				}
			]
		}
	],
	search: function($event)
	{
		var self = this;
		self.keywords = $event;

		if(self.keywords.length < 3) 
			return;

		self.http.get("/customers.json?keywords=" + self.keywords).subscribe(
			function(res){
				self.customers = res.json().customers;
			},
			function(error){
				alert(error);
			}
		);
	},
	viewDetails: function(customer) {
		this.router.navigate(["/", customer.id]);
	}
});

module.exports = CustomerSearchComponent;