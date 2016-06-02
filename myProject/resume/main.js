require.config({
	baseUrl : "../js",
	paths:{
		"angular": "angular.min",
		"angular-ui-route" : ["angular-ui-router.min"],
		"jquery":["jquery-2.1.4.min"],
		"bootstrap":["bootstrap.min"],
		"app":["app"],
		"angularAMD":"angularAMD"
	},
	shim:{
		"angular-ui-route":{deps: ["angular"]},
		"bootstrap":["jquery"]
	}
});
require([
	"../resume/myPlugin/my-loop",
	"../resume/routerConfig",
	"../resume/myPlugin/my-file-upload",
	"../resume/controller/mainCtrl"
	],function(){
		angular.bootstrap(document, ['resumeApp']);
	});