var AWS = require('aws-sdk');
var Promise = require('promise')
var Guid = require('guid')
AWS.config.region = 'us-west-2';

module.exports = {
	post: function(group) {
		return new Promise(function(fulfill, reject) {
      group["group_id"] = Guid.create().value;
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
  getbyID: function(group_id) {
    return new Promise(function(fulfill, reject) {
      var client = new AWS.DynamoDB.DocumentClient();

      var params = {
					TableName : "Group",
					ExpressionAttributeNames: {
						"#name" : "group_name"
					},
					FilterExpression: "#name = :name",
					ExpressionAttributeValues: {
						":name" : group_name
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

  getbyName: function(group_name) {
    return new Promise(function(fulfill, reject) {
      var client = new AWS.DynamoDB.DocumentClient();

      var params = {
					TableName : "Group",
					ExpressionAttributeNames: {
						"#name" : "group_name"
					},
					FilterExpression: "#name = :name",
					ExpressionAttributeValues: {
						":name" : group_name
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
}
