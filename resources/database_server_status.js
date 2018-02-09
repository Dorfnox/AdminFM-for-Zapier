// Database Server - Get the Status of the server (online or offline)
const getServerStatus = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/status`,
    method: 'GET',
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};


// Database Server - Set the Status of the server (online or offline)
const setServerStatus = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/status`,
    method: 'PUT',
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};


const options = {
  key: 'getServerStatus',
  noun: 'Server Status',
  operation: {
    perform: getServerStatus,
    inputFields: [
      {key: 'Running', type: 'boolean',  helpText: 'Set server to either \'true\' (Running) or \'false\' (Stopped)'} ],
    sample: {
      id: 1,
      result: 0,
      running: 'true' },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Filemaker Numeric Result'},
      {key: 'running', label: 'Running'} ],
    }
};


// List becomes a trigger: Tells zapier how to fetch a set of this resource
const getServerStatusList = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Poll for Server Status Changes',
    description: 'Triggers when the status of your server changes', },
  operation: {
    perform: options.operation.perform,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
// -- In this case, the action is to return a set of information, but I want it to show up as an action.
const getServerStatusCreate = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Request the Status of Your Server',
    description: 'Returns the status of your server', },
  operation: {
    perform: options.operation.perform,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
const setServerStatusCreate = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Set Server Status',
    description: 'Turn the server on or off', },
  operation: {
    perform: options.operation.perform,
    inputFields: options.operation.inputFields,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};

module.exports = {
  list: getServerStatusList,
  get: getServerStatusCreate,
  set: setServerStatusCreate,
};
