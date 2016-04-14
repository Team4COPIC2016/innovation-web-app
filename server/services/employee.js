var AWS = require('aws-sdk');
var Promise = require('promise')
var Guid = require('guid')
AWS.config.region = 'us-west-2';

module.exports = {
	post: function(employee) {
		return new Promise(function(fulfill, reject) {
      employee["employee_id"] = Guid.create().value;
      AWS.config.update({
          accessKeyId: "AKIAJBFW33EL6XSKUKAA",
          secretAccessKey: "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",
      });
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
          ScanFilter: {
					'employee_id': {
						'AttributeValueList': [
							{
								'S': employee_id
							}
						],
						'ComparisonOperator' : 'EQ'
					}
				}
      };

      client.scan(params, function(err, data) {
          if (err) {
              console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
              fulfill(err);
          } else {
              console.log("Query succeeded.");
              fulfill(item);
          }
      });
    });
	},

  getbyName: function(employee_name) {
    return new Promise(function(fulfill, reject) {
      AWS.config.update({
          accessKeyId: "AKIAJBFW33EL6XSKUKAA",
          secretAccessKey: "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",
      });
      var client = new AWS.DynamoDB.DocumentClient();

      var params = {
          TableName : "Employee",
          ScanFilter: {
					'employee_name': {
						'AttributeValueList': [
							{
								'S': employee_name
							}
						],
						'ComparisonOperator' : 'EQ'
					}
				}
      };

      client.scan(params, function(err, data) {
          if (err) {
              console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
              fulfill(err);
          } else {
              console.log(err);
              console.log(data);
              fulfill(data);
          }
      });
    });
	},
}
