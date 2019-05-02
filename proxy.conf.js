'use strict';

const HttpsProxyAgent = require('https-proxy-agent');

/*
 * API proxy configuration.
 * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
 * This is especially useful during app development to avoid CORS issues while running a local server.
 * For more details and options, see https://github.com/angular/angular-cli#proxy-to-backend
 */
const proxyConfig = [
  {
    context: ['/api'],
    pathRewrite: { '^/api': '' },
    target: 'http://localhost:8083',
    changeOrigin: true,
    secure: false
  }
  // This is how to proxy to an external/3rd party api to avoid CORS errors running locally
  // Calling /news from service... /api is prepended by the http interceptor
  // {
  //   context: ['/api/news'],
  //   pathRewrite: { '^/api/news': '' },
  //   target: 'https://api.iextrading.com/1.0/stock/aapl/news/last/5',
  //   changeOrigin: true,
  //   logLevel: 'debug',
  //   secure: true
  // }
];

/*
 * Configures a corporate proxy agent for the API proxy if needed.
 */
function setupForCorporateProxy(proxyConfig) {
  if (!Array.isArray(proxyConfig)) {
    proxyConfig = [proxyConfig];
  }

  const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  let agent = null;

  if (proxyServer) {
    console.log(`Using corporate proxy server: ${proxyServer}`);
    agent = new HttpsProxyAgent(proxyServer);
    proxyConfig.forEach(entry => { entry.agent = agent; });
  }

  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
