require.config({
	baseUrl : "",
	paths:{
		"angular"		: "../../../lib/angular.min",
		"jquery"		: "../../../lib/jquery-2.1.4.min",
		"bootstrap"		: "../../../lib/bootstrap.min",
		"app" 			: "../../commonModule/app",
	},
	shim:{
		"bootstrap":["jquery"]
	}
});