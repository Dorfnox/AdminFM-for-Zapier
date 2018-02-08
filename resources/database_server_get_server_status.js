// Database Server - Get the status of the server (online or offline)

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
      {key: 'Empty', type: 'text',  helpText: 'Testing where this shows up'} ],
    perform: getServerStatus,
    sample: {
      id: 1,
      result: 0,
      running: 'true' },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Filemaker Result'},
      {key: 'running', label: 'Running'} ],
    }
};

const getServerStatusTrigger = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Poll for Server Status Changes',
    description: 'Triggers when the status of your server changes' },
  operation: options.operation,
}

const getServerStatusSearch = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Request the Status of Your Server',
    description: 'Returns the status of your server' },
  operation: options.operation,
}

module.exports = {
  trigger: getServerStatusTrigger,
  search: getServerStatusSearch,
};
