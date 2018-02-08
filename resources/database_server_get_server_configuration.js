const getServerConfiguration = (z, bundle) => {

  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/status`
  };

  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

// const getServerStatus = (z, bundle) => {
//   // bundle.cleanedRequest will include the parsed JSON object (if it's not a
//   // test poll) and also a .querystring property with the URL's query string.
//   const recipe = {
//     id: bundle.cleanedRequest.id,
//     result: bundle.cleanedRequest.result,
//     running: bundle.cleanedRequest.running,
//   };
//
//   return [recipe];
// };

module.exports = {
  key: 'getServerConfiguration',

  noun: 'Server Configuration!!!!!',

  display: {
    label: 'Get Server Configuration!!!!!',
    description: 'Trigger for getting the status of your filemaker server' },

  operation: {
    inputFields: [
      {key: 'style', type: 'text',  helpText: 'testing where this shows up'} ],

    // type: 'hook',

    perform: getServerConfiguration,
    // performList: getServerStatusLive,
    // performSubscribe: getServerStatus,
    // performUnsubscribe: getServerStatus,

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
