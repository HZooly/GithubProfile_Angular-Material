let app = angular.module('githubMaterial', ['ngMaterial', 'ngRoute', 'ngAnimate', 'ngAria', 'md.data.table']);

app.config(config);
config.$inject = ['$routeProvider', '$locationProvider', '$mdThemingProvider'];

function config($routeProvider, $locationProvider, $mdThemingProvider) {

	$mdThemingProvider.theme('default')
	.primaryPalette('teal');

	$locationProvider.hashPrefix('');

	$routeProvider
		.when('/', {
			templateUrl: 'app/components/home/home.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}
