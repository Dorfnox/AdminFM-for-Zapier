// Configure the PHP Technology
const configXMLTechnology = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/xml/config`,
    method: 'PATCH',
    body: {
      'enabled': bundle.inputData.enabled,
    },
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

// Get the currently configured settings for the server's PHP Technology
const getXMLTechnology = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/xml/config`,
    method: 'GET',
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

const configure = {
  key: 'configureXMLTechnology',
  noun: 'Configure XML Technology',
  display: {
    label: 'Enable or Disable XML Technology',
    description: 'Call when you want to enable/disable XML Technology settings', },
  operation: {
    perform: configXMLTechnology,
    inputFields: [
      {key: 'enabled', label: 'Enable XML technology', type: 'boolean', required: true, helpText: 'Enables or disables XML Technology'},
    ],
    sample: { // Hard-coded sample or response
      id: 1,
      result: 0,
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Filemaker Numeric Result'}
    ],
  },
};

const get = {
  key: 'getXMLTechnology',
  noun: 'Get XML Technology Configuration',
  display: {
    label: 'Get the XML Technology Configuration of the Server',
    description: 'Call when you want to get the XML Technology settings', },
  operation: {
    perform: getXMLTechnology,
    inputFields: [],
    sample: {
      "id": 1,
      "result": 0,
      "enabled": false
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Filemaker Numeric Result'},
      {key: 'enabled', label: 'Whether XML Technology is enabled or disabled'},
    ],
  },
};

module.exports = {
  configure: configure,
  get: get,
};
