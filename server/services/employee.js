var AWS = require('aws-sdk');
var Promise = require('promise')
var Guid = require('guid')
AWS.config.region = 'us-west-2';

module.exports = {
	post: function(employee) {
		return new Promise(function(fulfill, reject) {
      employee["employee_id"] = Guid.create().value;
			var params = {
			    TableName: 'Employee',
			    Item: employee
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
	getbyID: function(employee_id) {
    return new Promise(function(fulfill, reject) {
      var client = new AWS.DynamoDB.DocumentClient();

      var params = {
					TableName : "Employee",
					ExpressionAttributeNames: {
						"#name" : "employee_name"
					},
					FilterExpression: "#name = :name",
					ExpressionAttributeValues: {
						":name" : employee_name
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

  getbyName: function(employee_name) {
    return new Promise(function(fulfill, reject) {
      var client = new AWS.DynamoDB.DocumentClient();

      var params = {
					TableName : "Employee",
					ExpressionAttributeNames: {
						"#name" : "employee_name"
					},
					FilterExpression: "#name = :name",
					ExpressionAttributeValues: {
						":name" : employee_name
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
