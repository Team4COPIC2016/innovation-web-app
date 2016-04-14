var AWS = require('aws-sdk');
var Promise = require('promise')
var Guid = require('guid')
AWS.config.region = 'us-west-2';

module.exports = {
	post: function(lesson) {
		return new Promise(function(fulfill, reject) {
      lesson["lesson_id"] = Guid.create().value;
			var params = {
			    TableName: 'Lesson',
			    Item: lesson
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
  getbyID: function(lesson_id) {
    return new Promise(function(fulfill, reject) {
      var client = new AWS.DynamoDB.DocumentClient();

      var params = {
					TableName : "Lesson",
					ExpressionAttributeNames: {
						"#id" : "lesson_id"
					},
					FilterExpression: "#id = :id",
					ExpressionAttributeValues: {
						":id" : lesson_id
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

  getAllLessons: function(){
		return new Promise(function(fulfill, reject) {
			var client = new AWS.DynamoDB.DocumentClient();

			var params = {
					TableName : "Lesson"
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

  getbyName: function(lesson_name) {
    return new Promise(function(fulfill, reject) {
      var lesson = new AWS.DynamoDB.DocumentClient();

      var params = {
					TableName : "Lesson",
					ExpressionAttributeNames: {
						"#name" : "lesson_name"
					},
					FilterExpression: "#name = :name",
					ExpressionAttributeValues: {
						":name" : lesson_name
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

	getLessonsForEmployee: function(employee_id) {
		return new Promise(function(fulfill, reject) {
			var client = new AWS.DynamoDB.DocumentClient();

			var params = {
					TableName : "Lesson",
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
