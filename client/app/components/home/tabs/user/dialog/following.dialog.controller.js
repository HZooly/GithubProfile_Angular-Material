angular.module('githubMaterial').controller('followingDialogController', followingDialogController);

followingDialogController.$inject = ['$scope', '$mdDialog', '$http', 'userLogin'];

function followingDialogController($scope, $mdDialog, $http, userLogin) {
	let me = this;

	me.list;
	me.url;
	me.followingLoading;

	me.init = init;

	function init(){
		me.url = 'https://api.github.com/users/' + userLogin  + '/following';
		me.followingLoading = false;
		getFollowing();
	}

	function getFollowing(){
		me.followingLoading = true;
		$http({
			method: 'GET',
			url: me.url
		}).then(function(response){
			console.log(response);
			me.followingLoading = false;
			me.list = response.data;
		}).catch(function(error){
			console.log(error);
		});
	}

	$scope.cancel = function(){
		$mdDialog.cancel();
	}

	$scope.hide = function(){
		$mdDialog.hide();
	}

	init();

}
