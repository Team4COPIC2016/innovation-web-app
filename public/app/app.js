angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});
	$routeProvider.when('/', { templateUrl: '/partials/homepage.jade' })
	.when('/tasks/', { templateUrl: '/partials/tasks.jade', controller: 'taskController' })
	.when('/employees/', { templateUrl: '/partials/employees.jade', controller: 'taskController' })

	.otherwise({ redirectTo: '/error/' });
});

angular.module('app').controller('taskController', function() {
	console.log('tasks');
});
