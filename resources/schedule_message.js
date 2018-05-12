// Schedules - Create a Message Schedule
const createMessageSchedule = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/schedules`,
    method: 'POST',
    body: {
      'taskType': 3,
      'name': bundle.inputData.name,
      'freqType': bundle.inputData.freqType,
      'startDate': bundle.inputData.startDate,
      'target': bundle.inputData.target,
      'messageText': bundle.inputData.messageText,

      'fromTarget': bundle.inputData.fromTarget,

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


const create = {
  key: 'createMessageSchedule',
  noun: 'Create Message Schedule',
  display: {
    label: 'Create a Message Schedule',
    description: 'Creates a Message schedule with given parameters'
  },
  operation: {
    perform: createMessageSchedule,
    inputFields: [
      {key: 'name', label: 'Schedule Name', type: 'string', required: true, helpText: 'Message Schedule name (1 - 31 chars)'},
      {key: 'freqType', label: 'Schedule Frequency', type: 'integer', required: true, helpText: '1=Daily, 2=Daily, or Every n Days, 3=Weekly'},
      {key: 'startDate', label: 'Start Date', type: 'string', required: true, helpText: 'Year-Month-Day-Hour-Minute-Second in 24-hour format'},
      {key: 'target', label: 'Target Database Type', type: 'integer', required: true, helpText: 'Database type (2 - all databases, 3 - some databases under a subfolder, 4 - single database)'},
      {key: 'messageText', label: 'Message Content', type: 'string', required: true, helpText: 'Message content to be sent to FileMaker clients (1 to 200 characters)'},

      {key: 'fromTarget', label: 'Filemaker Database Name', type: 'string', required: false, helpText: 'Ignore if Target Database Type is 2. If Target Database Type = 3, then the database folder path. Target = 4, Filemaker Database Name'},
      
      {key: 'repeatTask', label: 'Repeat within a Day', type: 'boolean', required: false, helpText: 'Repeat within a day?'},
      {key: 'repeatInterval', label: 'Repeat Interval Time Unit', type: 'integer', required: false, helpText: '"1" for minute, and "2" for hour. Required if "Repeat within a Day" is true.'},
      {key: 'repeatFrequency', label: 'Repeat Frequency', type: 'integer', required: false, helpText: 'Time interval to repeat the task. Required if "Repeat within a Day" is true. Must be an integer from 1 to 60 when "Repeat Interval Time Unit" = 1 or from 1 to 24 when "Repeat Interval Time Unit"=2'},

      {key: 'daysOfTheWeek', label: 'Days of the Week', type: 'string', required: false, helpText: 'Enable only if "Schedule Frequency" = 3. Ex: "1001011" indicates the schedule will run Sunday, Wednesday, Friday and Saturday. 0000000 is not allowed'},
      {key: 'dailyDays', label: 'Day Interval', type: 'integer', required: false, helpText: 'Enabled only when Schedule Frequency = 2. Every how many days the schedule repeats, from 1 to 999. For example, 3 represents every 3 days. The default is 1'},

      {key: 'enableEndDate', label: 'Enable End Date', type: 'boolean', required: false, helpText: 'Whether to specify an end date/time for the schedule.'},
      {key: 'endDate', label: 'End Date', type: 'string', required: false, helpText: 'Schedule end date/time (in "Year-Month-Day-Hour-Minute-Second" in 24-hour format). Required if "Enable End Date" or "Repeat within a Day" is true'},

      {key: 'sendEmail', label: 'Send Email', type: 'boolean', required: false, helpText: 'Whether to send Emails. SMTP configuration is required'},
      {key: 'emailAddresses', label: 'Email Addresses', type: 'string', required: false, helpText: 'Email addresses separated by comma. Required if "sendEmail" is true'},

      {key: 'enabled', label: 'enabled', type: 'boolean', required: false, helpText: 'Whether schedule is enabled at creation or edit. Default is false'}
    ],
    sample: {
      "id": 1,
      "result": 0,
      "schedules": [{
          "dailyDays" : 1,
          "daysOfTheWeek" : 0000000,
          "daysOfTheWeekDetails" : "",
          "emailAddresses" : "john.doe@xxx.xxx,jane.doe@xxx.xxx",
          "enabled" : "true",
          "freqType" : 1,
          "id": "6",
          "messageType": {
              "fromTarget" : "filemac:/Macintosh HD/Library/FileMaker Server/Data/Databases/",
              "messageText" : "Server will be shut down in 15 minutes. Please save your work and proceed to logout."
          },
          "name" : "Maintenance Notification",
          "repeatFrequency" : 10,
          "repeatInterval" : 1,
          "repeatTask" : "false",
          "sendEmail" : "true",
          "startDate" : "2017-10-12 1:30:0",
          "status" : 1,
          "taskType" : "MESSAGE"
      }]
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Result'},
      {key: 'schedules', label: 'Schedules'} ],
    }
};

module.exports = {
  create: create,
};
