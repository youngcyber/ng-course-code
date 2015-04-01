angular.module('app', ['ngRoute'])
	.constant('apiUrl', '//api-php.tutor4dev.com')
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				templateUrl: 'app/09/views/home.html'
			})
			.when('/employee', {
				controller: 'EmployeeController',
				templateUrl: 'app/09/views/employee.html'
			})
			.when('/employee/:id', {
				controller: 'EmployeeDetailController',
				templateUrl: 'app/09/views/employee_detail.html'
			})
			.when('/create', {
				controller: 'EmployeeCreateController',
				templateUrl: 'app/09/views/employee_create.html'
			})
			.otherwise({
				redirectTo: '/'
			})
	})
	.factory('employeeFactory', function($http, $q, apiUrl) {

		return {
			listEmployees: function() {

				var defer = $q.defer();

				$http.get(apiUrl + '/select.php')
					.success(function(data) {
						defer.resolve(data);
					})
					.error(function() {
						defer.reject('Error ...');
					});

				return defer.promise;
			},

			showEmployee: function(id) {

				var defer = $q.defer();

				$http.get(apiUrl + '/select.php?emp_no=' + id, { 'emp_no': id })
					.success(function(data) {
						defer.resolve(data);
					})
					.error(function() {
						defer.reject('Error ...');
					});

				return defer.promise;
			},

			deleteEmployee: function(id) {
				var defer = $q.defer();

				$http.post(apiUrl + '/delete.php', { 'emp_no': id })
					.success(function(data) {
						defer.resolve(data);
					})
					.error(function() {
						defer.reject('Error ...');
					});

				return defer.promise;
			},

			updateEmployee: function(employee) {

				var defer = $q.defer();

				$http.post(apiUrl + '/update.php', employee)
					.success(function(data) {
						defer.resolve(data);
					})
					.error(function() {
						defer.reject('Error ...');
					});

				return defer.promise;
			},

			createEmployee: function(employee) {

				var defer = $q.defer();

				$http.post(apiUrl + '/insert.php', employee)
					.success(function(data) {
						defer.resolve(data);
					})
					.error(function() {
						defer.reject('Error ...');
					});

				return defer.promise;
			}
		};
	})
	.controller('HomeController', function() {
	})
	.controller('EmployeeController', function($scope, employeeFactory) {
		$scope.employees = [];

		function listEmployee() {
			employeeFactory.listEmployees()
				.then(function(data) {
					$scope.employees = data;
				}, function() {
					console.log('Error ...');
				});
		}

		listEmployee();

		$scope.deleteEmployee = function(id) {
			employeeFactory.deleteEmployee(id)
				.then(function() {
					listEmployee();
				});
		}
	})
	.controller('EmployeeDetailController', function($scope, $routeParams, $location, employeeFactory) {
		$scope.employee = {};

		employeeFactory.showEmployee($routeParams.id)
			.then(function(data) {
				$scope.employee = data[0];
				$scope.employee.old_emp_no = $scope.employee.emp_no;
			});

		$scope.updateEmployee = function() {
			employeeFactory.updateEmployee($scope.employee)
				.then(function() {
					$location.path('/employee');
				});
		}
	})
	.controller('EmployeeCreateController', function($scope, $location, employeeFactory) {
		$scope.createEmployee = function() {
			employeeFactory.createEmployee($scope.employee)
				.then(function() {
					$location.path('/employee');
				});
		}
	});