define([],function(){
	return function($scope,loop,$state){
		$scope.resumePage=function(){
			$state.go("myInfo");
		}


		$scope.delyMrthod=function(){
			$("#tipModal").modal("show");
		}
		loop.createWatch2("testinput", $scope, $scope.delyMrthod, 1000,[]);

		$scope.typeCheck = function (str) {
			if (str == null) {
				return null;
			} else {
				var temp = str.substring(0, str.indexOf("/"));
				if (temp == 'image') {
					return 'image';
				}
				return 'others';
			}


		}

	}
})