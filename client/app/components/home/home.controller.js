angular.module('githubMaterial').controller('homeController', homeController);

homeController.$inject = ['$http', '$mdToast'];

function homeController($http, $mdToast) {
	let me = this;

	me.current;
	me.searchUser;
	me.user;
	me.starLoading;
	me.userLoading;

	me.init = init;
	me.setCurrent = setCurrent;
	me.search = search;
	me.fetchData = fetchData;
	me.getStars = getStars;

	function init() {
		me.searchUser = 'torzuoliH';
		search();
		me.setCurrent('User');
		me.starLoading = false;
		me.userLoading = false;
	}

	function setCurrent(tab) {
		me.current = tab;
	}

	function search() {
		me.userLoading = true;
		$http({
			method: 'GET',
			url: 'https://api.github.com/users/' + me.searchUser
		}).then(function(response) {
			fetchData(response.data);
		}).catch(function(error) {
			if(error.status == 403){
				$mdToast.show(
					$mdToast.simple()
					.textContent('Rate limit exceeded for this IP!')
					.position('bottom')
					.hideDelay(3000)
				);
			}
			if(error.status == 404){
				$mdToast.show(
					$mdToast.simple()
					.textContent('User unknown!')
					.position('bottom')
					.hideDelay(3000)
				);
			}
		});
	}

	function getStars(){
		me.starLoading = true;
		var url = 'https://api.github.com/users/' + me.user.login + '/starred?page=1&per_page=100';
		$http({
			method:'GET',
			url: url
		}).then(function(response){
			console.log(response);
			me.stars = response.data;
			me.starLoading = false;
		}).catch(function(error){
			// TOASTS
		});
	}

	function fetchData(data) {
		console.log(data);
		me.user = data;
		me.userLoading = false;
		me.setCurrent('User');
		me.searchUser = '';
	}

	init();
}
