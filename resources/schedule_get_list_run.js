function getCurrentTimestring(){
  let now = new Date(new Date().getTime() + 1000 * 40000);
      year = now.getFullYear(),
      month = ((now.getMonth() + 1) < 10) ? '0' + (now.getMonth() + 1) : now.getMonth() + 1,
      day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate(),
      hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours(),
      minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes(),
      seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds(),
      dateString = `${year}-${month}-${day}`,
      timeString = `${hours}-${minutes}-${seconds}`;

    return new String(`${dateString}-${timeString}`);
};

// Schedules - get a single schedule
const getSchedule = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/schedules/${bundle.inputData.schedule_identity}`,
    method: 'GET',
  };

  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

// Schedules - list all schedules on server
const listSchedule = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/schedules`,
    method: 'GET',
  };

  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

// Schedules - run or enable a scheduled script
const runSchedule = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/schedules/${bundle.inputData.schedule_identity}/run`,
    method: 'PUT',
  };

  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

const get = {
  key: 'getSchedule',
  noun: 'Get a Schedule',
  display: {
    label: 'Get a Single Schedule',
    description: 'Retrieves an array of schedule information for a single schedule given the schedule id'
  },
  operation: {
    perform: getSchedule,
    inputFields: [
      {key: 'schedule_identity', label: 'Schedule ID', type: 'string', required: true, helpText: 'The ID of the Filemaker scheduled script'},
    ],
    sample: {
      "id": 1,
      "result": 0,
      "schedule": {
          "backupType": {
              "backupTarget" : "filemac:/Macintosh HD/Library/FileMaker Server/Data/Backups/",
              "clone" : "false",
              "fromTarget" : "All Databases",
              "maxBackups" : 7,
              "verify" : "false"
          },
          "dailyDays" : 1,
          "daysOfTheWeek" : 0000000,
          "daysOfTheWeekDetails" : "",
          "emailAddresses" : "john.doe@xxx.xxx",
          "enableEndDate": true,
          "enabled" : "true",
          "endDate": "2017-10-30-15-05-00",
          "freqType" : 2,
          "id": "2",
          "lastError": 0,
          "lastRun" : "2017-10-07 20:05:00 GMT",
          "name" : "Daily backup",
          "nextRun" : "2017-10-08 20:05:00 GMT",
          "repeatFrequency" : 10,
          "repeatInterval" : 1,
          "repeatTask" : "false",
          "sendEmail" : "true",
          "startDate" : "2017-10-05 12:05:00",
          "status" : 1,
          "taskType" : "BACKUP"
      }
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Result'},
      {key: 'schedules', label: 'Schedule'} ],
    }
};

const list = {
  key: 'listSchedules',
  noun: 'List Schedules',
  display: {
    label: 'List the Scheduled Scripts on a Server',
    description: 'Retrieves an array of all the scheduled scripts on the server'
  },
  operation: {
    perform: listSchedule,
    inputFields: [],
    sample: {
        "id": 1,
        "result": 0,
        "schedules": [{
            "backupType": {
                "backupTarget" : "filemac:/Macintosh HD/Library/FileMaker Server/Data/Backups/",
                "clone" : "false",
                "fromTarget" : "All Databases",
                "maxBackups" : 7,
                "verify" : "false"
            },
            "dailyDays" : 1,
            "daysOfTheWeek" : 0000000,
            "daysOfTheWeekDetails" : "",
            "emailAddresses" : "john.doe@xxx.xxx",
            "enableEndDate": true,
            "enabled" : "true",
            "endDate": "2017-10-30-15-05-00",
            "freqType" : 2,
            "id": "2",
            "lastError": 0,
            "lastRun" : "2017-10-07 20:05:00 GMT",
            "name" : "Daily backup",
            "nextRun" : "2017-10-08 20:05:00 GMT",
            "repeatFrequency" : 10,
            "repeatInterval" : 1,
            "repeatTask" : "false",
            "sendEmail" : "true",
            "startDate" : "2017-10-05 12:05:00",
            "status" : 1,
            "taskType" : "BACKUP"
          },
          {
            "dailyDays" : 1,
            "daysOfTheWeek" : 1010010,
            "daysOfTheWeekDetails" : "Sunday; Thursday; Friday; ",
            "emailAddresses" : "",
            "enableEndDate": false,
            "enabled" : "false",
            "filemakerScriptType": {
                "autoAbort" : "false",
                "fmScriptAccount" : "",
                "fmScriptName" : "Printable Task List",
                "fmScriptParam" : "",
                "fmScriptPassword" : "",
                "fromTarget" : "file:FMServer_Sample",
                "timeout" : 2
            },
            "freqType" : 2,
            "id": "3",
            "lastError": 0,
            "name" : "FM Script Schedule",
            "repeatFrequency" : 10,
            "repeatInterval" : 1,
            "repeatTask" : "false",
            "sendEmail" : "false",
            "startDate" : "2017-10-05 03:07:00",
            "status" : 1,
            "taskType" : "FILEMAKER SCRIPT"
            }
        ]
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Result'},
      {key: 'schedules', label: 'Schedules'} ],
    }
};

const run = {
  key: 'runSchedule',
  noun: 'Run a Schedule',
  display: {
    label: 'Run a Scheduled Script',
    description: 'Given the schedule id, run or \'enable\' that scheduled script'
  },
  operation: {
    perform: runSchedule,
    inputFields: [
      {key: 'schedule_identity', label: 'Schedule ID', type: 'string', required: true, helpText: 'The ID of the Filemaker scheduled script to enable'},
    ],
    sample: {
      "id": 1,
      "result": 0,
      "schedule": {
          "dailyDays": 1,
          "daysOfTheWeek": "1111111",
          "daysOfTheWeekDetails": "Sunday; Monday; Tuesday; Wednesday; Thursday; Friday; Saturday;",
          "emailAddresses": "john.doe@xxx.xxx,jane.doe@xxx.xxx",
          "enabled": "true",
          "endDate": "2019-10-04 11:20:00",
          "freqType": 3,
          "id": "2",
          "lastError": 10904,
          "lastRun": "0000-00-00 00:00:00",
          "messageType": {
              "fromTarget" : "file:FMServer_Sample",
              "messageText": "Hello World",
              "target": 4
          },
          "name": "aa",
          "nextRun" : "2017-11-17 17:00:00",
          "repeatFrequency": 10,
          "repeatInterval": 1,
          "repeatTask": "true",
          "sendEmail" : "true",
          "startDate": "2017-10-04 11:30:00",
          "status": 2,
          "taskType": "MESSAGE"
      }
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Result'},
      {key: 'schedules', label: 'Schedule'} ],
    }
};

module.exports = {
  get: get,
  list: list,
  run: run
};
