
define(["angular", "jquery", "bootstrap"], function () {
        var app = angular.module("rankApp", []);
        app.directive('onFinishRenderFilters', function ($timeout) {
			return {
				restrict: 'A',
					link: function(scope, element, attr) {
						if (scope.$last === true) {
							$timeout(function() {
							scope.$emit('ngRepeatFinished');
							});
						}
					}
				};
			});
        return app;
});
