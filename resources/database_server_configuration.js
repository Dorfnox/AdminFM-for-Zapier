// Database Server - Get the Configuration of the server
const getServerConfiguration = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/config/general`,
    method: 'GET',
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};


// Database Server - Set (update) the Configuration of the server
const setServerConfiguration = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/config/general`,
    method: 'PATCH',
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};


// options to be used in below definitions
const options = {
  key: 'ServerConfiguration',
  noun: 'Server Configuration',
  operation: {
    poll: getServerConfiguration,
    get: getServerConfiguration,
    set: setServerConfiguration,
    inputFields: [
      {key: 'cacheSize', label: 'Cache Size', type: 'integer', required: false, helpText: 'Set a new cache size (RAM). Must be an integer of at least 64 MB'},
      {key: 'maxFiles', label: 'Max Files', type: 'integer', required: false, helpText: 'Maximum number of files to host. Size range: 1-125'},
      {key: 'maxProConnections', label: 'Max Filemaker Pro Connections', type: 'integer', required: false, helpText: 'Maximum number of FileMaker Pro Advanced client connections'},
      {key: 'maxPSOS', label: 'Max Perform Script on Servers', type: 'integer', required: false, helpText: 'Maximum simultaneous script sessions'}, ],
    sample: {
      id: 1,
      result: 0,
      cacheSize: 100,
      maxFiles: 100,
      maxProConnections: 100,
      maxPSOS: 100
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Filemaker Numeric Result'},
      {key: 'cacheSize', label: 'RAM reserved for database cache (MB)'},
      {key: 'maxFiles', label: 'Maximum number of files to host'},
      {key: 'maxProConnections', label: 'Maximum number of FileMaker Pro Advanced client connections'},
      {key: 'maxPSOS', label: 'Maximum simultaneous script sessions'} ],
    }
};


// List becomes a trigger: Tells zapier how to fetch a set of this resource
const poll = {
  key: 'pollServerConfiguration',
  noun: options.noun,
  display: {
    label: 'Poll for Server Configuration Changes',
    description: 'Triggers when someone changes the server configuration', },
  operation: {
    perform: options.operation.poll,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
// -- In this case, the action is to return a set of information, but I want it to show up as an action.
const get = {
  key: 'getServerConfiguration',
  noun: options.noun,
  display: {
    label: 'Request the Configuration of Your Server',
    description: 'Returns the configuration of your server', },
  operation: {
    perform: options.operation.get,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
const set = {
  key: 'setServerConfiguration',
  noun: options.noun,
  display: {
    label: 'Update Configuration of Server',
    description: 'Send values to update your server configuration', },
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
