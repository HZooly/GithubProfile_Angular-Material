angular.module('githubMaterial').controller('homeController', homeController);

homeController.$inject = ['$http', '$mdToast', '$mdDialog'];

function homeController($http, $mdToast, $mdDialog) {
	let me = this;

	me.current;
	me.searchUser;
	me.user;
	me.starLoading;
	me.userLoading;

	me.init = init;
	me.setCurrent = setCurrent;
	me.search = search;
	me.fetchDataUser = fetchDataUser;
	me.getStars = getStars;
	me.openFollowersDialog = openFollowersDialog;
	me.openFollowingDialog = openFollowingDialog;

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
		if (me.searchUser === '') {
			$mdToast.show(
				$mdToast.simple()
				.textContent('User can\'t be empty!')
				.position('bottom')
				.hideDelay(3000)
			);
		} else {
			$http({
				method: 'GET',
				url: 'https://api.github.com/users/' + me.searchUser
			}).then(function(response) {
				fetchDataUser(response.data);
			}).catch(function(error) {
				if (error.status == 403) {
					$mdToast.show(
						$mdToast.simple()
						.textContent('Rate limit exceeded for this IP!')
						.position('bottom')
						.hideDelay(3000)
					);
				}
				if (error.status == 404) {
					$mdToast.show(
						$mdToast.simple()
						.textContent('User unknown!')
						.position('bottom')
						.hideDelay(3000)
					);
				}
			});
		}
	}

	function getStars() {
		me.starLoading = true;
		var url = 'https://api.github.com/users/' + me.user.login + '/starred?page=1&per_page=100';
		$http({
			method: 'GET',
			url: url
		}).then(function(response) {
			console.log(response);
			me.stars = response.data;
			me.starLoading = false;
		}).catch(function(error) {
			// TOASTS
		});
	}

	function fetchDataUser(data) {
		console.log(data);
		me.user = data;
		me.userLoading = false;
		me.setCurrent('User');
		me.searchUser = '';
	}

	function openFollowersDialog() {
		$mdDialog.show({
				controller: followersDialogController,
				controllerAs: 'followersDialog',
				templateUrl: 'app/components/home/tabs/user/dialog/followers.dialog.html',
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				locals: {
					urlFollowers: me.user.followers_url,
					userLogin: me.user.login
				}
			})
			.then(function(answer) {});
	}

	function openFollowingDialog() {
		$mdDialog.show({
				controller: followingDialogController,
				controllerAs: 'followingDialog',
				templateUrl: 'app/components/home/tabs/user/dialog/following.dialog.html',
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				locals: {
					userLogin: me.user.login
				}
			})
			.then(function(answer) {});
	}

	init();
}
