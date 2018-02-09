// Database Server - Get the Configuration of the server

const getServerConfiguration = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/config/general`
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

const options = {
  key: 'getServerConfiguration',
  noun: 'Server Configuration',
  operation: {
    inputFields: [
      {key: 'Empty', type: 'text',  helpText: 'Please leave this empty'} ],
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

const getServerConfigurationTrigger = {
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

const getServerConfigurationSearch = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Request the Configuration of Your Server',
    description: 'Returns the configuration of your server', },
  operation: {
    perform: options.operation.perform,
    inputFields: options.operation.inputFields,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};

module.exports = {
  trigger: getServerConfigurationTrigger,
  search: getServerConfigurationSearch,
};
