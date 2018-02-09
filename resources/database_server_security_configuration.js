// Database Server - Get the Security Configuration of the server
const getServerSecurityConfiguration = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/config/security`,
    method: 'GET',
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};


// Database Server - Set (update) the Configuration of the server
const setServerSecurityConfiguration = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/config/security`,
    method: 'PATCH',
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};


// options to be used in below definitions
const options = {
  key: 'ServerSecurityConfiguration',
  noun: 'Server Security Configuration',
  operation: {
    poll: getServerSecurityConfiguration,
    get: getServerSecurityConfiguration,
    set: setServerSecurityConfiguration,
    inputFields: [
      {key: 'requireSecureDB', label: 'Set Server to Host PW-Protected Files', type: 'boolean', required: true, helpText: 'Set whether or not the server hosts password-protected databases only'}, ],
    sample: {
      id: 1,
      result: 0,
      requireSecureDB: 100,
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Result'},
      {key: 'requireSecureDB', label: 'PwProtectedDatabase'} ],
    }
};


// List becomes a trigger: Tells zapier how to fetch a set of this resource
const poll = {
  key: 'pollServerSecurityConfiguration',
  noun: options.noun,
  display: {
    label: 'Poll for Server Security Configuration Changes',
    description: 'Triggers when server security switches betweeen hosting only password-protected dbs and not', },
  operation: {
    perform: options.operation.poll,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
// -- In this case, the action is to return a set of information, but I want it to show up as an action.
const get = {
  key: 'getServerSecurityConfiguration',
  noun: options.noun,
  display: {
    label: 'Request the Security Configuration of Your Server',
    description: 'Returns the security configuration of your server (server is set to only host pw-protected DBs or not)', },
  operation: {
    perform: options.operation.get,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
const set = {
  key: 'setServerSecurityConfiguration',
  noun: options.noun,
  display: {
    label: 'Set Security Configuration of Your Server',
    description: 'Change the security configuration of your server (set to only host pw-protected DBs or not)', },
  operation: {
    perform: options.operation.set,
    inputFields: options.operation.inputFields,
    sample: options.operation.sample,
    outputFields: [ options.operation.outputFields[1], ],
  },
};

module.exports = {
  poll: poll,
  get: get,
  set: set,
};
