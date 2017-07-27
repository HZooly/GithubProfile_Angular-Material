angular.module('githubMaterial').controller('homeController', homeController);

homeController.$inject = ['$http', '$mdToast'];

function homeController($http, $mdToast) {
	let me = this;

	me.current;
	me.searchUser;
	me.user;

	me.init = init;
	me.setCurrent = setCurrent;
	me.search = search;
	me.fetchData = fetchData;

	function init() {
		me.searchUser = 'torzuoliH';
		search();
		me.setCurrent('User');
	}

	function setCurrent(tab) {
		me.current = tab;
	}

	function search() {
		$http({
			method: 'GET',
			url: 'https://api.github.com/users/' + me.searchUser
		}).then(function(response) {
			fetchData(response.data);
		}).catch(function(error) {
			$mdToast.show(
				$mdToast.simple()
				.textContent('User not found!')
				.position('bottom')
				.hideDelay(3000)
			);
		});
	}

	function fetchData(data) {
		console.log(data);
		me.user = data;
		me.setCurrent('User');
	}

	init();
}
