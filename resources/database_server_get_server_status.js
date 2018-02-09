// Database Server - Get the Status of the server (online or offline)

const getServerStatus = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/status`
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

const options = {
  key: 'getServerStatus',
  noun: 'Server Status',
  operation: {
    inputFields: [
      {key: 'Empty', type: 'text',  helpText: 'Please leave this empty'} ],
    perform: getServerStatus,
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

const getServerStatusTrigger = {
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

const getServerStatusSearch = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Request the Status of Your Server',
    description: 'Returns the status of your server', },
  operation: {
    perform: options.operation.perform,
    inputFields: options.operation.inputFields,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};

module.exports = {
  trigger: getServerStatusTrigger,
  search: getServerStatusSearch,
};
