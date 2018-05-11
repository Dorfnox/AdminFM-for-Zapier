// Schedules - Create a Backup Schedule
const createBackupSchedule = (z, bundle) => {
  const options = {
    url: `${bundle.authData.server_address}/fmi/admin/api/v1/schedules`,
    method: 'POST',
    body: {
      'taskType': bundle.inputData.taskType,
      'name': bundle.inputData.name,
      'freqType': bundle.inputData.freqType,
      'startDate': bundle.inputData.startDate,
      'target': bundle.inputData.target,
      'backupTarget': bundle.inputData.backupTarget,

      'maxBackups': bundle.inputData.maxBackups,
      'fromTarget': bundle.inputData.fromTarget,
      'clone': bundle.inputData.clone,
      'verify': bundle.inputData.verify,

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
  key: 'createBackupSchedule',
  noun: 'Database',
  operation: {
    create: createBackupSchedule,
    inputFields: [
      {key: 'taskType', label: 'Task Type', type: 'integer', required: true, helpText: 'Type of backup schedule (taskType = 1)'},
      {key: 'name', label: 'Schedule Name', type: 'string', required: true, helpText: 'Name of Scheduled Script'},
      {key: 'freqType', label: 'Schedule Frequency', type: 'integer', required: true, helpText: '1=Daily, 2=Daily, or Every n Days, 3=Weekly'},
      {key: 'startDate', label: 'Start Date', type: 'string', required: true, helpText: '"Year-Month-Day-Hour-Minute-Second" in 24-hour format'},
      {key: 'target', label: 'Database Type', type: 'integer', required: true, helpText: '2 - all databases, 3 - some databases under a subfolder, 4 - single database'},
      {key: 'backupTarget', label: 'Backup Folder Path', type: 'string', required: true, helpText: 'Path to the backup directory location'},

      {key: 'maxBackups', label: 'Maximum # of Backups', type: 'integer', required: false, helpText: 'A number from 0 - 99'},
      {key: 'fromTarget', label: 'From Target', type: 'string', required: false, helpText: 'If Database Type = 3, then type a directory path. If Database Type = 4, then type a Database Name'},
      {key: 'clone', label: 'Clone Backup', type: 'boolean', required: false, helpText: '"true" to clone backup file. "false" otherwise'},
      {key: 'verify', label: 'Verify Backup Integrity', type: 'boolean', required: false, helpText: 'default is false'},

      {key: 'repeatTask', label: 'Repeat within a Day', type: 'boolean', required: false, helpText: 'Repeat within a day?'},
      {key: 'repeatInterval', label: 'Repeat Interval Time Unit', type: 'integer', required: false, helpText: '"1" for minute, and "2" for hour. Required if "Repeat within a Day" is true.'},
      {key: 'repeatFrequency', label: 'Repeat Frequency', type: 'integer', required: false, helpText: 'Time interval to repeat the task. Required if "Repeat within a Day" is true. Must be an integer from 1 to 60 when "Repeat Interval Time Unit" = 1 or from 1 to 24 when "Repeat Interval Time Unit"=2.'},

      {key: 'daysOfTheWeek', label: 'Days of the Week', type: 'string', required: false, helpText: 'Enable only if "Schedule Frequency" = 3. Ex: "1001011" indicates the schedule will run Sunday, Wednesday, Friday and Saturday.'},
      {key: 'dailyDays', label: 'Day Interval', type: 'integer', required: false, helpText: 'Enabled only when freqType = 2. Every how many days the schedule repeats, from 1 to 999. For example, 3 represents every 3 days. The default is 1.'},

      {key: 'enableEndDate', label: 'Enable End Date', type: 'boolean', required: false, helpText: 'Whether to specify an end date/time for the schedule.'},
      {key: 'endDate', label: 'End Date', type: 'string', required: false, helpText: 'Schedule end date/time (in "Year-Month-Day-Hour-Minute-Second" in 24-hour format). Required if "Enable End Date" or "Repeat within a Day" is true.'},

      {key: 'sendEmail', label: 'Send Email', type: 'boolean', required: false, helpText: 'Whether to send Emails. SMTP configuration is required'},
      {key: 'emailAddresses', label: 'Email Addresses', type: 'string', required: false, helpText: 'Email addresses separated by comma. Required if "sendEmail" is true.'},
      
      {key: 'enabled', label: 'enabled', type: 'boolean', required: false, helpText: 'Whether schedule is enabled at create or edit.'}, ],
    sample: {
      id: 1,
      "result": 0,
      "schedules": [{
        "backupType": {
          "backupTarget" : "filemac:/Macintosh HD/Library/FileMaker Server/Data/Backups/",
          "clone" : "false",
          "fromTarget" : "All Databases",
          "maxBackups" : 5,
          "verify" : "false"
        },
        "dailyDays" : 1,
        "daysOfTheWeek" : 0000000,
        "daysOfTheWeekDetails" : "",
        "emailAddresses" : "",
        "enabled" : "true",
        "freqType" : 2,
        "id": "4",
        "lastError": 0,
        "lastRun" : "0000-00-00 00:480:00 GMT",
        "name" : "Daily",
        "nextRun" : "2017-10-12 23:30:00 GMT",
        "repeatFrequency" : 10,
        "repeatInterval" : 1,
        "repeatTask" : "false",
        "sendEmail" : "false",
        "startDate" : "2017-10-11 23:30:00",
        "status" : 1,
        "taskType" : "BACKUP"
      }],
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'result', label: 'Result'},
      {key: 'schedules', label: 'Schedules'},],
    }
};


// Create becomes an action: Tells zapier how to create a new instance of this resource
const create = {
  key: 'createBackupSchedule',
  noun: options.noun,
  display: {
    label: 'Create a Backup Schedule',
    description: 'Creates a backup schedule with given parameters', },
  operation: {
    perform: options.operation.create,
    inputFields: options.operation.inputFields, // Create requires an input field
    sample: options.operation.sample,
    outputFields: options.operation.outputFields,
  },
};


module.exports = {
  create: create,
};
