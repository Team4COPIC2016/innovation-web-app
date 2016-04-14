var AWS = require('aws-sdk');
var Promise = require('promise')
var Guid = require('guid')
AWS.config.region = 'us-west-2';

module.exports = {
	post: function(project) {
		return new Promise(function(fulfill, reject) {
      project["project_id"] = Guid.create().value;
			var params = {
			    TableName: 'Project',
			    Item: project
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
  getbyID: function(project_id) {
    return new Promise(function(fulfill, reject) {
      var client = new AWS.DynamoDB.DocumentClient();

      var params = {
					TableName : "Project",
					ExpressionAttributeNames: {
						"#id" : "project_id"
					},
					FilterExpression: "#id = :id",
					ExpressionAttributeValues: {
						":id" : project_id
					}
				};

      client.scan(params, function(err, data) {
          if (err) {
              console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
              fulfill(err);
          } else {
              console.log("Query succeeded.");
              fulfill(data.Item);
          }
      });
    });
  },

  getAllProjects: function(){
		return new Promise(function(fulfill, reject) {
			var client = new AWS.DynamoDB.DocumentClient();

			var params = {
					TableName : "Project"
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

  getbyName: function(project_name) {
    return new Promise(function(fulfill, reject) {
      var client = new AWS.DynamoDB.DocumentClient();

      var params = {
					TableName : "Project",
					ExpressionAttributeNames: {
						"#name" : "project_name"
					},
					FilterExpression: "#name = :name",
					ExpressionAttributeValues: {
						":name" : project_name
					}
				};

      client.scan(params, function(err, data) {
          if (err) {
              console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
              fulfill(err);
          } else {
              console.log(err);
              console.log(data);
              fulfill(data.Items);
          }
      });
    });
  },
}
