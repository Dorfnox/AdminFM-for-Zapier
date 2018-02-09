// Database Server - Get the Configuration of the server

const getServerSecurityConfiguration = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/config/security`
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

const options = {
  key: 'getServerSecurityConfiguration',
  noun: 'Server Security Configuration',
  operation: {
    inputFields: [
      {key: 'Empty', type: 'text',  helpText: 'Please leave this empty'} ],
    perform: getServerSecurityConfiguration,
    sample: {
      id: 1,
      result: 0,
      requireSecureDB: 100,
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Filemaker Numeric Result'},
      {key: 'requireSecureDB', label: 'Host password-protected databases only'} ],
    }
};

const getServerSecurityConfigurationTrigger = {
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

const getServerSecurityConfigurationSearch = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Request the Security Configuration of Your Server',
    description: 'Returns the security configuration of your server (server is set to only host pw-protected dbs or not)', },
  operation: {
    perform: options.operation.perform,
    inputFields: options.operation.inputFields,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};

module.exports = {
  trigger: getServerSecurityConfigurationTrigger,
  search: getServerSecurityConfigurationSearch,
};
