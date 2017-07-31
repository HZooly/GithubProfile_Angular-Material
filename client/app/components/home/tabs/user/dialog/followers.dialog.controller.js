angular.module('githubMaterial').controller('followersDialogController', followersDialogController);

followersDialogController.$inject = ['$scope', '$mdDialog', '$http', 'urlFollowers', 'userLogin'];

function followersDialogController($scope, $mdDialog, $http, urlFollowers, userLogin) {
	let me = this;

	me.list;
	me.url;
	me.followerLink;

	me.init = init;

	function init(){
		me.url = urlFollowers;
		me.followerLink = 'https://github.com/' + userLogin + '?tab=followers';
		getFollowers();
	}

	function getFollowers(){
		$http({
			method: 'GET',
			url: me.url
		}).then(function(response){
			console.log(response);
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
