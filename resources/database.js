// Database - close a database
// NEEEEDDDDDDDSSSSSSSS TESTTTTTINNGGGGGG
const closeDatabase = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/databases/${bundle.inputData.dbid}/close`,
    method: 'PUT',
  };

  if (typeof bundle.inputData.message != 'undefined') {
    z.request.headers['Content-Length'] = bundle.inputData.message.length;
    options['body'] = { message: bundle.inputData.message };
  } else {
    z.request.headers['Content-Length'] = 0;
  };

  return z.request(options)
    .then((response) => JSON.parse(response.content));
};


// Database - Open a database
const openDatabase = (z, bundle) => {
  if (typeof bundle.inputData.key != 'undefined') {
    z.request.headers['Content-Length'] = bundle.inputData.key.length;
  } else {
    z.request.headers['Content-Length'] = 0;
  };

  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/databases/${bundle.inputData.dbid}/close`,
    method: 'PUT',
    body: {
      key: bundle.inputData.key,
    }
  };

  return z.request(options)
    .then((response) => JSON.parse(response.content));
};


// Database Server - Get a list of Databases and supporting information
const listDatabases = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/databases`,
    method: 'GET',
  };
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};


// options to be used in below definitions
const options = {
  key: 'closeDatabase',
  noun: 'Database',
  operation: {
    close: closeDatabase,
    open: openDatabase,
    list: listDatabases,
    inputFields: [
      {key: 'dbid', type: 'string', required: true, helpText: 'Database ID of the database to disconnect'},
      {key: 'message', type: 'string', required: false, helpText: 'Text to send to clients being disconnected -> size range: 0-200'}, ],
    sample: {
      id: 1,
      result: 0,
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Result'}, ],
    }
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
const close = {
  key: 'closeDatabase',
  noun: options.noun,
  display: {
    label: 'Close Database Solution',
    description: 'Close a database, given the Database ID', },
  operation: {
    perform: options.operation.close,
    inputFields: options.operation.inputFields, // Create requires an input field
    sample: options.operation.sample,
    outputFields: [ options.operation.outputFields[1] ],
  },
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
const open = {
  key: 'openDatabase',
  noun: options.noun,
  display: {
    label: 'Open Database Solution',
    description: 'Open a database, given the Database ID', },
  operation: {
    perform: options.operation.open,
    inputFields: [
      {key: 'dbid', type: 'string', required: true, helpText: 'Database ID of the database to disconnect'},
      {key: 'key', type: 'string', required: false, helpText: 'Password for the Database File to open'}, ],
    sample: options.operation.sample,
    outputFields: [ options.operation.outputFields[1] ],
  },
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
// -- In this case, the action is to return a set of information, but I want it to show up as an action.
const list = {
  key: 'listDatabases',
  noun: options.noun,
  display: {
    label: 'List Databases',
    description: 'Returns a list of the Databases hosted on the server', },
  operation: {
    perform: options.operation.list,
    sample: {
      "result": 0,
      "files": {
        "result": 0,
        "files": [ {
          "clients": 1,
          "decryptHint": "",
          "enabledExtPrivileges": [
            "fmapp",
            "fmwebdirect" ],
          "filename": "FMServer_Sample.fmp12",
          "folder": "filemac:/Macintosh HD/Library/FileMaker Server/Data/Databases/Sample/",
          "hasSavedDecryptKey": false,
          "id": "1",
          "isEncrypted": false,
          "size": 909312,
          "status": "NORMAL"
        } ],
      },
      "clients": {
        "result": 0,
        "clients": [ {
          "appLanguage": "",
          "appType": "FMWEBDIRECT",
          "appVersion": "Mac Chrome 63.0",
          "computerName": "127.0.0.1",
          "concurrent": true,
          "connectDuration": "00:00:03",
          "connectTime": "2017-09-06T01:18:21.000Z",
          "extpriv": "fmwebdirect",
          "guestFiles": [ {
            "accountName": "[Guest]",
            "filename": "FMServer_Sample.fmp12",
            "id": "1",
            "privsetName": "[Read-Only Access]"
          } ],
          "id": "7",
          "ipaddress": "127.0.0.1",
          "macaddress": "",
          "operatingSystem": "OSX",
          "status": "NORMAL",
          "teamLicensed": true,
          "userName": "[WebDirect-51535]"
        } ]
      },
      "totalDBCount": 1,
      "openDBCount": 1,
      "fmproCount": 0,
      "fmgoCount": 0,
      "fmwebdCount": 1,
      "fmdapiCount": 0,
      "fmmiscCount": 0,
      "time": "2017-09-06T01:18:24.646Z"
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Result'},
      {key: 'files', label: 'Files'},
      {key: 'clients', label: 'Clients'},
      {key: 'totalDBCount', label: 'Total DB Count'},
      {key: 'openDBCount', label: 'Open DB Count'},
      {key: 'fmproCount', label: 'Filemaker Pro Count'},
      {key: 'fmgoCount', label: 'Filemaker GO Count'},
      {key: 'fmwebdCount', label: 'Filemaker WebDirect Count'},
      {key: 'fmapiCount', label: 'Filemaker API Count'},
      {key: 'fmmiscCount', label: 'Filemaker Miscellaneous Count'},
      {key: 'time', label: 'Time Request Processed'},
    ],
  },
};

module.exports = {
  close: close,
  open: open,
  list: list,
};
