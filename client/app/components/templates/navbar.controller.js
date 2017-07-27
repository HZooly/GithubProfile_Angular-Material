angular.module('githubMaterial').controller('navbarController', navbarController);

navbarController.$inject = ['$location'];

function navbarController($location) {
	let me = this;

	me.toHome = toHome;

	function toHome(){
		$location.path('/');
	}
}
