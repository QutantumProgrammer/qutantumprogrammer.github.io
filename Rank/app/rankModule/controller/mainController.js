define(['app'],function(app){
	return app.controller('MainCtrl',function($scope, $http){
		$http.get('../json/data.json').then(function (data) {
			$scope.data = data;
        	console.log(data);
    	});
	})
})