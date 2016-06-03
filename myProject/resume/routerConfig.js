define(["app","angularAMD"],function(app,angularAMD){
	app.config(function($provide, $stateProvider, $urlRouterProvider){
		$urlRouterProvider.when("", "/myInfo");
		$stateProvider.state("myInfo", {
			templateUrl: "../resume/myInfo.html",
			url: "/myInfo"
		}).state("myAngular", angularAMD.route({
			controllerUrl: '../resume/controller/myCtrl.js',
			templateUrl: "../resume/myAngular.html",
			url: "/myAngular"
		}))
	})

})