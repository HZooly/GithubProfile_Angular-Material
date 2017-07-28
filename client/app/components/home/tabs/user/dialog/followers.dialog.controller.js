angular.module('githubMaterial').controller('followersDialogController', followersDialogController);

followersDialogController.$inject = ['$scope', '$mdDialog', '$http', 'urlFollowers'];

function followersDialogController($scope, $mdDialog, $http, urlFollowers) {
	let me = this;

	me.list;
	me.url;

	me.init = init;

	function init(){
		me.url = urlFollowers;
		getFollowers();
	}

	function getFollowers(){
		$http({
			method: 'GET',
			url: me.url
		}).then(function(response){
			console.log(response);
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
