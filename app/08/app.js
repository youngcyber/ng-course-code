angular.module('app', ['ngResource'])
	.constant('apiUrl', '//api-slim.tutor4dev.com')
	.factory('EmployeeFactory', function($resource, apiUrl) {

		return $resource(
			apiUrl + '/employee/:id', {}, {
				update: {
					method: 'PUT',
					isArray: false,
					params: { id: '@id' },
					headers: { 'X-HTTP-Method-Override': 'PUT' }
				},
				delete: {
					headers: { 'X-HTTP-Method-Override': 'DELETE' }
				}
			}
		);
	})
	.controller('ListController', function($scope, EmployeeFactory) {
		$scope.listEmployees = function() {
			$scope.employees = EmployeeFactory.query();
		}
	})
	.controller('ShowController', function($scope, EmployeeFactory) {
		$scope.showEmployee = function() {
			$scope.employee = EmployeeFactory.get({ id: $scope.emp_no });
		}
	})
	.controller('CreateController', function($scope, EmployeeFactory) {
		$scope.createEmployee = function() {
			var postData = { emp_no: $scope.employee.emp_no, first_name: $scope.employee.first_name, last_name: $scope.employee.last_name };
			EmployeeFactory.save(postData);
		}
	})
	.controller('DeleteController', function($scope, EmployeeFactory) {
		$scope.deleteEmployee = function() {
			EmployeeFactory.delete({ id: $scope.emp_no });
		}
	})
	.controller('UpdateController', function($scope, EmployeeFactory) {
		$scope.updateEmployee = function() {
			var postData = { emp_no: $scope.employee.emp_no, first_name: $scope.employee.first_name, last_name: $scope.employee.last_name };
			EmployeeFactory.update({ id: $scope.old_emp_no	}, postData);
		}
	});