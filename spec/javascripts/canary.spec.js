var td = require("testdouble");

describe("JavaScript testing", function() {
	it("works as expected", function() {
		var mockFunction = td.function();
		td.when(mockFunction(50)).thenReturn("Function Called!");
		expect(mockFunction(50)).toBe("Function Called!");
	});
});