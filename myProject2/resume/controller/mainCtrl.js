define(['app'],function(app){
	return app.controller('MainCtrl',function($scope){
		$scope.name="testVal";
		$scope.showWorkModal=function(){
			$("#workModal").modal("show");
		};

	})
})