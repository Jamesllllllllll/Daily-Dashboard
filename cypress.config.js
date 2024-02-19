const { defineConfig } = require("cypress");
function getURI() {
  const PORT = process.env.PORT ? process.env.PORT : 3000;
  return `http://localhost:${PORT}`;
}
module.exports = defineConfig({
  e2e: {
    baseUrl: getURI(),
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
