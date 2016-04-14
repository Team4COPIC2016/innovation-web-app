angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});
	$routeProvider.when('/', { templateUrl: '/partials/homepage.jade' })
	.when('/tasks', { templateUrl: '/partials/tasks.jade', controller: 'addTaskController' })
	.when('/employees', { templateUrl: '/partials/employees.jade', controller: 'addEmployeeController' })
	.when('/projects', { templateUrl: '/partials/projects.jade', controller: 'addProjectController' })
	.otherwise({ redirectTo: '/error/' });
});

angular.module('app').controller('addEmployeeController', function($scope, $http) {
	$scope.form = {};
	$scope.success = false;
	$scope.error = false;
	$http.get('/api/employees/').then(function(response){
		$scope.managers = response.data;
	});
	$scope.submit = function() {
		$scope.success = true;
		$http.post('/api/employee', $scope.form).then(function(data) {
			console.log(data);
		});
		console.log($scope.form);
	};
});
angular.module('app').controller('addProjectController', function($scope, $http) {
	$scope.form = {};
	$scope.success = false;
	$scope.error = false;
	$scope.submit = function() {
		$scope.success = true;
		$http.post('/api/project', $scope.form).then(function(data) {
			console.log(data);
		});
		console.log($scope.form);
	};

});
angular.module('app').controller('addTaskController', function($scope, $http) {
	$scope.form = {};
	$scope.success = false;
	$scope.error = false;
	$scope.submit = function() {
		$http.post('/api/task', $scope.form).then(function(data) {
			$scope.success = true;
		});
	};
});
