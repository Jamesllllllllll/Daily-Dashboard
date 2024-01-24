import cy from "cypress";
describe("Smoke Tests", () => {
  it("should load the home page", () => {
    cy.visit("/");
  });
});
