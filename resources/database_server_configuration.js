// Database Server - Get the Configuration of the server
const getServerConfiguration = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/config/general`,
    method: 'GET',
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};


const options = {
  key: 'getServerConfiguration',
  noun: 'Server Configuration',
  operation: {
    perform: getServerConfiguration,
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
const getServerConfigurationList = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Poll for Server Configuration Changes',
    description: 'Triggers when someone changes the server configuration', },
  operation: {
    perform: options.operation.perform,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
// -- In this case, the action is to return a set of information, but I want it to show up as an action.
const getServerConfigurationCreate = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Request the Configuration of Your Server',
    description: 'Returns the configuration of your server', },
  operation: {
    perform: options.operation.perform,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


module.exports = {
  list: getServerConfigurationList,
  create: getServerConfigurationCreate,
};
