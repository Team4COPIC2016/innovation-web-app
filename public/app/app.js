angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});
	$routeProvider.when('/', { templateUrl: '/partials/homepage.jade' })
	.when('/lessons', { templateUrl: '/partials/lessons.jade', controller: 'viewLessonsController' })
	.when('/groups', { templateUrl: '/partials/groups.jade', controller: 'viewGroupsController' })
	.when('/tasks', { templateUrl: '/partials/tasks.jade', controller: 'viewTasksController' })
	.when('/employees', { templateUrl: '/partials/employees.jade', controller: 'viewEmployeesController' })
	.when('/projects', { templateUrl: '/partials/projects.jade', controller: 'viewProjectsController' })
	.when('/createTasks', { templateUrl: '/partials/createTasks.jade', controller: 'addTaskController' })
	.when('/createEmployees', { templateUrl: '/partials/createEmployees.jade', controller: 'addEmployeeController' })
	.when('/createProjects', { templateUrl: '/partials/createProjects.jade', controller: 'addProjectController' })
	.when('/createGroups', { templateUrl: '/partials/createGroups.jade', controller: 'addGroupController' })
	.when('/createLessons', { templateUrl: '/partials/createLessons.jade', controller: 'addLessonController' })
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
			if(data.status === 200){
				$scope.success = true;
			}
			else {
				$scope.error = true;
			}

		});
	};

});

angular.module('app').controller('addTaskController', function($scope, $http) {
	$scope.form = {};
	$scope.success = false;
	$scope.error = false;
	$http.get('/api/employees/').then(function(response){
		$scope.employees = response.data;
	});
	$http.get('/api/projects/').then(function(response){
		$scope.projects = response.data;
	});
	$scope.submit = function() {
		$scope.success = true;
		$http.post('/api/task', $scope.form).then(function(data) {
			console.log(data);
		});
		console.log($scope.form);
	};
});

angular.module('app').controller('addLessonController', function($scope, $http) {
	$scope.form = {};
	$scope.success = false;
	$scope.error = false;
	$http.get('/api/employees/').then(function(response){
		$scope.employees = response.data;
	});
	$scope.submit = function() {
		$http.post('/api/lesson/', $scope.form).then(function(data) {
			$scope.success = true;
		});
	};
});

angular.module('app').controller('viewEmployeesController', function($scope, $http) {
	$scope.loading = true;
	$scope.employees = [];
	$http.get('/api/employees/').then(function(response){
		$scope.employees = response.data;
		$scope.loading = false;
	});
});

angular.module('app').controller('viewProjectsController', function($scope, $http) {
	$scope.loading = true;
	$scope.projects = [];
	$http.get('/api/projects/').then(function(response){
		$scope.projects = response.data;
		$scope.loading = false;
	});
});

angular.module('app').controller('viewTasksController', function($scope, $http) {
	$scope.loading = true;
	$scope.tasks = [];
	$http.get('/api/tasks/').then(function(response){
		$scope.tasks = response.data;
		$scope.loading = false;
	});
});

angular.module('app').controller('viewGroupsController', function($scope, $http) {
	$scope.loading = true;
	$scope.groups = [];
	$http.get('/api/groups/').then(function(response){
		$scope.groups = response.data;
		$scope.loading = false;
	});
});

angular.module('app').controller('viewLessonsController', function($scope, $http) {
	$scope.loading = true;
	$scope.lessons = [];
	$http.get('/api/lessons/').then(function(response){
		console.log(response);
		$scope.lessons = response.data;
		$scope.loading = false;
	});
});
