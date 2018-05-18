const testAuth = (z, bundle) => {
  const promise = z.request({
    method: 'GET',
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/server/status`,
  });

  return promise.then((response) => {
    if (response.status === 401) {
      throw new Error('The access token you supplied is not valid');
    }
    return response;
  });
};

const getSessionKey = (z, bundle) => {

  const promise = z.request({
    method: 'POST',
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/user/login`,
    headers: { 'Content-Type': 'application/json' },
    body: {
      username: bundle.authData.username,
      password: bundle.authData.password
    }
  });

  return promise.then((response) => {
    if (response.status === 401) {
      var err_string = "The username and/or password you provided was invalid. ";
      err_string = err_string.concat("Here is the complete response from the Filemaker Server:");
      err_string = err_string.concat("                                                        ");
      err_string = err_string.concat(JSON.stringify(response.content));
      throw new Error(err_string);
    }
    const json = JSON.parse(response.content);
    return {
      sessionKey: json.token || 'Needs New Key',
    };
  });

};

module.exports = {
  type: 'session',

  fields: [
    {key: 'server_address', label: 'Filemaker Server Address', required: true, type: 'string', helpText: 'For example, https://fm007.jamesbond.net'},
    {key: 'username', label: 'Username', required: true, type: 'string', helpText: 'An Admin username credential you use for the server'},
    {key: 'password', label: 'Password', required: true, type: 'password', helpText: 'An Admin password credential used with your username'},
  ],

  test: testAuth,

  sessionConfig: {
    perform: getSessionKey
  },

  connectionLabel: (z, bundle) => { bundle.authData.username },
};
