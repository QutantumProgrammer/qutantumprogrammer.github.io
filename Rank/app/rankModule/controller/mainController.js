define(['app'],function(app){
	return app.controller('MainCtrl',function($scope, $http){
		$scope.userData = [
			{"id": "z01", "name": "Wingless", 		"rankPoints": 10, "icon": "../../../img/person_1.jpg", },
			{"id": "l02", "name": "lsy坑ger", 		"rankPoints": 2, "icon": "../../../img/person_2.jpg", },
			{"id": "c03", "name": "小学生团委", 	"rankPoints": 5, "icon": "../../../img/person_3.jpg", },
			{"id": "l04", "name": "cc丶超级大魔王", "rankPoints": 9, "icon": "../../../img/person_4.jpg", },
			{"id": "s05", "name": "路人钾", 		"rankPoints": 7, "icon": "../../../img/person_5.jpg", },
			{"id": "x06", "name": "小学灬生委", 	"rankPoints": 7, "icon": "../../../img/person_6.jpg", },	
		];

		$scope.specialUserData = [
			{"id": "yo7", "name": "小学灬宣委", 	"rankPoints": 3, "icon": "../../../img/person_7.jpg", },
		];


		

		$scope.randomUserData = [];
		$scope.displayRowData = [];
		$scope.sortCount = 0;
		$scope.warnUrl ="../../../img/l1.jpg";

		$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent, data) {
			angular.forEach($scope.userData, function(obj, index){
			$("#progress_"+obj.id).css('width',100/5*obj.rankPoints+"%");
			});
		});

		$('#teamSortModal').on('hidden.bs.modal', function () {
			$scope.randomUserData = [];
			$scope.displayRowData = [];
			$scope.sortCount = 0;
			$scope.warnUrl ="../../../img/l1.jpg";
			$scope.$apply();
		})


		$scope.showTeamSortModal = function(){
			$("#teamSortModal").modal("show");
			$scope.displayRowData = $scope.userData;
		}

		$scope.sort = function(){
			$scope.sortCount++;

			if($scope.sortCount>4){
				$scope.warnUrl ="../../../img/l2.jpg";
				$("#warnModal").modal("show");
				return;
			}

			if($scope.sortCount>3){
				$("#warnModal").modal("show");
				return;
			}

			

			angular.forEach($scope.userData, function(obj, index){
				obj.randomMark = Math.random();
			});
			$scope.randomUserData = $scope.userData;


			var tempTimeout = setTimeout(function(){
				clearTimeout(tempTimeout);
				angular.forEach($scope.userData, function(obj, index){
					var markId = obj.id;
					var topOffset = $("#mark_"+markId).offset().top - $("#original_sort_"+markId).offset().top;
					var leftOffset = $("#mark_"+markId).offset().left - $("#original_sort_"+markId).offset().left;
					$("#user_sort_"+markId).css("transform", "translate("+leftOffset + "px,"+ topOffset+ "px)");
				});
				
			},300);
		}
		
		
	})
})