angular.module('githubMaterial').controller('followersDialogController', followersDialogController);

followersDialogController.$inject = ['$scope', '$mdDialog', '$http', 'urlFollowers', 'userLogin'];

function followersDialogController($scope, $mdDialog, $http, urlFollowers, userLogin) {
	let me = this;

	me.list;
	me.url;
	me.followerLink;
	me.followersLoading;

	me.init = init;
	me.getFollowers = getFollowers;

	function init(){
		me.url = urlFollowers;
		me.followersLoading = false;
		me.followerLink = 'https://github.com/' + userLogin + '?tab=followers';
		getFollowers();
	}

	function getFollowers(){
		me.followersLoading = true;
		$http({
			method: 'GET',
			url: me.url
		}).then(function(response){
			console.log(response);
			me.followersLoading = false;
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
