var AWS = require('aws-sdk');
var Promise = require('promise')
AWS.config.region = 'us-west-2';

module.exports = {
	post: function(group) {
		return new Promise(function(fulfill, reject) {
			var params = {
			    TableName: 'Group',
			    Item: group
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
	get: function(group_id) {

	},
}
