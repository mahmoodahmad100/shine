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
		var customer = {
			id: 1,
			created_at: (new Date()).toString(),
			first_name: "Pat",
			last_name: "Jones",
			username: "pj",
			email: "pjones@somewhere.net"
		}
		beforeEach(function() {
			var route = createMockRoute(customer.id);
			var http = createMockHttp(customer);
			component = new CustomerDetailsComponent(route,http);
		});
		it("fetches the customer from the back-end", function() {
			component.ngOnInit();
			expect(component.customer).toBe(customer);
		});	
	});
});