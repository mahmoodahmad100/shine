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
