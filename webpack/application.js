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
