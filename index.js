// Filemaker API integrations are stored in ./resources

const authentication = require('./authentication');

const ServerStatus = require('./resources/database_server_status');

const ServerConfiguration = require('./resources/database_server_configuration');

const ServerSecurityConfiguration = require('./resources/database_server_security_configuration');

const Database = require('./resources/database.js');

const Schedule = require('./resources/schedule_get_list_run.js');

const BackupSchedule = require('./resources/schedule_backup.js');

const FilemakerScriptSchedule = require('./resources/schedule_filemaker_script.js');

const MessageSchedule = require('./resources/schedule_message.js');

const PHPTechnology = require('./resources/php_technology.js');

const XMLTechnology = require('./resources/xml_technology.js');

// JUST FOR TESTING
// THIS MUST CHANGE IT IS HIGHLY UNSERCURE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// CHANGE CHANGE CHANGE CHANGE CHANGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


const includeSessionKeyHeader = (request, z, bundle) => {
	if (bundle.authData.sessionKey) {
		request.headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${bundle.authData.sessionKey}`
		};
	};
	return request;
};

const sessionRefreshIf401 = (response, z, bundle) => {
	if (bundle.authData.sessionKey) {
		if (response.status === 401) {
			throw new z.errors.RefreshAuthError('Session key needs refreshing.');
		}
	}
	return response;
};

const App = {

	version: require('./package.json').version,
	platformVersion: require('zapier-platform-core').version,

	authentication: authentication,

	beforeRequest: [
		includeSessionKeyHeader
	],

	afterResponse: [
		sessionRefreshIf401
	],

	resources: {
	},

	// Requests for information from the server
	searches: {
	},

	// Will be polled for changes every 15 minutes; any changes to these activate the 'trigger'
	triggers: {

		[ServerStatus.poll.key]: ServerStatus.poll,

		[ServerConfiguration.poll.key]: ServerConfiguration.poll,

		[ServerSecurityConfiguration.poll.key]: ServerSecurityConfiguration.poll

	},

	// Creates new instance of resource, applies an action to the server, or can be used to return a set of information as its 'action'
	creates: {

		[ServerStatus.get.key]: ServerStatus.get,

		[ServerStatus.set.key]: ServerStatus.set,

		[ServerConfiguration.get.key]: ServerConfiguration.get,

		[ServerConfiguration.set.key]: ServerConfiguration.set,

		[ServerSecurityConfiguration.get.key]: ServerSecurityConfiguration.get,

		[ServerSecurityConfiguration.set.key]: ServerSecurityConfiguration.set,

		[Database.close.key]: Database.close,

		[Database.list.key]: Database.list,

		[Database.open.key]: Database.open,

		[Schedule.get.key]: Schedule.get,

		[Schedule.list.key]: Schedule.list,

		[Schedule.run.key]: Schedule.run,

		[BackupSchedule.create.key]: BackupSchedule.create,

		[FilemakerScriptSchedule.create.key]: FilemakerScriptSchedule.create,

		[MessageSchedule.create.key]: MessageSchedule.create,

		[MessageSchedule.sendAll.key]: MessageSchedule.sendAll,

		[PHPTechnology.configure.key]: PHPTechnology.configure,

		[PHPTechnology.get.key]: PHPTechnology.get,

		[XMLTechnology.configure.key]: XMLTechnology.configure,

		[XMLTechnology.get.key]: XMLTechnology.get,

	}
}

module.exports = App;
