define(['app'],function(app){
	return app.controller('MainCtrl',function($scope,$state){
		$scope.name="testVal";
		$scope.time=0;
		var count=0;
		setInterval(function(){
			if( Math.floor(count/5)%2==0){
				$(".imgScroll").eq(count%5).css("transform","rotateY(180deg)");
			}else{
				$(".imgScroll").eq(count%5).css("transform","rotateY(0deg)");
			}
			count++;
		},2000)

		var count2=0;
		$("#dd1").css("opacity","0");
		setInterval(function(){
			if (count2%2==0) {
				$("#dd1").css("opacity","1");
			}else{
				$("#dd1").css("opacity","0");
			};
			count2++; 
		},1500)
		var count3=0;
		setInterval(function(){
			$scope.time=new Date();
			$scope.$apply();
			$(".timeSS").css("transform","rotateX("+count3*360+"deg)");
				count3++;
		},1000)



		$scope.showWorkModal=function(){
			$("#workModal").modal("show");
		};

		$scope.testMethod=function(){
			$(".myInfo").css("visibility","visible");
		}

		$scope.myAngular=function(){
			$state.go("myAngular",{});
		}

	})
})