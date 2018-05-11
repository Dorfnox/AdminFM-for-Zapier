// Schedules - Create a Backup Schedule
const createFilemakerScriptSchedule = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/schedules`,
    method: 'POST',
    body: {
      'taskType': 5,
      'name': bundle.inputData.name,
      'freqType': bundle.inputData.freqType,
      'startDate': bundle.inputData.startDate,
      'fromTarget': bundle.inputData.fromTarget,
      'fmScriptName': bundle.inputData.fmScriptName,

      'fmScriptParam': bundle.inputData.fmScriptParam,
      'fmScriptAccount': bundle.inputData.fmScriptAccount,
      'fmScriptPassword': bundle.inputData.fmScriptPassword,

      'timeout': bundle.inputData.timeout,
      'autoAbort': bundle.inputData.autoAbort,

      'repeatTask': bundle.inputData.repeatTask,
      'repeatInterval': bundle.inputData.repeatInterval,
      'repeatFrequency': bundle.inputData.repeatFrequency,

      'daysOfTheWeek': bundle.inputData.daysOfTheWeek,
      'dailyDays': bundle.inputData.dailyDays,

      'enableEndDate': bundle.inputData.enableEndDate,
      'endDate': bundle.inputData.endDate,

      'sendEmail': bundle.inputData.sendEmail,
      'emailAddresses': bundle.inputData.emailAddresses,

      'enabled': bundle.inputData.enabled,
    },
  };

  return z.request(options)
    .then((response) => JSON.parse(response.content));
};


// options to be used in below definitions
const options = {
  key: 'createFilemakerScriptSchedule',
  noun: 'Filemaker Script Schedule',
  operation: {
    create: createFilemakerScriptSchedule,
    inputFields: [
      {key: 'name', label: 'Schedule Name', type: 'string', required: true, helpText: 'Name of Scheduled Script'},
      {key: 'freqType', label: 'Schedule Frequency', type: 'integer', required: true, helpText: '1=Daily, 2=Daily, or Every n Days, 3=Weekly'},
      {key: 'startDate', label: 'Start Date', type: 'string', required: true, helpText: 'Year-Month-Day-Hour-Minute-Second in 24-hour format'},
      {key: 'fromTarget', label: 'Filemaker Database Name', type: 'string', required: true, helpText: 'The name of the Filemaker Database'},
      {key: 'fmScriptName', label: 'FileMaker database script name', type: 'string', required: true, helpText: 'If Database Type = 3, then type a directory path. If Database Type = 4, then type a Database Name'},

      {key: 'fmScriptParam', label: 'An optional script parameter to pass through', type: 'integer', required: false, helpText: 'A good idea would be to send the script parameter as a bundled Stringified JSON object'},
      {key: 'fmScriptAccount', label: 'FileMaker database script account name', type: 'string', required: false, helpText: 'Script Account Name'},
      {key: 'fmScriptPassword', label: 'FileMaker database script password', type: 'password', required: false, helpText: 'Script Password'},

      {key: 'timeout', label: 'Time limit for script schedule', type: 'password', required: false, helpText: 'Minutes. 0 means no time limit. Must be between 0 to 1439'},
      {key: 'autoAbort', label: 'Whether to stop the schedule if the time limit is reached', type: 'boolean', required: false, helpText: 'Default is false'},

      {key: 'repeatTask', label: 'Repeat within a Day', type: 'boolean', required: false, helpText: 'Repeat within a day?'},
      {key: 'repeatInterval', label: 'Repeat Interval Time Unit', type: 'integer', required: false, helpText: '"1" for minute, and "2" for hour. Required if "Repeat within a Day" is true.'},
      {key: 'repeatFrequency', label: 'Repeat Frequency', type: 'integer', required: false, helpText: 'Time interval to repeat the task. Required if "Repeat within a Day" is true. Must be an integer from 1 to 60 when "Repeat Interval Time Unit" = 1 or from 1 to 24 when "Repeat Interval Time Unit"=2'},

      {key: 'daysOfTheWeek', label: 'Days of the Week', type: 'string', required: false, helpText: 'Enable only if "Schedule Frequency" = 3. Ex: "1001011" indicates the schedule will run Sunday, Wednesday, Friday and Saturday. 0000000 is not allowed'},
      {key: 'dailyDays', label: 'Day Interval', type: 'integer', required: false, helpText: 'Enabled only when freqType = 2. Every how many days the schedule repeats, from 1 to 999. For example, 3 represents every 3 days. The default is 1'},

      {key: 'enableEndDate', label: 'Enable End Date', type: 'boolean', required: false, helpText: 'Whether to specify an end date/time for the schedule.'},
      {key: 'endDate', label: 'End Date', type: 'string', required: false, helpText: 'Schedule end date/time (in "Year-Month-Day-Hour-Minute-Second" in 24-hour format). Required if "Enable End Date" or "Repeat within a Day" is true'},

      {key: 'sendEmail', label: 'Send Email', type: 'boolean', required: false, helpText: 'Whether to send Emails. SMTP configuration is required'},
      {key: 'emailAddresses', label: 'Email Addresses', type: 'string', required: false, helpText: 'Email addresses separated by comma. Required if "sendEmail" is true'},

      {key: 'enabled', label: 'enabled', type: 'boolean', required: false, helpText: 'Whether schedule is enabled at create or edit. Default is false'} ],

    sample: {
      id: 1,
      "result": 0,
      "taskType": 5,
      "name": "FM Script Schedule",
      "freqType": 2,
      "startDate": "2017-10-12-09-15-00",
      "repeatTask": true,
      "repeatFrequency": 45,
      "repeatInterval": 1,
      "enableEndDate": true,
      "endDate": "2017-10-31-09-15-00",
      "fromTarget": "file:PlugIn.fmp12",
      "fmScriptAccount": "jane",
      "fmScriptPassword": "My$ecret",
      "fmScriptName": "UsePlugin",
      "fmScriptParam": "blah",
      "timeout": 2
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Result'},
      {key: 'schedules', label: 'Schedules'} ],
    }
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
const create = {
  key: options.key,
  noun: options.noun,
  display: {
    label: 'Create a Filemaker Script Schedule',
    description: 'Creates a Filemaker Script schedule with given parameters' },
  operation: {
    perform: options.operation.create,
    inputFields: options.operation.inputFields,
    sample: options.operation.sample,
    outputFields: options.operation.outputFields
  },
};


module.exports = {
  create: create,
};
