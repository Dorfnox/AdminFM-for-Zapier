const authentication = require('./authentication');
const RepositoryResource = require('./resources/repository');
const ServerStatus = require('./database_server_get_server_status');

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

const getServerStatus = (z, bundle) => {

  const requestOptions = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/status`
  };

  return z.request(requestOptions)
    .then((response) => JSON.parse(response.content));
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
    //[RepositoryResource.key]: RepositoryResource,
  },

  searches: {
  },

  triggers: {
    [ServerStatus.key]: ServerStatus,
  },

  // triggers: {
  //   getServerStatus: {
  //     noun: 'Server Status',
  //     key: 'getServerStatus',
  //     display: {
  //       label: 'Get Server Status',
  //       description: 'Get the status of the server'
  //     },
  //     operation: {
  //       perform: getServerStatus
  //     },
  //   },
  // },

  // If you want your creates to show up, you better include it here!
  creates: {
    getServerStatus: ServerStatus,
  }
}

// Finally, export the app.
module.exports = App;
