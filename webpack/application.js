require ("application.css");
require("bootstrap/dist/css/bootstrap.css");

var coreJS = require('core-js');
var zoneJS = require('zone.js');
var reflectMetadata = require('reflect-metadata');

var ng = {
	core: require("@angular/core"),
	common: require("@angular/common"),
	compiler: require("@angular/compiler"),
	forms: require("@angular/forms"),
	platformBrowser: require("@angular/platform-browser"),
	platformBrowserDynamic: require("@angular/platform-browser-dynamic"),
	router: require("@angular/router"),
	http: require("@angular/http")
};

var CustomerSearchComponent = ng.core.Component({
	selector: "customer-search", 
	template:' \
		<header> \
			<h2>Customer Search</h2> \
		</header> \
		<section class="search-form"> \
			<form> \
				<div class="input-group input-group-lg"> \
					<label for="keywords" class="sr-only">Keywords></label> \
					<input bindon-ngModel="keywords" on-ngModelChange="search($event)" type="text" id="keywords" name="keywords" placeholder="first , last name or email" class="form-control"> \
				</div> \
			</form> \
		</section> \
		<section class="search-results"> \
			<h1>Results</h1> \
			<ol class="list-group"> \
				<li *ngFor="let customer of customers" class="list-group-item clearfix"> \
					<h3 class="pull-right"> \
						<small class="text-uppercase">Joined</small> \
						{{customer.created_at}} \
					</h3> \
					<h3> \
						{{customer.first_name}} {{customer.last_name}} \
						<small>{{customer.username}}</small> \
					</h3> \
					<h4>{{customer.email}}</h4> \
				</li> \
			</ol> \
		</section> \
		'
})
.Class({
	constructor: [
		ng.http.Http,
		function(http){
			this.http = http;
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
	}
});

var CustomerSearchAppModule = ng.core.NgModule({
	imports: [ 
		ng.platformBrowser.BrowserModule, 
		ng.forms.FormsModule, 
		ng.http.HttpModule 
	],
	declarations: [ CustomerSearchComponent ],
	bootstrap: [ CustomerSearchComponent ]
})
.Class({
	constructor: function() {}
});

var NgTestComponent = ng.core.Component({
	selector: "ng-test", 
	template:'\
		<h2 *ngIf="name">Hello {{name}}!</h2> \
		<form> \
		<div class="form-group"> \
		<label for="name">Name</label> \
		<input type="text" id="name" class="form-control" \
		name="name" bindon-ngModel="name"> \
		</div> \
		</form> \
		'
})
.Class({
	constructor: function(){
		this.name = null;
	}
});

var NgTestAppModule = ng.core.NgModule({
	imports: [ ng.platformBrowser.BrowserModule, ng.forms.FormsModule ],
	declarations: [ NgTestComponent ],
	bootstrap: [ NgTestComponent ]
})
.Class({
	constructor: function() {}
});


document.addEventListener('DOMContentLoaded', function() {
	var shouldBootstrap = document.getElementById("customer-search");
	if (shouldBootstrap) {
		ng.platformBrowserDynamic.
		platformBrowserDynamic().
		bootstrapModule(CustomerSearchAppModule);
	}
});

document.addEventListener('DOMContentLoaded', function() {
	var shouldBootstrap = document.getElementById("ng-test");
	if (shouldBootstrap) {
		ng.platformBrowserDynamic.
		platformBrowserDynamic().
		bootstrapModule(NgTestAppModule);
	}
});
