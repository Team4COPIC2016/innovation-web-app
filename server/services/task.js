var AWS = require('aws-sdk');
var Promise = require('promise')
var Guid = require('guid')
AWS.config.region = 'us-west-2';

module.exports = {
	post: function(task) {
		return new Promise(function(fulfill, reject) {
			task["task_id"] = Guid.create().value;
			var params = {
			    TableName: 'Task',
			    Item: task
		    }
		    var client = new AWS.DynamoDB.DocumentClient();
		    client.put(params, function(err, data) {
			    if (err) {
			        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
			        fulfill(err);
			    } else {
			        console.log("Added item:", JSON.stringify(data, null, 2));
			        fulfill(data);
			    }
			});
		});
	},
	getbyID: function(task_id) {
		return new Promise(function(fulfill, reject) {
			var client = new AWS.DynamoDB.DocumentClient();

			var params = {
					TableName : "Task",
					ExpressionAttributeNames: {
						"#id" : "task_id"
					},
					FilterExpression: "#id = :id",
					ExpressionAttributeValues: {
						":id" : task_id
					}
				};

			client.scan(params, function(err, data) {
					if (err) {
							console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
							fulfill(err);
					} else {
							console.log("Query succeeded.");
							fulfill(data.Items);
					}
			});
		});
	},

	getAllTasks: function(){
		return new Promise(function(fulfill, reject) {
			var client = new AWS.DynamoDB.DocumentClient();

			var params = {
					TableName : "Task"
				};

			client.scan(params, function(err, data) {
					if (err) {
							console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
							fulfill(err);
					} else {
							fulfill(data.Items);
					}
			});
		});
	},

	getbyName: function(task_name) {
		return new Promise(function(fulfill, reject) {
			var client = new AWS.DynamoDB.DocumentClient();

			var params = {
					TableName : "Task",
					ExpressionAttributeNames: {
						"#name" : "task_name"
					},
					FilterExpression: "#name = :name",
					ExpressionAttributeValues: {
						":name" : task_name
					}
				};

			client.scan(params, function(err, data) {
					if (err) {
							console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
							fulfill(err);
					} else {
							fulfill(data.Items);
					}
			});
		});
	},

	getTasksForEmployee: function(employee_id) {
		return new Promise(function(fulfill, reject) {
			var client = new AWS.DynamoDB.DocumentClient();

			var params = {
					TableName : "Task",
					ExpressionAttributeNames: {
						"#employee" : "employee_id"
					},
					FilterExpression: "#employee = :employee",
					ExpressionAttributeValues: {
						":employee" : employee_id
					}
				};

			client.scan(params, function(err, data) {
					if (err) {
							console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
							fulfill(err);
					} else {
							console.log("Query succeeded.");
							console.log(data.Items);
							fulfill(data.Items);
					}
			});
		});
	},
}
