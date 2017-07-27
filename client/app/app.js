let app = angular.module('githubMaterial', ['ngMaterial', 'ngRoute', 'ngAnimate', 'ngAria']);

app.config(config);
config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {

	$locationProvider.hashPrefix('');

	$routeProvider
		.when('/', {
			templateUrl: 'app/components/home/home.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}
