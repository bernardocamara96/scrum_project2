const scrumTest = require("./scrum_code");

test("get null to a user that doesn't exist", () => {
   expect(scrumTest.getUser("admin", "admin")).toBe(null);
});
