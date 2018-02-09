const authentication = require('./authentication');

// Filemaker API integrations are stored in ./resources
const ServerStatus = require('./resources/database_server_get_server_status');
const ServerConfiguration = require('./resources/database_server_get_server_configuration');

// JUST FOR TESTING
// THIS MUST CHANGE IT IS HIGHLY UNSERCURE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// CHANGE CHANGE CHANGE CHANGE CHANGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const includeSessionKeyHeader = (request, z, bundle) => {
  if (bundle.authData.sessionKey) {
    request.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bundle.authData.sessionKey}`
    };
  }
  return request;
};

const sessionRefreshIf401 = (response, z, bundle) => {
  if (bundle.authData.sessionKey) {
    if (response.status === 401) {
      throw new z.errors.RefreshAuthError('Session key needs refreshing.');
    }
  }
  return response;
};

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [
    includeSessionKeyHeader
  ],

  afterResponse: [
    sessionRefreshIf401
  ],

  resources: {
  },

  // Requests for information from the server
  searches: {
    [ServerStatus.search.key]: ServerStatus.search,
    [ServerConfiguration.search.key]: ServerConfiguration.search,
  },

  // Will be polled for changes every 15 minutes; any changes to these activate the 'trigger'
  triggers: {
    [ServerStatus.trigger.key]: ServerStatus.trigger,
    [ServerConfiguration.trigger.key]: ServerConfiguration.trigger,
  },

  //
  creates: {
  }
}

module.exports = App;
