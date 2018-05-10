var proxyquire = require("proxyquire");
var CustomerDetailsComponent = proxyquire(
	"../../webpack/CustomerDetailsComponent",
	{
		"./CustomerDetailsComponent.html": {
		"@noCallThru": "true"
		}
	}
);
var td = require("testdouble");
var component = null;

describe("CustomerDetailsComponent", function() {
	describe("initial state", function() {
		beforeEach(function() {
		component = new CustomerDetailsComponent();
		});
		it("sets customer to null", function() {
		expect(component.customer).toBe(null);
		});
	});
	describe("ngOnInit", function() {
	
	});
});