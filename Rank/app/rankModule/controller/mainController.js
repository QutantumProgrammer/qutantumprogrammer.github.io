define(['app'],function(app){
	return app.controller('MainCtrl',function($scope, $http){
		$scope.userData = [
			{ "name": "Wingless", 		"rankPoints": 3, "icon": "../../../img/person_1.jpg", "team":"A" },
			{ "name": "lsy坑ger", 		"rankPoints": 1, "icon": "../../../img/person_2.jpg", "team":"A" },
			{ "name": "小学生团委", 	"rankPoints": 4, "icon": "../../../img/person_3.jpg", "team":"B" },
			{ "name": "cc丶超级大魔王", "rankPoints": 3, "icon": "../../../img/person_4.jpg", "team":"B" },
			{ "name": "路人钾", 		"rankPoints": 2, "icon": "../../../img/person_5.jpg", "team":"A" },
			{ "name": "小学灬生委", 	"rankPoints": 5, "icon": "../../../img/person_6.jpg", "team":"B" },	
		];

		$scope.setId = function(obj, id){
			obj.id = "#"+id;
		}

		$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
			angular.forEach($scope.userData, function(obj, index){
				$(obj.id).css('width',100/5*obj.rankPoints+"%");
			});
		});
	})
})