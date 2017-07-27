angular.module('githubMaterial').controller('homeController', homeController);

homeController.$inject = [];

function homeController() {
	let me = this;

	me.current;

	me.init = init;
	me.setCurrent = setCurrent;

	function init(){
		me.current = 'User';
	}

	function setCurrent(tab){
		me.current = tab;
	}

	init();
}
