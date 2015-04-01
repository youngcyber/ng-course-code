angular.module('app', [])
	.value('accessToken', 'xxx')
	.value('currentUser', {
		name: 'admin'
	})
	.value('helloValue', function() {
		return 'Hello, Value';
	})
	.service('helloService', function() {
		this.hello = function() {
			return 'Hello, Service';
		}
	})
	.factory('helloFactory', function() {
		return {
			hello: function() {
				return 'Hello, Factory';
			}
		};
	})
	.provider('hello', function() {
		var text = 'xxx';

		return {
			setText: function(value) {
				text = value;
			},
			$get: function() {
				return {
					hello: function() {
						return 'Hello, Provider: ' + text
					}
				}
			}
		}
	})
	.config(function(helloProvider) {
		helloProvider.setText('yyy');
	})
	.controller('HomeController', function(
			accessToken, currentUser, helloValue,
			helloService,
			helloFactory,
			hello) {
		console.log(accessToken);
		accessToken = 'yyy';
		console.log(accessToken);

		currentUser.name = 'kongthap';
		console.log(currentUser.name);

		console.log(helloValue());
		console.log(helloService.hello());
		console.log(helloFactory.hello());
		console.log(hello.hello());
	});
