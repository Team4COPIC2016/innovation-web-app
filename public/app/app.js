angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});
	$routeProvider.when('/', { templateUrl: '/partials/homepage.jade' })
	.when('/tasks/', { templateUrl: '/partials/tasks.jade', controller: 'taskController' })
	.when('/employees/', { templateUrl: '/partials/employees.jade', controller: 'addEmployeeController' })

	.otherwise({ redirectTo: '/error/' });
});

angular.module('app').controller('addEmployeeController', function($scope, $http) {
	$scope.form = {};
	$scope.success = false;
	$scope.error = false;
	$scope.submit = function() {
		$scope.success = true;
		/*$http.post('/api/employee', $scope.form, function(){
			//return a success message
		});*/
		//console.log($scope.form);
	};
});
