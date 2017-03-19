require([ "../commonModule/config"],function(){
	require(["../controller/mainController"],function(){
		angular.bootstrap(document.getElementById("main_content"), ["rankApp"]);
	});		
});



