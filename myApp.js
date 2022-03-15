const express = require('express');
const helmet = require('helmet');
const app = express();

// Hide express headers
app.use(helmet.hidePoweredBy());

// Disable iframe usage
app.use(helmet.frameguard({action: 'deny'}));

// Basic XSS protection
app.use(helmet.xssFilter());

// Stop MIME sniff
app.use(helmet.noSniff());

// X-Download-Options noopen
app.use(helmet.ieNoOpen());

// Force all content to use HTTPS
let nintyDaysInSecs = 90 * 24 * 60 * 60
app.use(helmet.hsts({ maxAge: nintyDaysInSecs, force: true }));

// Disable DNS pre-fetch
app.use(helmet.dnsPrefetchControl());

// Disable browser caching
app.use(helmet.noCache());

// Set up Content Security Policy (CSP)
app.use(helmet.contentSecurityPolicy({
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "trusted-cdn.com"]
}))




































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
