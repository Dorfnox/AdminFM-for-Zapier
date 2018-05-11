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


// options to be used in below definitions
const options = {
  key: 'ServerStatus',
  noun: 'Server Status',
  operation: {
    poll: getServerStatus,
    get: getServerStatus,
    set: setServerStatus,
    inputFields: [
      {key: 'running', label: 'Running', type: 'boolean', helpText: 'Set server to either \'true\' (Running) or \'false\' (Stopped)'} ],
    sample: {
      id: 1,
      result: 0,
      running: 'true' },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Filemaker Numeric Result'},
      {key: 'running', label: 'Running'}, ],
    }
};


// List becomes a trigger: Tells zapier how to fetch a set of this resource
const poll = {
  key: 'pollServerStatus',
  noun: options.noun,
  display: {
    label: 'Poll for Server Status Changes',
    description: 'Triggers when the status of your server changes', },
  operation: {
    perform: options.operation.poll,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
// -- In this case, the action is to return a set of information, but I want it to show up as an action.
const get = {
  key: 'getServerStatus',
  noun: options.noun,
  display: {
    label: 'Request the Status of Your Server',
    description: 'Returns the status of your server', },
  operation: {
    perform: options.operation.get,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
const set = {
  key: 'setServerStatus',
  noun: options.noun,
  display: {
    label: 'Set Server Status',
    description: 'Turn the server on or off' },
  operation: {
    perform: options.operation.set,
    inputFields: options.operation.inputFields, // Create requires an input field
    sample: options.operation.sample,
    outputFields: [
      options.operation.outputFields[0],
      options.operation.outputFields[1], ],
  },
};


module.exports = {
  poll: poll,
  get: get,
  set: set,
};
