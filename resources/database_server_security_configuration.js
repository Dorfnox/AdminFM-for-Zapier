// Database Server - Get the Security Configuration of the server
const getServerSecurityConfiguration = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/config/security`,
    method: 'GET',
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};


// options to be used in below definitions
const options = {
  key: 'getServerSecurityConfiguration',
  noun: 'Server Security Configuration',
  operation: {
    perform: getServerSecurityConfiguration,
    sample: {
      id: 1,
      result: 0,
      requireSecureDB: 100,
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Result'},
      {key: 'requireSecureDB', label: 'PwProtected'} ],
    }
};


// List becomes a trigger: Tells zapier how to fetch a set of this resource
const getServerSecurityConfigurationList = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Poll for Server Security Configuration Changes',
    description: 'Triggers when server security switches betweeen hosting only password-protected dbs and not', },
  operation: {
    perform: options.operation.perform,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
// -- In this case, the action is to return a set of information, but I want it to show up as an action.
const getServerSecurityConfigurationCreate = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Request the Security Configuration of Your Server',
    description: 'Returns the security configuration of your server (server is set to only host pw-protected DBs or not)', },
  operation: {
    perform: options.operation.perform,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


module.exports = {
  list: getServerSecurityConfigurationList,
  create: getServerSecurityConfigurationCreate,
};
