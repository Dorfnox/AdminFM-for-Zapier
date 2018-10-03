function getCurrentTimestring() {
	let now = new Date(new Date().getTime() + (1000 * 65));
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

// Schedules - Create a Message Schedule
const createMessageSchedule = (z, bundle) => {
	// let startDate = bundle.inputData.startDate.toLowerCase();
	// startDate = startDate == 'now' ? getCurrentTimestring() : startDate;

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

	return z.request(options).then(res => z.JSON.parse(res.content));
};

const sendMessageToAllClients = (z, bundle) => {
	const getClientOptions = {
		url: `${bundle.authData.server_address}/fmi/admin/api/v1/databases`,
		method: 'GET',
	}

	return z.request(getClientOptions).then(res => {
		const resContent = z.JSON.parse(res.content);
		const clientArray = resContent.clients.clients;
		const clients = clientArray.map(c => c.id);	// returns [412, 331, 2, 26] list of clients
		const options = {
			url: `${bundle.authData.server_address}/fmi/admin/api/v1/clients/:client-id/message`,
			method: 'POST',
			body: { 'message': bundle.inputData.message }
		}
		const reqFunc = (clientId) => {
			let newOptions = z.JSON.parse(z.JSON.stringify(options));
			newOptions.url = newOptions.url.replace(':client-id', clientId);
			return new Promise((resolve, reject) =>
				z.request(newOptions)
					.then(resp => resolve(z.JSON.parse(resp.content)))
					.catch(error => reject(z.JSON.parse(error))));
		}
		// Push to promise array
		let promiseArray = [];
		clients.forEach(clientId => promiseArray.push(reqFunc(clientId)));

		return Promise.all(promiseArray).then(() => {
			resContent.clients = clientArray;
			resContent.files = resContent.files.files;
			resContent.result = 0;
			return resContent;
		}).catch();
	}).catch();

}

const sendAll = {
	key: 'sendMessageToAllClients',
	noun: 'Send Message to All Clients',
	display: {
		label: 'Send a Single Message to All Clients',
		description: 'Sends a single message immediately to all users connected to the fm server',
	},
	operation: {
		perform: sendMessageToAllClients,
		inputFields: [
			{ key: 'message', label: 'Message Text', type: 'string', required: true, helpText: 'The body of the message'},
		],
		sample: { 'id': 1, 'result': 0},
		outputFields: [
			{ key: 'result', label: 'Result' },
			{ key: 'clients', label: 'Clients' },
			{ key: 'files', label: 'DB Files' },
			{ key: 'totalDBCount', label: 'Total DB Count' },
			{ key: 'fmdapiCount', label: 'Data API Count' },
			{ key: 'fmwebdCount', label: 'Web Direct Count' },
			{ key: 'fmGoCount', label: 'FM Go Count' },
			{ key: 'fmmiscCount', label: 'Misc. Count' },
			{ key: 'time', label: 'Time' },
			{ key: 'openDBCount', label: 'Open DB Count' },
			{ key: 'fmproCount', label: 'FM Pro Count' },
		],
	}
}


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
			{ key: 'name', label: 'Schedule Name', type: 'string', required: true, helpText: 'Message Schedule name (1 - 31 chars)' },
			{ key: 'freqType', label: 'Schedule Frequency', type: 'integer', required: true, helpText: '1=Daily, 2=Daily, or Every n Days, 3=Weekly' },
			{ key: 'startDate', label: 'Start Date', type: 'string', required: true, helpText: 'Year-Month-Day-Hour-Minute-Second in 24-hour format' }, // 'or type in 'now' << deprecated
			{ key: 'target', label: 'Target Database Type', type: 'integer', required: true, helpText: 'Database type (2 - all databases, 3 - some databases under a subfolder, 4 - single database)' },
			{ key: 'messageText', label: 'Message Content', type: 'string', required: true, helpText: 'Message content to be sent to FileMaker clients (1 to 200 characters)' },

			{ key: 'fromTarget', label: 'Filemaker Database Name', type: 'string', required: false, helpText: 'Ignore if Target Database Type is 2. If Target Database Type = 3, then the database folder path. Target = 4, Filemaker Database Name' },

			{ key: 'repeatTask', label: 'Repeat within a Day', type: 'boolean', required: false, helpText: 'Repeat within a day?' },
			{ key: 'repeatInterval', label: 'Repeat Interval Time Unit', type: 'integer', required: false, helpText: '"1" for minute, and "2" for hour. Required if "Repeat within a Day" is true.' },
			{ key: 'repeatFrequency', label: 'Repeat Frequency', type: 'integer', required: false, helpText: 'Time interval to repeat the task. Required if "Repeat within a Day" is true. Must be an integer from 1 to 60 when "Repeat Interval Time Unit" = 1 or from 1 to 24 when "Repeat Interval Time Unit"=2' },

			{ key: 'daysOfTheWeek', label: 'Days of the Week', type: 'string', required: false, helpText: 'Enable only if "Schedule Frequency" = 3. Ex: "1001011" indicates the schedule will run Sunday, Wednesday, Friday and Saturday. 0000000 is not allowed' },
			{ key: 'dailyDays', label: 'Day Interval', type: 'integer', required: false, helpText: 'Enabled only when Schedule Frequency = 2. Every how many days the schedule repeats, from 1 to 999. For example, 3 represents every 3 days. The default is 1' },

			{ key: 'enableEndDate', label: 'Enable End Date', type: 'boolean', required: false, helpText: 'Whether to specify an end date/time for the schedule.' },
			{ key: 'endDate', label: 'End Date', type: 'string', required: false, helpText: 'Schedule end date/time (in "Year-Month-Day-Hour-Minute-Second" in 24-hour format). Required if "Enable End Date" or "Repeat within a Day" is true' },

			{ key: 'sendEmail', label: 'Send Email', type: 'boolean', required: false, helpText: 'Whether to send Emails. SMTP configuration is required' },
			{ key: 'emailAddresses', label: 'Email Addresses', type: 'string', required: false, helpText: 'Email addresses separated by comma. Required if "sendEmail" is true' },

			{ key: 'enabled', label: 'enabled', type: 'boolean', required: false, helpText: 'Whether schedule is enabled at creation or edit. Default is false' }
		],
		sample: {
			"id": 1,
			"result": 0,
			"schedules": [{
				"dailyDays": 1,
				"daysOfTheWeek": 0000000,
				"daysOfTheWeekDetails": "",
				"emailAddresses": "john.doe@xxx.xxx,jane.doe@xxx.xxx",
				"enabled": "true",
				"freqType": 1,
				"id": "6",
				"messageType": {
					"fromTarget": "filemac:/Macintosh HD/Library/FileMaker Server/Data/Databases/",
					"messageText": "Server will be shut down in 15 minutes. Please save your work and proceed to logout."
				},
				"name": "Maintenance Notification",
				"repeatFrequency": 10,
				"repeatInterval": 1,
				"repeatTask": "false",
				"sendEmail": "true",
				"startDate": "2017-10-12 1:30:0",
				"status": 1,
				"taskType": "MESSAGE"
			}]
		},
		outputFields: [
			{ key: 'id', label: 'ID' },
			{ key: 'result', label: 'Result' },
			{ key: 'schedules', label: 'Schedules' }],
	}
};

module.exports = {
	create: create,
	sendAll: sendAll,
};
