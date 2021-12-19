# FBuervenich Porfolio

## [Latest version](https://home.fbuervenich.de) hosted on Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/06390288-8397-4448-a853-4b9516181e3c/deploy-status)](https://app.netlify.com/sites/fervent-brattain-47526f/deploys)

## Getting started

1. `cd gridsome-portfolio-starter`
1. `npm install` (This can be a long download because of Cypress.)
1. `gridsome develop` to start a local dev server at `http://localhost:8080`

## Testing

Basic end-to-end tests using [Cypress](https://cypress.io). You can find them in `/cypress/integration/tests.js`.

To run tests, first make sure your dev server is running with `gridsome develop`. I'm assuming you're using the default port of 8080. If not, change the `baseUrl` key in the `cypress.json` file.

After your dev server is running, you can run `npm run test` or `./node_modules/.bin/cypress open` to start Cypress. The Cypress electron app will run. Click the `tests.js` file and the tests will run in an automated browser.

## Notes

- Illustrations from [unDraw](https://undraw.co)
