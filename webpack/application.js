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
	router: require("@angular/router")
};

var CustomerSearchComponent = ng.core.Component({
	selector: "customer-search", 
	template:' \
		<header> \
			<h2>Customer Search</h2> \
		</header> \
		<section> \
			<form> \
				<div class="input-group input-group-lg"> \
					<label for="keywords" class="sr-only">Keywords></label> \
					<input bindon-ngModel="keywords" type="text" id="keywords" name="keywords" placeholder="first , last name or email" class="form-control"> \
					<span class="input-group-btn"><input on-click="search()" type="submit" value="find customers" class="btn btn-primary"></span> \
				</div> \
			</form> \
		</section> \
		<section> \
			<h1>Results</h1> \
			<ol class="list-group"> \
				<li class="list-group-item clearfix"> \
					<h3 class="pull-right"> \
						<small class="text-uppercase">Joined</small> \
						2018-05-01 \
					</h3> \
					<h3> \
						Hello World \
						<small>test500</small> \
					</h3> \
					<h4>test@test.com</h4> \
				</li> \
			</ol> \
		</section> \
		'
})
.Class({
	constructor: function(){
		this.keywords = null;
	},
	search: function()
	{
		alert("the keywords: " + this.keywords);
	}
});

var CustomerSearchAppModule = ng.core.NgModule({
	imports: [ ng.platformBrowser.BrowserModule, ng.forms.FormsModule ],
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
