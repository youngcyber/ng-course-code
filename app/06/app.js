var app = angular.module('app', ['ngAnimate', 'ngRoute'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				templateUrl: 'app/06/views/home.html'
			})
			.when('/about', {
				controller: 'AboutController',
				templateUrl: 'app/06/views/about.html'
			})
			.when('/employee', {
				controller: 'EmployeeController',
				templateUrl: 'app/06/views/employee.html'
			})
			.when('/employee/:id', {
				controller: 'EmployeeDetailController',
				templateUrl: 'app/06/views/employee_detail.html'
			})
			.otherwise({
				redirectTo: '/'
			})
	})
	.controller('HomeController', function($scope) {
		$scope.controllerName = 'This is HomeController';
	})
	.controller('AboutController', function($scope) {
		$scope.controllerName = 'This is AboutController';
	})
	.controller('EmployeeController', function($scope, $http) {

		$http.get('employees.json')
			.success(function(data) {
				$scope.employees = data;
			});
	})
	.controller('EmployeeDetailController', function($scope, $routeParams, $http) {

		$scope.id = $routeParams.id;

		$scope.query = {
			emp_no: $scope.id
		};

		$http.get('employees.json')
			.success(function(data) {
				$scope.employees = data;
			});
	});