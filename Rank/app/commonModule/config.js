require.config({
	baseUrl : "",
	paths:{
		"angular"		: "../../../lib/angular.min",
		"jquery"		: "../../../lib/jquery-2.1.4.min",
		"bootstrap"		: "../../../lib/bootstrap.min",
		"app" 			: "../../commonModule/app",
	},
	map: {
        '*': {
            'css': '../../../lib/css.min'
        }
    },
	shim:{
		"bootstrap":["jquery","'css!../../../lib/bootstrap3.3.5/css/bootstrap'"]
	}
});