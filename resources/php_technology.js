// Configure the PHP technology
const configPHPTechnology = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/php/config`,
    method: 'PATCH',
    body: {

    },
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

const configure = {
  key: 'configurePHPTechnology',
  noun: 'Configure PHP',
  display: {
    label: 'Configure the PHP Technology',
    description: 'Call when you want to configure PHP Technology settings', },
  operation: {
    perform: configPHPTechnology,
    inputFields: [
      {key: 'enabled', label: 'Enable Custom Web Publishing', type: 'boolean', required: false, helpText: 'Enables or disables Custom Web Publishing with PHP.'},
      {key: 'useFileMakerPhp', label: 'Use Filemaker Server PHP', type: 'boolean', required: false, helpText: 'Set to True to use the FileMaker Server-supported version of PHP.'},
      {key: 'characterEncoding', label: 'Set Character Encoding', type: 'string', required: false, helpText: 'Sets the default character encoding for PHP. Allowed values: "UTF-8", "ISO-8859-1"'},
      {key: 'dataPreValidation', label: 'Validate Data on Web Server before committing', type: 'boolean', required: false, helpText: 'Enables or disables validation of record data on the web server before sending it to the database for commit.'},
      {key: 'errorMessageLanguage', label: 'Error Message Language', type: 'string', required: false, helpText: 'Sets the language used for error messages in PHP. Allowed values: "en", "it", "de", "fr", "ja", "sv"'},
    ],
    sample: { // Hard-coded sample
      id: 1,
      result: 0,
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Filemaker Numeric Result'}
    ],
  },
};

module.exports = {
  configure: configure,
};
