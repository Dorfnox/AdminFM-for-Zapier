const authentication = require('./authentication');

// Filemaker API integrations are stored in ./resources
const ServerStatus = require('./resources/database_server_status');
const ServerConfiguration = require('./resources/database_server_configuration');
const ServerSecurityConfiguration = require('./resources/database_server_security_configuration');

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
  };
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
  },

  // Will be polled for changes every 15 minutes; any changes to these activate the 'trigger'
  triggers: {
    [ServerStatus.list.key]: ServerStatus.list,
    [ServerConfiguration.list.key]: ServerConfiguration.list,
    [ServerSecurityConfiguration.list.key]: ServerSecurityConfiguration.list,
  },

  // Creates new instance of resource, applies an action to the server, or can be used to return a set of information as its 'action'
  creates: {
    [ServerStatus.get.key]: ServerStatus.get,
    [ServerStatus.set.key]: ServerStatus.set,
    [ServerConfiguration.create.key]: ServerConfiguration.create,
    [ServerSecurityConfiguration.create.key]: ServerSecurityConfiguration.create,
  }
}

module.exports = App;
