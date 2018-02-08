// Database Server - Get Server General Configuration

const getServerConfiguration = (z, bundle) => {

  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/status`
  };

  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

module.exports = {
  key: 'getServerConfiguration',

  noun: 'Server Configuration!!!!!',

  display: {
    label: 'Get Server Configuration!!!!!',
    description: 'Trigger for getting the status of your filemaker server' },

  operation: {
    inputFields: [
      {key: 'style', type: 'text',  helpText: 'testing where this shows up'} ],

    perform: getServerConfiguration,

    sample: {
      id: 1,
      result: 0,
      running: 'true' },

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Filemaker Result'},
      {key: 'running', label: 'Running'} ]
    }
};
